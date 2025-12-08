import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Marquee = ({ text = "biggest-contests" }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    // Create enough repetitions to fill the container
    const repeatCount = 20; // adjust if needed
    content.innerHTML = ""; // clear previous
    for (let i = 0; i < repeatCount; i++) {
      const span = document.createElement("span");
      span.textContent = text + " ";
      span.className = "mx-4";
      content.appendChild(span);
    }

    // Duplicate content for seamless looping
    const clone = content.cloneNode(true);
    container.appendChild(clone);

    // Animate the marquee
    const totalWidth = content.offsetWidth;
    gsap.to(container.children, {
      x: `-=${totalWidth}`,
      duration: 20,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`,
      },
    });

  }, [text]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap w-full py-6"
      style={{ display: "flex" }}
    >
      <div
        ref={contentRef}
        className="flex text-5xl font-bold text-white whitespace-nowrap"
      ></div>
    </div>
  );
};

export default Marquee;
