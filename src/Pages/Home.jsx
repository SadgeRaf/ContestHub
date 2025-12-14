import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Hero from "../Components/Hero";
import useAxios from "../hooks/useAxios";
import Card from '../Components/Card'
import Marquee from "../Components/MArquee";
import WinnerAdvertisement from "../Components/WinnerAdvertisment";
import WhyChooseUs from "../Components/WhyChooseUs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const axiosSecure = useAxios();
    const heroRef = useRef();

    // Fetch contests with react-query
    const { data: contests = [], isLoading, isError, error } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bigcontests");
            console.log(res.data)
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading contests...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

    return (
        <div >
            <div>
                <Hero />
            </div>
            <Marquee text="biggest-contests" />
            <div  className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {contests.length > 0 ? (
                    contests.map((contest) => <Card key={contest._id} contest={contest} />)
                ) : (
                    <p>No contests available.</p>
                )}
            </div>
            <Link to='/allcontests' className="btn">See ALL</Link>
            <Marquee text="biggest-contests" />
            <h1 className="font-bold text-5xl mb-5 text-center">Winners</h1>
            <div ref={heroRef}>
                <WinnerAdvertisement></WinnerAdvertisement>
            </div>
            <h1>About Our Platform</h1>
            <div className="mt-10">
                <WhyChooseUs></WhyChooseUs>
            </div>
        </div>
    );
};

export default Home;
