import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Layout from '../Components/Layout';

const DashboardLayout = () => {
    return (
        <div>
            <Layout></Layout>          
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;