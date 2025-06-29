import React from 'react';
import PropTypes from 'prop-types';
import styles from './GroupQueuesChart.module.css';

/**
 * Group Queues Chart Component for CM Dashboard
 * Displays a donut chart with queue data
 */
const GroupQueuesChart = ({ queuesData, includeFilter = { overdue: true, dueToday: true, all: false } }) => {
    // Calculate total count for percentage calculations
    const totalCount = queuesData.reduce((sum, queue) => sum + queue.count, 0);    // Calculate percentages and cumulative percentages for donut segments
    let cumulativePercentage = 0;
    const processedQueues = queuesData.map((queue, index) => {
        const percentage = (queue.count / totalCount) * 100;
        const startAngle = cumulativePercentage * 3.6 + 130; // Start from right (120 degrees offset)
        cumulativePercentage += percentage;
        const endAngle = cumulativePercentage * 3.6 + 130;

        // Add larger overlap to completely prevent white lines between segments
        const overlapAdjustment = 0.5; // Larger overlap in degrees
        const adjustedStartAngle = index === 0 ? startAngle : startAngle - overlapAdjustment;
        const adjustedEndAngle = index === queuesData.length - 1 ? endAngle : endAngle + overlapAdjustment;

        return {
            ...queue,
            percentage,
            startAngle: adjustedStartAngle,
            endAngle: adjustedEndAngle
        };
    });

    // Create SVG path for donut segment
    const createDonutSegment = (startAngle, endAngle, innerRadius = 46, outerRadius = 76.5) => {
        const centerX = 76.5;
        const centerY = 76.5;

        const startAngleRad = (startAngle - 90) * (Math.PI / 180);
        const endAngleRad = (endAngle - 90) * (Math.PI / 180);

        const x1 = centerX + outerRadius * Math.cos(startAngleRad);
        const y1 = centerY + outerRadius * Math.sin(startAngleRad);
        const x2 = centerX + outerRadius * Math.cos(endAngleRad);
        const y2 = centerY + outerRadius * Math.sin(endAngleRad);

        const x3 = centerX + innerRadius * Math.cos(endAngleRad);
        const y3 = centerY + innerRadius * Math.sin(endAngleRad);
        const x4 = centerX + innerRadius * Math.cos(startAngleRad);
        const y4 = centerY + innerRadius * Math.sin(startAngleRad);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
    };

    return (
        <div className={styles.groupQueuesContainer}>
            <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Group Queues</h3>
                <div className={styles.filterOptions}>
                    <span className={styles.includeLabel}>Include:</span>
                    <label className={styles.filterCheckbox}>
                        <input
                            type="checkbox"
                            checked={includeFilter.overdue}
                            readOnly
                        />
                        <span className={styles.checkboxLabel}>Overdue</span>
                    </label>
                    <label className={styles.filterCheckbox}>
                        <input
                            type="checkbox"
                            checked={includeFilter.dueToday}
                            readOnly
                        />
                        <span className={styles.checkboxLabel}>Due Today</span>
                    </label>
                    <label className={styles.filterCheckbox}>
                        <input
                            type="checkbox"
                            checked={includeFilter.all}
                            readOnly
                        />
                        <span className={styles.checkboxLabel}>All</span>
                    </label>
                </div>
            </div>

            <div className={styles.chartContent}>
                {/* Donut Chart */}
                <div className={styles.donutChart}>
                    <svg
                        width="153"
                        height="153"
                        viewBox="0 0 153 153"
                        style={{
                            shapeRendering: 'geometricPrecision',
                            display: 'block'
                        }}
                    >
                        {processedQueues.map((queue) => (
                            <path
                                key={queue.label}
                                d={createDonutSegment(queue.startAngle, queue.endAngle)}
                                fill={queue.color}
                                stroke={queue.color}
                                strokeWidth="0.5"
                                style={{
                                    strokeLinejoin: 'round',
                                    strokeLinecap: 'round'
                                }}
                            />
                        ))}
                    </svg>
                </div>

                {/* Legend */}
                <div className={styles.legend}>
                    {processedQueues.map((queue) => (
                        <div key={queue.label} className={styles.legendItem}>
                            <div
                                className={styles.legendColor}
                                style={{ backgroundColor: queue.color }}
                            ></div>
                            <span className={styles.legendLabel}>
                                {queue.label} ({queue.count})
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

GroupQueuesChart.propTypes = {
    queuesData: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired
    })).isRequired,
    includeFilter: PropTypes.shape({
        overdue: PropTypes.bool,
        dueToday: PropTypes.bool,
        all: PropTypes.bool
    })
};

export default GroupQueuesChart;
