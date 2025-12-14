import Marquee from "react-fast-marquee";

const BigContestMarquee = ({ text }) => {
  return (
    <Marquee
      gradient={false}       
      speed={300}    
      pauseOnHover={true}    
      className="py-6 text-5xl font-bold text-white"
    >
      {Array(20).fill(text).map((t, i) => (
        <span key={i} className="mx-4">{t}</span>
      ))}
    </Marquee>
  );
};

export default BigContestMarquee;
