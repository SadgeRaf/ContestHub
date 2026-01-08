// ReversedMarquee.jsx
import React from "react";
import Marquee from "react-fast-marquee";

const ReversedMarquee = ({ text }) => {
  return (
    <Marquee
      gradient={false}
      speed={300}
      pauseOnHover={true}
      direction="right"
      className="py-4 md:py-6 text-3xl md:text-5xl font-bold"
    >
      {Array(20)
        .fill(text)
        .map((t, i) => (
          <span key={i} className="mx-3 md:mx-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent">
            {t}
          </span>
        ))}
    </Marquee>
  );
};

export default ReversedMarquee;
