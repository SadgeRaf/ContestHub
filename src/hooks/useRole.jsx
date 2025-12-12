import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxios from './useAxios';

const useRole = () => {
    const {user} = use(AuthContext)
    const axiosSecure = useAxios()
    const {data: role = 'user', isLoading: roleLoading} = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`users/${user.email}/role`);
            return res.data.role;
        }
    })
    
    return { role, roleLoading};
};

export default useRole;