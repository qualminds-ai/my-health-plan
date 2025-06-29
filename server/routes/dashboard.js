const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const { asyncHandler } = require('../middleware/errorHandler');

// Get dashboard summary statistics
router.get('/stats', asyncHandler(async (req, res) => {
  const query = `
    SELECT 
      COUNT(*) FILTER (WHERE next_review_date::date = CURRENT_DATE) as due_today_count,
      COUNT(*) FILTER (WHERE priority = 'High') as high_priority_count,
      COUNT(*) FILTER (WHERE next_review_date::date = CURRENT_DATE) as reminders_count,
      COUNT(*) FILTER (WHERE admission_date >= date_trunc('week', CURRENT_DATE) 
                        AND admission_date < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week') as start_this_week_count,
      COUNT(*) FILTER (WHERE status = 'Pending') as total_pending_count,
      COUNT(*) FILTER (WHERE status = 'In Review') as total_in_review_count,
      COUNT(*) FILTER (WHERE status = 'Approved') as total_approved_count,
      COUNT(*) FILTER (WHERE status = 'Denied') as total_denied_count,
      COUNT(*) as total_count
    FROM authorizations
    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
  `;

  const result = await pool.query(query);
  res.json(result.rows[0]);
}));

// Get authorizations for the main table
router.get('/authorizations', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      status,
      priority,
      due_today,
      search
    } = req.query;

    const offset = (page - 1) * limit;

    let whereConditions = [];
    let queryParams = [];
    let paramCount = 0;

    // Add filters
    if (status) {
      paramCount++;
      whereConditions.push(`a.status = $${paramCount}`);
      queryParams.push(status);
    }

    if (priority) {
      paramCount++;
      whereConditions.push(`a.priority = $${paramCount}`);
      queryParams.push(priority);
    }

    if (due_today === 'true') {
      whereConditions.push(`a.next_review_date::date = CURRENT_DATE`);
    }

    if (search) {
      paramCount++; whereConditions.push(`(
        a.authorization_number ILIKE $${paramCount} OR
        CONCAT(m.last_name, ', ', m.first_name) ILIKE $${paramCount} OR
        d.diagnosis_code ILIKE $${paramCount} OR
        p.provider_name ILIKE $${paramCount}
      )`);
      queryParams.push(`%${search}%`);
    }

    const whereClause = whereConditions.length > 0
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';

    const query = `
      SELECT 
        a.id,
        a.authorization_number,
        a.priority,
        a.status,
        a.request_type,
        a.review_type,
        a.received_date,
        a.admission_date,
        a.approved_days,
        a.next_review_date,
        a.pos,        -- Member info
        CONCAT(m.last_name, ', ', m.first_name) as member_name,
        m.member_number,
        -- Provider info
        p.provider_name,
        p.provider_code,
        -- Diagnosis info
        d.diagnosis_code,
        d.diagnosis_name,
        -- DRG info
        drg.drg_code,
        drg.drg_description,
        -- Calculated fields
        CASE 
          WHEN a.next_review_date::date = CURRENT_DATE THEN 'Due Today'
          WHEN a.next_review_date::date < CURRENT_DATE THEN 'Overdue'
          WHEN a.next_review_date::date <= CURRENT_DATE + INTERVAL '7 days' THEN 'Due This Week'
          ELSE 'Future'
        END as review_status
      FROM authorizations a
      LEFT JOIN members m ON a.member_id = m.id
      LEFT JOIN providers p ON a.provider_id = p.id
      LEFT JOIN diagnoses d ON a.diagnosis_id = d.id
      LEFT JOIN drg_codes drg ON a.drg_code_id = drg.id      ${whereClause}
      ORDER BY 
        CASE WHEN m.member_number = 'MEM001' THEN 0 ELSE 1 END,
        CASE a.priority 
          WHEN 'High' THEN 1 
          WHEN 'Medium' THEN 2 
          WHEN 'Low' THEN 3 
        END,
        a.next_review_date ASC,
        a.received_date DESC
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `;

    queryParams.push(limit, offset);

    const result = await pool.query(query, queryParams);

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM authorizations a
      LEFT JOIN members m ON a.member_id = m.id
      LEFT JOIN providers p ON a.provider_id = p.id
      LEFT JOIN diagnoses d ON a.diagnosis_id = d.id
      LEFT JOIN drg_codes drg ON a.drg_code_id = drg.id
      ${whereClause}
    `;

    const countResult = await pool.query(
      countQuery,
      queryParams.slice(0, -2) // Remove limit and offset
    );

    res.json({
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].total),
        pages: Math.ceil(countResult.rows[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching authorizations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get member details by member_number
router.get('/member/:memberNumber', async (req, res) => {
  try {
    const { memberNumber } = req.params;
    const query = `
      SELECT 
        m.id, 
        m.member_number,        m.first_name, 
        m.last_name, 
        CONCAT(m.last_name, ', ', m.first_name) as name, 
        m.date_of_birth as dob,
        -- m.pcp_name as pcp, -- pcp_name does not exist in members table
        m.insurance_group as plan, -- Renamed from insurance_plan to insurance_group
        -- m.status, -- status does not exist in members table
        m.address,
        m.phone as phone_number, -- Renamed from phone_number to phone
        m.email,
        m.gender
        -- Add other fields as needed by the Member.js component
      FROM members m
      WHERE m.member_number = $1
    `;
    const result = await pool.query(query, [memberNumber]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching member by number:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single authorization details
router.get('/authorizations/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT        a.*,
        CONCAT(m.last_name, ', ', m.first_name) as member_name,
        m.member_number,
        m.date_of_birth,
        m.insurance_group,
        p.provider_name,
        p.provider_code,
        p.provider_type,
        d.diagnosis_code,
        d.diagnosis_name,
        d.description as diagnosis_description,
        drg.drg_code,
        drg.drg_description,
        drg.weight as drg_weight,
        drg.los_geometric_mean
      FROM authorizations a
      LEFT JOIN members m ON a.member_id = m.id
      LEFT JOIN providers p ON a.provider_id = p.id
      LEFT JOIN diagnoses d ON a.diagnosis_id = d.id
      LEFT JOIN drg_codes drg ON a.drg_code_id = drg.id
      WHERE a.id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Authorization not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching authorization details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
