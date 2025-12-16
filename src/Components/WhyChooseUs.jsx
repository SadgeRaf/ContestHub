import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const containerRef = useRef();
  const contentRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const reasons = [
    {
      title: "Best Destination for Practicing and Winning",
      description: "Join thousands of gamers who've improved their skills and won big on our platform.",
      color: "bg-gradient-to-r from-orange-500 to-orange-600"
    },
    {
      title: "Been here since 2025",
      description: "Pioneering the future of competitive gaming with years of experience.",
      color: "bg-gradient-to-r from-red-500 to-red-600"
    },
    {
      title: "Trusted and Sponsored By Thousands",
      description: "Backed by major brands and trusted by a global community.",
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      title: "Always Putting the People First",
      description: "Community-driven approach ensures amazing experiences for everyone.",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    }
  ];

  useGSAP(() => {
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === containerRef.current) {
        trigger.kill();
      }
    });

    const boxes = contentRef.current?.querySelectorAll('.scroll-box');
    if (!boxes || boxes.length === 0) return;

    const totalWidth = (boxes.length - 1) * 100;

    gsap.to(boxes, {
      xPercent: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", 
        scrub: true,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * boxes.length),
            boxes.length - 1
          );
          setActiveIndex(index);
        },
        invalidateOnRefresh: true,
      }
    });

    gsap.fromTo(
      '.text-container',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, { scope: containerRef, dependencies: [] });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen">
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col lg:flex-row items-center h-full min-h-screen">

          <div className="lg:w-1/2 text-container p-8 lg:p-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose <span className="text-blue-600">Us?</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              We provide the best platform for gamers to practice, compete, and win amazing prizes.
            </p>
            

            <div className="mt-8">
              <div className="text-sm text-gray-500 mb-2">
                {activeIndex + 1} / {reasons.length}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-800">
                {reasons[activeIndex].title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {reasons[activeIndex].description}
              </p>
            </div>


            <div className="flex space-x-2 mt-8">
              {reasons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const scrollAmount = index * (window.innerHeight * 1.2);
                    window.scrollTo({
                      top: containerRef.current.offsetTop + scrollAmount,
                      behavior: 'smooth'
                    });
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-blue-600' 
                      : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to reason ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 h-full flex items-center">
            <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
              <div
                ref={contentRef}
                className="flex absolute top-0 left-0 w-[400%] h-full"
              >
                {reasons.map((reason, index) => (
                  <div
                    key={index}
                    className={`scroll-box w-1/4 h-full flex items-center justify-center p-6 ${reason.color}`}
                  >
                    <div className="text-center text-white max-w-md">
                      <div className="text-5xl lg:text-6xl font-bold mb-4 opacity-90">
                        0{index + 1}
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                        <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                          {reason.title}
                        </h3>
                        <p className="text-white/90">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
                Scroll to continue →
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;