import React from "react";
import { useForm } from "react-hook-form";

const Hero = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <div
            className="hero min-h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}
        >
            <div className="hero-overlay bg-black bg-opacity-60"></div>

            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-2xl">
                    <h1 className="mb-5 text-6xl font-bold drop-shadow-xl">
                        Find Your Next Contest
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
