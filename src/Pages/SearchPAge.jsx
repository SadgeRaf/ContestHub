import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import Card from "../Components/Card"; // import your Card component

const SearchPage = () => {
    const { query } = useParams();
    const axiosSecure = useAxios();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["searchContests", query],
        queryFn: async () => {
            const res = await axiosSecure.get(`/search?type=${query}`);
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto mt-20 px-4 mb-10">
            <h1 className="text-3xl font-bold mb-5 text-center">
                Search Results for "{query}"
            </h1>

            {contests.length === 0 ? (
                <p className="text-center">No contests found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
                    {contests.map((contest) => (
                        <Card key={contest._id} contest={contest} />
                    ))}
                </div>
            )}
            <Link to='/' className="btn w-11/12 mx-auto mt-5 rounded-3xl">Go Back</Link>
        </div>
    );
};

export default SearchPage;
