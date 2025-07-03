/**
 * Static User Data for Authentication
 * Replaces API-based authentication with client-side verification
 * Contains all demo users with their credentials and profile information
 */

// Demo users with hashed passwords (for demo purposes, we'll use simple comparison)
export const STATIC_USERS = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@myhealthplan.com',
        password: 'password123', // In production, this would be hashed
        full_name: 'System Administrator',
        role: 'admin',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
    },
    {
        id: 2,
        username: 'maria.hartsell',
        email: 'maria.hartsell@myhealthplan.com',
        password: 'password123',
        full_name: 'Maria Hartsell',
        role: 'UM',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
    },
    {
        id: 3,
        username: 'elise.tran',
        email: 'elise.tran@myhealthplan.com',
        password: 'password123',
        full_name: 'Elise Tran',
        role: 'UM-SNF',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
    },
    {
        id: 4,
        username: 'karen.white',
        email: 'karen.white@myhealthplan.com',
        password: 'password123',
        full_name: 'Karen White',
        role: 'CM',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
    }
];

/**
 * Simple token generation for demo purposes
 * In production, use proper authentication library
 */
export const generateDemoToken = (user) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'TOKEN' }));
    const payload = btoa(JSON.stringify({
        userId: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    }));
    const signature = btoa('demo-signature-' + user.id);

    return `${header}.${payload}.${signature}`;
};

/**
 * Validate demo token
 */
export const validateDemoToken = (token) => {
    try {
        if (!token || typeof token !== 'string') {
            return null;
        }

        const parts = token.split('.');
        if (parts.length !== 3) {
            return null;
        }

        const payload = JSON.parse(atob(parts[1]));

        // Check if token is expired
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }

        return payload;
    } catch (error) {
        console.error('❌ Token validation error:', error);
        return null;
    }
};

/**
 * Find user by email
 */
export const findUserByEmail = (email) => {
    return STATIC_USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
};

/**
 * Verify user credentials
 */
export const verifyCredentials = (email, password) => {
    const user = findUserByEmail(email);
    if (!user) {
        return null;
    }

    // Simple password comparison for demo
    // In production, use proper password hashing comparison
    if (user.password === password) {
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    return null;
};

/**
 * Get user profile by ID
 */
export const getUserProfile = (userId) => {
    const user = STATIC_USERS.find(u => u.id === userId);
    if (user) {
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
};
