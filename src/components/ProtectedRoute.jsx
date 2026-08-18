import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
    const { stage } = useAuth();

    if (stage !== 'authenticated') {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>
}