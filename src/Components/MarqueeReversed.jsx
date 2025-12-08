import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Marquee = ({ text = "biggest-contests" }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    // Clear previous content and repeat text
    const repeatCount = 20;
    content.innerHTML = "";
    for (let i = 0; i < repeatCount; i++) {
      const span = document.createElement("span");
      span.textContent = text + " ";
      span.className = "mx-4";
      content.appendChild(span);
    }

    // Duplicate for seamless loop
    const clone = content.cloneNode(true);
    container.appendChild(clone);

    // Animate left-to-right
    const totalWidth = content.offsetWidth;
    gsap.to(container.children, {
      x: `+=${totalWidth}`, // left-to-right
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
      className="overflow-hidden whitespace-nowrap w-full py-6 flex"
      style={{ perspective: "1000px" }} // needed for rotateX
    >
      <div
        ref={contentRef}
        className="flex text-5xl font-bold text-white whitespace-nowrap"
        style={{ transform: "rotateX(180deg)" }} // flip only the content
      ></div>
    </div>
  );
};

export default Marquee;
