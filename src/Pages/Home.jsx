import React from "react";
import { useQuery } from "@tanstack/react-query";
import Hero from "../Components/Hero";
import useAxios from "../hooks/useAxios";
import Card from '../Components/Card'
import Marquee from "../Components/MArquee";
import MarqueeReversed from '../Components/MarqueeReversed'


const Home = () => {
    const axiosSecure = useAxios();

    // Fetch contests with react-query
    const { data: contests = [], isLoading, isError, error } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            console.log(res.data)
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading contests...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

    return (
        <div>
            <Hero />
            <Marquee text="biggest-contests" />
            <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {contests.length > 0 ? (
                    contests.map((contest) => <Card key={contest._id} contest={contest} />)
                ) : (
                    <p>No contests available.</p>
                )}
            </div>
            <MarqueeReversed text="biggest-contests" />
        </div>
    );
};

export default Home;
