import React from "react";
import { useQuery } from "@tanstack/react-query";
import Hero from "../Components/Hero";
import useAxios from "../hooks/useAxios";
import Card from '../Components/Card'
import WinnerAdvertisement from "../Components/WinnerAdvertisment";
import WhyChooseUs from "../Components/WhyChooseUs";
import { Link } from "react-router";
import ReversedMarquee from "../Components/ReversedMarquee";
import BigContestMarquee from "../Components/Marquee";
import Loading from '../Pages/Loading';

const Home = () => {
    const axiosSecure = useAxios();

    const { data: contests = [], isLoading, isError, error } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bigcontests");
            return res.data;
        },
    });

    if (isLoading) return <Loading></Loading>
    if (isError) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

    return (
        <div >
            <div>
                <Hero />
            </div>

            <BigContestMarquee text="biggest-contests"/>

            <div  className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {contests.length > 0 ? (
                    contests.map((contest) => <Card key={contest._id} contest={contest} />)
                ) : (
                    <p>No contests available.</p>
                )}
            </div>

            <div className="flex justify-center mt-4">
                <Link to='/allcontests' className="btn w-6/12">See ALL</Link>
            </div>

            <ReversedMarquee text="biggest-contests"/>

            <h1 className="font-bold text-5xl mb-5 text-center">Winners</h1>

            <div>
                <WinnerAdvertisement></WinnerAdvertisement>
            </div>
            
            <h1 className="font-bold text-5xl mb-5 text-center mt-4">About Our Platform</h1>
            <div className="mt-10">
                <WhyChooseUs></WhyChooseUs>
            </div>
        </div>
    );
};

export default Home;
