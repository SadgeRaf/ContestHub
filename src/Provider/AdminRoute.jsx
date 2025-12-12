import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import Loading from '../pages/Loading';
import useRole from '../hooks/useRole';
import Forbidden from '../Pages/Forbidden';

const AdminRoute = ({children}) => {
    const {user,loading} = use(AuthContext);
    const {role, roleLoading} = useRole();
    if(loading || roleLoading){
        return <Loading></Loading>
    }

    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;