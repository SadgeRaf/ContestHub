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
import { CalendarDays, Trophy, Users, TrendingUp, ShieldCheck, Clock, Award, Star, Zap, Heart, Target, Globe, DollarSign } from "lucide-react";

const Home = () => {
    const axiosSecure = useAxios();

    // Query for all contests
    const { data: contests = [], isLoading: contestsLoading, isError: contestsError, error: contestsErrorMsg } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            return res.data;
        },
    });

    // Query for winners data
    const { data: winners = [], isLoading: winnersLoading, isError: winnersError } = useQuery({
        queryKey: ["winners"],
        queryFn: async () => {
            const res = await axiosSecure.get("/winners/all");
            return res.data;
        },
    });

    if (contestsLoading || winnersLoading) return <Loading />;
    if (contestsError) return <p className="text-center mt-10 text-red-500">Error loading contests: {contestsErrorMsg.message}</p>;
    if (winnersError) return <p className="text-center mt-10 text-red-500">Error loading winners data</p>;

    // Calculate stats from real data
    const totalContests = contests.length;
    const totalWinners = winners.length;
    const totalPrizeMoney = winners.reduce((sum, winner) => sum + (winner.prize || 0), 0);
    const totalParticipants = winners.reduce((sum, winner) => sum + (winner.totalParticipants || 0), 0);

    // Get ending soon contests (assuming contests have a deadline field)
    const endingSoonContests = contests
        .filter(contest => contest.deadline)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 6);

    // Get popular contests (assuming contests have a participants field)
    const popularContests = contests
        .filter(contest => contest.participants)
        .sort((a, b) => b.participants.length - a.participants.length)
        .slice(0, 6);

    return (
        <div className="min-h-screen">
            {/* Section 1: Hero */}
            <div className="mb-16">
                <Hero />
            </div>

            {/* Section 2: Stats Bar - Using real data */}
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 py-8 border-y border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{totalWinners || 0}</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Winners Crowned</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Users className="w-5 h-5 text-blue-500" />
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{totalParticipants || 0}</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Total Participants</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <CalendarDays className="w-5 h-5 text-green-500" />
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{totalContests || 0}</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Total Contests</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <DollarSign className="w-5 h-5 text-purple-500" />
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">${totalPrizeMoney || 0}</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Total Prizes</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Marquee */}
            <div className="my-8 px-4">
                <BigContestMarquee text="biggest-contests" />
            </div>

            {/* Section 4: ALL CONTESTS SHOWCASE - Keep them together */}
            <div id="contests-section" className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                            All Active Contests
                        </h2>
                        <Trophy className="w-6 h-6 text-yellow-500" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        Browse through all our active contests and find the perfect challenge for you
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contests.length > 0 ? (
                        contests.slice(0, 6).map((contest, index) => (
                            <div key={contest._id} className="group">
                                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                    <Card contest={contest} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-3 text-gray-600 dark:text-gray-400 py-8">
                            No contests available at the moment.
                        </p>
                    )}
                </div>

                {contests.length > 6 && (
                    <div className="text-center mt-10">
                        <Link 
                            to='/allcontests' 
                            className="inline-flex items-center gap-2 btn bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                        >
                            View All Contests ({contests.length})
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>

            {/* Section 5: How It Works */}
            <div id="how-it-works" className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <Zap className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                            How ContestHub Works
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Start your journey in three simple steps
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="relative">
                            <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                                    <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                    1
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Sign Up & Explore</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Create your free account and browse through exciting contests across multiple categories.
                                </p>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center">
                                    <Target className="w-10 h-10 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="absolute -top-3 -left-3 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                    2
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Submit Your Entry</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Follow contest guidelines and submit your creative work. Track your submission status in real-time.
                                </p>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 flex items-center justify-center">
                                    <Award className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="absolute -top-3 -left-3 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                    3
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Win & Shine</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Get fair judgment, receive recognition, win amazing prizes, and build your portfolio.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 6: Reversed Marquee */}
            <div className="my-8 px-4">
                <ReversedMarquee text="join-now-and-win" />
            </div>

            {/* Section 7: Popular Contests */}
            {popularContests.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <TrendingUp className="w-8 h-8 text-orange-500" />
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Most Popular Contests</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                Contests with the highest participation
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link 
                                to='/allcontests?sort=popular'
                                className="btn bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 px-6 py-2 rounded-lg"
                            >
                                View More
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popularContests.slice(0, 3).map((contest) => (
                            <div key={contest._id} className="group">
                                <div className="relative overflow-hidden rounded-xl">
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        Trending
                                    </div>
                                    <Card contest={contest} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Section 8: Ending Soon */}
            {endingSoonContests.length > 0 && (
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Clock className="w-8 h-8 text-red-500" />
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Ending Soon</h2>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Hurry up! These contests are closing shortly
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="flex items-center gap-2 text-red-500">
                                    <Clock className="w-5 h-5" />
                                    <span className="font-bold">Limited Time</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {endingSoonContests.slice(0, 3).map((contest) => (
                                <div key={contest._id} className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent rounded-xl pointer-events-none"></div>
                                    <Card contest={contest} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Section 9: Winners Showcase */}
            <div id="winners-section" className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h1 className="font-bold text-4xl md:text-5xl mb-4 text-gray-800 dark:text-white">Our Champions</h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        Meet the talented winners who showcased their skills and won amazing prizes
                    </p>
                </div>
                <WinnerAdvertisement />
            </div>

            {/* Section 10: Trust & Security */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-green-400" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Trust & Security</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Your contests are in safe hands with our transparent judging process
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
                            <div className="text-3xl font-bold text-green-400 mb-3">Fair</div>
                            <h3 className="text-xl font-semibold mb-3 text-white">Transparent Judging</h3>
                            <p className="text-gray-300">Clear criteria and unbiased evaluation</p>
                        </div>
                        <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
                            <div className="text-3xl font-bold text-blue-400 mb-3">Secure</div>
                            <h3 className="text-xl font-semibold mb-3 text-white">Safe Platform</h3>
                            <p className="text-gray-300">Protected submissions and data privacy</p>
                        </div>
                        <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
                            <div className="text-3xl font-bold text-purple-400 mb-3">24/7</div>
                            <h3 className="text-xl font-semibold mb-3 text-white">Support</h3>
                            <p className="text-gray-300">Round-the-clock assistance</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 11: Community Testimonials */}
            <div className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                            Community Love
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            What our talented participants have to say
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Alex Morgan",
                                role: "Photography Winner",
                                content: "Winning the landscape photography contest opened doors to professional opportunities I never imagined!",
                                color: "from-blue-400 to-purple-400"
                            },
                            {
                                name: "Samantha Lee",
                                role: "Design Champion",
                                content: "The feedback from judges was incredibly valuable for my growth as a designer. Highly recommended!",
                                color: "from-green-400 to-teal-400"
                            },
                            {
                                name: "David Chen",
                                role: "Coding Master",
                                content: "Most organized platform I've used. The transparent judging process gave me confidence in the results.",
                                color: "from-orange-400 to-red-400"
                            }
                        ].map((testimonial, index) => (
                            <div 
                                key={index} 
                                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex items-center mb-4">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} mr-4`}></div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 dark:text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 italic">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 12: CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Showcase Your Talent?
                    </h2>
                    <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of creators, innovators, and thinkers in the most exciting contests
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/allcontests"
                            className="btn bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                            Browse All Contests
                        </Link>
                        <Link
                            to="/register"
                            className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-lg px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                            Join Now - It's Free
                        </Link>
                    </div>
                </div>
            </div>

            {/* Section 13: Why Choose Us */}
            <div id="why-choose-us" className="max-w-7xl mx-auto px-4 py-16">
                <h1 className="font-bold text-4xl md:text-5xl mb-10 text-center text-gray-800 dark:text-white">
                    Why Choose ContestHub?
                </h1>
                <div className="mt-10">
                    <WhyChooseUs />
                </div>
            </div>
        </div>
    );
};

export default Home;