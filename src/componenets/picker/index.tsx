import React, { useState, useRef } from "react";
// import './SpinnablePicker.css';

interface SpinnablePickerProps {
  options: string[]; // Array of options to display in the picker
}

const SpinnablePicker: React.FC<SpinnablePickerProps> = ({ options }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const touchStartRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]?.clientY) {
      touchStartRef.current = e.touches[0]?.clientY ?? null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current !== null && e.touches[0]?.clientY) {
      const touchEnd = e.touches[0]?.clientY;
      const delta = touchEnd - touchStartRef.current;

      if (delta > 0) {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % options.length);
      } else if (delta < 0) {
        setSelectedIndex(
          (prevIndex) => (prevIndex - 1 + options.length) % options.length
        );
      }

      touchStartRef.current = null;
    }
  };

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY;

    // Calculate the new selected index based on the scroll direction
    if (delta > 0) {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % options.length);
    } else if (delta < 0) {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + options.length) % options.length
      );
    }
  };

  return (
    <div
      className="spinnable-picker"
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {options.map((option, index) => (
        <div
          key={index}
          className={`picker-option ${
            index === selectedIndex ? "selected" : ""
          }`}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default SpinnablePicker;
