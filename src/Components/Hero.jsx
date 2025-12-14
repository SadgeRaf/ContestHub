import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Typewriter from "typewriter-effect";



gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const imageContainer = useRef();

    useGSAP(() => {
        gsap.from(imageContainer.current, {
            scrollTrigger: {
                trigger: imageContainer.current,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
        })
    }, []);

    const onSubmit = (data) => {
        const query = data.search.trim();

        if (!query) return;

        navigate(`/search/${encodeURIComponent(query)}`);
    };

    return (
        <div ref={imageContainer}
            className="hero min-h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}
        >
            <div className="hero-overlay"></div>

            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-2xl">
                    <h1 className="mb-5 text-6xl font-bold drop-shadow-xl">
                        Find Your Next{" "}
                        <span className="text-primary">
                            <Typewriter
                                options={{
                                    strings: [
                                        "Contest",
                                        "Challenge",
                                        "Battle",
                                        "Opportunity",
                                        "Victory",
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    delay: 70,
                                    deleteSpeed: 40,
                                }}
                            />
                        </span>
                    </h1>



                    <p className="mb-8 text-lg opacity-90">
                        Search contests by type — programming, math, robotics, esports, and more.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex items-center justify-center gap-2"
                    >
                        <input
                            {...register("search")}
                            type="text"
                            placeholder="Search contest type..."
                            className="input input-bordered w-full max-w-md bg-white text-black"
                        />

                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Hero;
