import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const containerRef = useRef();
  const scrollRef = useRef();

  useLayoutEffect(() => {
    const sections = scrollRef.current.querySelectorAll('.box');
    const totalWidth = scrollRef.current.scrollWidth;
    const viewportWidth = scrollRef.current.offsetWidth;

    // Animate horizontal scroll
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalWidth - viewportWidth}`,
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex w-max space-x-4"
      >
        <div className="box bg-orange-500 w-screen h-64 flex items-center justify-center text-3xl font-bold">
          Box 1
        </div>
        <div className="box bg-red-500 w-screen h-64 flex items-center justify-center text-3xl font-bold">
          Box 2
        </div>
        <div className="box bg-green-500 w-screen h-64 flex items-center justify-center text-3xl font-bold">
          Box 3
        </div>
        <div className="box bg-blue-500 w-screen h-64 flex items-center justify-center text-3xl font-bold">
          Box 4
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
