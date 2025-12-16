import React, { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxios from '../hooks/useAxios';

const DashboardSuccess = () => {
    const axiosSecure = useAxios();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const calledRef = useRef(false); 

    useEffect(() => {
        if(sessionId && !calledRef.current){
            calledRef.current = true;
            axiosSecure.patch(`/verify-payment?session_id=${sessionId}`)
                .then(res => console.log(res))
                .catch(err => console.error(err));
        }
    }, [sessionId, axiosSecure]);

    return (
        <div>
            <h1>Payment is successful</h1>
            <h1>Please head on over to your registered contest(s) page to view!</h1>
            <Link to='/dashboard/my-registered-contests'>Registered Contests</Link>
        </div>
    );
};

export default DashboardSuccess;
