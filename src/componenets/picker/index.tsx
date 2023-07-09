import React, { useRef, useEffect } from "react";

interface SpinnablePickerProps {
  options: string[];
  initialIndex: number;
  setInitialIndex: (n: number) => void;
  size?: "small" | "medium" | "large";
}

const SpinnablePicker: React.FC<SpinnablePickerProps> = ({
  options,
  initialIndex,
  setInitialIndex,
  size = "large",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const momentumRef = useRef<number>(0);
  const touchStartRef = useRef<number | null>(null);
  const touchMoveRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  console.log("\n\n", typeof options);
  console.log(typeof initialIndex);
  console.log(typeof setInitialIndex);
  console.log(typeof momentumRef);
  console.log(typeof animationFrameRef);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current!);
    };
  }, []);

  const changeSelectedIndexWithAnimation = (delta: number) => {
    const newIndex = initialIndex - delta;
    const maxIndex = options.length - 1;
    const minIndex = 0;
    let n = 0;
    if (newIndex > maxIndex) {
      const exceededDelta = newIndex - maxIndex;
      momentumRef.current += exceededDelta;
      n = maxIndex;
    } else if (newIndex < minIndex) {
      const exceededDelta = minIndex - newIndex;
      momentumRef.current -= exceededDelta;
      n = minIndex;
    } else {
      n = Math.round(newIndex);
    }
    setInitialIndex(n);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY / 150;
    changeSelectedIndexWithAnimation(delta);
    cancelAnimationFrame(animationFrameRef.current!);
    animationFrameRef.current = requestAnimationFrame(animateMomentum);
  };

  const animateMomentum = () => {
    if (momentumRef.current !== 0) {
      const newIndex = initialIndex + momentumRef.current;
      const maxIndex = options.length - 1;
      const minIndex = 0;
      let n = 0;

      if (newIndex >= maxIndex) {
        momentumRef.current *= 0;
        n = maxIndex;
      } else if (newIndex <= minIndex) {
        momentumRef.current *= 0;
        n = minIndex;
      } else {
        momentumRef.current *= 0.8;
        n = Math.round(newIndex);
      }
      setInitialIndex(n);

      if (Math.abs(momentumRef.current) > 0.1) {
        animationFrameRef.current = requestAnimationFrame(animateMomentum);
      } else {
        momentumRef.current = 0;
      }
    }
  };

  const handleItemClick = (id: number) => {
    changeSelectedIndexWithAnimation(initialIndex - id);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    touchStartRef.current = e.touches[0]?.clientY || null;
    touchMoveRef.current = touchStartRef.current;
    momentumRef.current = 0;
    cancelAnimationFrame(animationFrameRef.current!);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (touchStartRef.current !== null && e.touches) {
      const touchMove = e.touches[0]?.clientY || 0;
      const delta = (touchMove - (touchMoveRef.current ?? 0)) / 15;
      console.log("touch delta", delta);
      touchMoveRef.current = touchMove;
      changeSelectedIndexWithAnimation(delta);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    touchStartRef.current = null;
    touchMoveRef.current = null;

    animationFrameRef.current = requestAnimationFrame(animateMomentum);
  };

  useEffect(() => {
    const containerElement = containerRef.current;

    if (containerElement) {
      const handleTransitionEnd = () => {
        if (initialIndex === 0 || initialIndex === options.length - 1) {
          containerElement.style.transition = "none";
          requestAnimationFrame(() => {
            containerElement.style.transition = "";
          });
        }
      };

      containerElement.addEventListener("transitionend", handleTransitionEnd);

      return () => {
        containerElement.removeEventListener(
          "transitionend",
          handleTransitionEnd
        );
      };
    }
  }, [initialIndex, options.length]);

  return (
    <div
      className={
        "spinnable-picker " +
        (size == "small" ? "small-picker " : "") +
        (size == "medium" ? "medium-picker " : "")
      }
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ overflow: "hidden" }}
      ref={containerRef}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(-${initialIndex * 40}px)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className={`picker-option`}></div>
        <div className={`picker-option`}></div>
        {options.map((option, index) => (
          <div
            key={index}
            onTouchStart={(e) => {
              handleItemClick(index);
              handleTouchStart(e);
            }}
            onClick={() => handleItemClick(index)}
            className={`picker-option cursor-pointer select-none ${
              index === initialIndex ? "selected" : ""
            }`}
          >
            {option}
          </div>
        ))}
        <div className={`picker-option`}></div>
        <div className={`picker-option`}></div>
      </div>
    </div>
  );
};

export default SpinnablePicker;
