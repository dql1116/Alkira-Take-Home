/* 
  Track states:

  - stage (where user is in the flow) -> login, mfa, authenticated
  - user (user's public info like email, name, role, once fully authenticated)
  - pendingEmail (email of user who passed step 1, but hasn't finished step 2)

  Functions:

  - login(email, password)
  - verifyMfa(otp)
  - logout()
*/

import { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_USERS, MOCK_OTP } from '../data/mockUsers';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [stage, setStage] = useState('login');
    const [user, setUser] = useState(null);
    const [pendingEmail, setPendingEmail] = useState(null);

    const login = useCallback((email, password) => {
        const match = MOCK_USERS.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password == password
        );

        if (!match) {
            throw new Error('Invalid email or password.');
        }

        // Credentials correct, but not authenticated yet - MFA needed

        setPendingEmail(match.email);
        setStage('mfa');
    }, []);

    const verifyMfa = useCallback(
        (otp) => {
            if (otp !== MOCK_OTP) {
                throw new Error('Invalid verification code.');
            }

            const match = MOCK_USERS.find((u) => u.email === pendingEmail);
            if (!match) {
                setStage('login');
                throw new Error('Session expired. Please log in again.');
            }

            setUser({ email: match.email, name: match.name, role: match.role });
            setStage('authenticated');
        },
        [pendingEmail]
    );

    const logout = useCallback(() => {
        setUser(null);
        setPendingEmail(null);
        setStage('login');
    }, []);

    return (
        <AuthContext.Provider value={{ stage, user, pendingEmail, login, verifyMfa, logout }}>
        {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
}