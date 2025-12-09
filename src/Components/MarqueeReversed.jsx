import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Marquee = ({ text = "biggest-contests" }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    // Clear previous content
    content.innerHTML = "";

    // Dynamically repeat text to fill screen width
    const containerWidth = container.offsetWidth;
    let contentWidth = 0;
    let spanCount = 0;

    while (contentWidth < containerWidth * 2) {
      const span = document.createElement("span");
      span.textContent = text + " ";
      span.className = "mx-4 inline-block";
      span.style.transform = "rotateX(180deg)"; // flip vertically
      content.appendChild(span);

      contentWidth = content.scrollWidth;
      spanCount++;
      if (spanCount > 1000) break; // safety to avoid infinite loop
    }

    // Animate left-to-right infinitely
    gsap.to(content, {
      x: "+=" + content.scrollWidth / 2, // move half of content width
      duration: 20,
      ease: "linear",
      repeat: -1,
    });
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap w-full py-6 flex"
    >
      <div
        ref={contentRef}
        className="flex text-5xl font-bold text-white whitespace-nowrap"
      ></div>
    </div>
  );
};

export default Marquee;
