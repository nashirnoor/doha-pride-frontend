// src/components/routes/PublicRoute.js
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

function PublicRoute({ children }) {
    const auth = isAuthenticated();
    
    if (auth) {
        return <Navigate to="/" replace />;
    }
    
    return children;
}

export default PublicRoute;