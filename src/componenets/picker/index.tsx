import React, { useState, useRef, useEffect } from "react";

interface SpinnablePickerProps {
  options: string[];
}

const SpinnablePicker: React.FC<SpinnablePickerProps> = ({ options }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const momentumRef = useRef<number>(0);
  const touchStartRef = useRef<number | null>(null);
  const touchMoveRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current!);
    };
  }, []);

  const changeSelectedIndexWithAnimation = (delta: number) => {
    setSelectedIndex((prevIndex) => {
      const newIndex = prevIndex - delta;
      const maxIndex = options.length - 1;
      const minIndex = 0;
      console.log("newIndex", newIndex);

      if (newIndex > maxIndex) {
        const exceededDelta = newIndex - maxIndex;
        momentumRef.current += exceededDelta;
        return maxIndex;
      } else if (newIndex < minIndex) {
        const exceededDelta = minIndex - newIndex;
        momentumRef.current -= exceededDelta;
        return minIndex;
      } else {
        return Math.round(newIndex);
      }
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY / 150;
    console.log("delta", delta);

    changeSelectedIndexWithAnimation(delta);

    cancelAnimationFrame(animationFrameRef.current!);
    animationFrameRef.current = requestAnimationFrame(animateMomentum);
  };

  const animateMomentum = () => {
    if (momentumRef.current !== 0) {
      setSelectedIndex((prevIndex) => {
        const newIndex = prevIndex + momentumRef.current;
        const maxIndex = options.length - 1;
        const minIndex = 0;

        if (newIndex >= maxIndex) {
          momentumRef.current *= 0;
          return maxIndex;
        } else if (newIndex <= minIndex) {
          momentumRef.current *= 0;
          return minIndex;
        } else {
          momentumRef.current *= 0.8;
          return Math.round(newIndex);
        }
      });

      if (Math.abs(momentumRef.current) > 0.1) {
        animationFrameRef.current = requestAnimationFrame(animateMomentum);
      } else {
        momentumRef.current = 0;
      }
    }
  };

  const handleItemClick = (id: number) => {
    changeSelectedIndexWithAnimation(selectedIndex - id);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = e.touches[0]?.clientY || null;
    touchMoveRef.current = touchStartRef.current;
    momentumRef.current = 0;
    cancelAnimationFrame(animationFrameRef.current!);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current !== null && e.touches) {
      const touchMove = e.touches[0]?.clientY || 0;
      const delta = (touchMove - (touchMoveRef.current ?? 0)) / 10;
      console.log("touch delta", delta);
      touchMoveRef.current = touchMove;
      changeSelectedIndexWithAnimation(delta);
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    touchMoveRef.current = null;

    animationFrameRef.current = requestAnimationFrame(animateMomentum);
  };

  useEffect(() => {
    const containerElement = containerRef.current;

    if (containerElement) {
      const handleTransitionEnd = () => {
        if (selectedIndex === 0 || selectedIndex === options.length - 1) {
          containerElement.style.transition = "none";
          // containerElement.style.transform = `translateY(-${
          //   selectedIndex * 50
          // }px)`;
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
  }, [selectedIndex, options.length]);

  return (
    <div
      className="spinnable-picker"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ overflow: "hidden" }}
      ref={containerRef}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(-${selectedIndex * 40}px)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className={`picker-option`}></div>
        <div className={`picker-option`}></div>
        {options.map((option, index) => (
          <div
            key={index}
            onTouchEnd={() => handleItemClick(index)}
            onClick={() => handleItemClick(index)}
            className={`picker-option ${
              index === selectedIndex ? "selected" : ""
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

// import React, { useState, useRef, useEffect } from "react";
// // import './SpinnablePicker.css';

// interface SpinnablePickerProps {
//   options: string[];
// }

// const SpinnablePicker: React.FC<SpinnablePickerProps> = ({ options }) => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const momentumRef = useRef<number>(0);
//   const animationFrameRef = useRef<number | null>(null);

//   useEffect(() => {
//     return () => {
//       cancelAnimationFrame(animationFrameRef.current!);
//     };
//   }, []);

//   const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
//     // e.preventDefault();
//     const delta = e.deltaY / 150;

//     setSelectedIndex((prevIndex) => {
//       console.log("delta, ", delta);
//       const newIndex = prevIndex - delta;
//       const maxIndex = options.length - 1;
//       const minIndex = 0;

//       if (newIndex > maxIndex) {
//         const exceededDelta = newIndex - maxIndex;
//         momentumRef.current += exceededDelta;
//         return maxIndex;
//       } else if (newIndex < minIndex) {
//         const exceededDelta = minIndex - newIndex;
//         momentumRef.current -= exceededDelta;
//         return minIndex;
//       } else {
//         return Math.round(newIndex);
//       }
//     });

//     cancelAnimationFrame(animationFrameRef.current!);
//     animationFrameRef.current = requestAnimationFrame(animateMomentum);
//   };

//   const animateMomentum = () => {
//     if (momentumRef.current !== 0) {
//       setSelectedIndex((prevIndex) => {
//         const newIndex = prevIndex + momentumRef.current;
//         const maxIndex = options.length - 1;
//         const minIndex = 0;

//         if (newIndex > maxIndex) {
//           momentumRef.current *= 0.8;
//           return maxIndex;
//         } else if (newIndex < minIndex) {
//           momentumRef.current *= 0.8;
//           return minIndex;
//         } else {
//           momentumRef.current *= 0.98;
//           return Math.round(newIndex);
//         }
//       });

//       if (Math.abs(momentumRef.current) > 0.1) {
//         animationFrameRef.current = requestAnimationFrame(animateMomentum);
//       } else {
//         momentumRef.current = 0;
//       }
//     }
//   };

//   console.log("selectedIndex", selectedIndex);

//   return (
//     <div
//       className="spinnable-picker"
//       onWheel={handleWheel}
//       style={{ overflow: "hidden" }}
//     >
//       <div style={{ transform: `translateY(-${selectedIndex * 40}px)` }}>
//         {options.map((option, index) => (
//           <div
//             key={index}
//             className={`picker-option ${
//               index === selectedIndex ? "selected" : ""
//             }`}
//           >
//             {option}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SpinnablePicker;

// import React, { useState, useRef } from "react";
// // import './SpinnablePicker.css';

// interface SpinnablePickerProps {
//   options: string[]; // Array of options to display in the picker
// }

// const SpinnablePicker: React.FC<SpinnablePickerProps> = ({ options }) => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const touchStartRef = useRef<number | null>(null);

//   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//     if (e.touches[0]?.clientY) {
//       touchStartRef.current = e.touches[0]?.clientY ?? null;
//     }
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//     if (touchStartRef.current !== null && e.touches[0]?.clientY) {
//       const touchEnd = e.touches[0]?.clientY;
//       const delta = touchEnd - touchStartRef.current;

//       if (delta > 0) {
//         setSelectedIndex((prevIndex) => (prevIndex + 1) % options.length);
//       } else if (delta < 0) {
//         setSelectedIndex(
//           (prevIndex) => (prevIndex - 1 + options.length) % options.length
//         );
//       }

//       touchStartRef.current = null;
//     }
//   };

//   const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const delta = e.deltaY;

//     // Calculate the new selected index based on the scroll direction
//     if (delta > 0) {
//       setSelectedIndex((prevIndex) => (prevIndex + 1) % options.length);
//     } else if (delta < 0) {
//       setSelectedIndex(
//         (prevIndex) => (prevIndex - 1 + options.length) % options.length
//       );
//     }
//   };

//   return (
//     <div
//       className="spinnable-picker"
//       onWheel={handleScroll}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//     >
//       {options.map((option, index) => (
//         <div
//           key={index}
//           className={`picker-option ${
//             index === selectedIndex ? "selected" : ""
//           }`}
//         >
//           {option}
//         </div>
//       ))}
//     </div>
//   );
// };

// // export default SpinnablePicker;

// import React, { useState, useRef, useEffect } from "react";
// // import "./SpinnablePicker.css";

// interface SpinnablePickerProps {
//   options: string[];
// }

// const SpinnablePicker: React.FC<SpinnablePickerProps> = ({ options }) => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const touchStartRef = useRef<number | null>(null);
//   const touchMoveRef = useRef<number | null>(null);
//   const momentumRef = useRef<number>(0);
//   const animationFrameRef = useRef<number | null>(null);

//   useEffect(() => {
//     return () => {
//       cancelAnimationFrame(animationFrameRef.current!);
//     };
//   }, []);

//   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//     touchStartRef.current = e.touches[0]?.clientY || null;
//     touchMoveRef.current = touchStartRef.current;
//     momentumRef.current = 0;
//     cancelAnimationFrame(animationFrameRef.current!);
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//     if (touchStartRef.current !== null && e.touches) {
//       const touchMove = e.touches[0]?.clientY || 0;
//       const delta = touchMove - (touchMoveRef.current ?? 0);
//       touchMoveRef.current = touchMove;

//       setSelectedIndex((prevIndex) => {
//         const newIndex = prevIndex - delta;
//         const maxIndex = options.length - 1;
//         const minIndex = 0;

//         if (newIndex > maxIndex) {
//           const exceededDelta = newIndex - maxIndex;
//           momentumRef.current += exceededDelta;
//           return maxIndex;
//         } else if (newIndex < minIndex) {
//           const exceededDelta = minIndex - newIndex;
//           momentumRef.current -= exceededDelta;
//           return minIndex;
//         } else {
//           return Math.round(newIndex);
//         }
//       });
//     }
//   };

//   const handleTouchEnd = () => {
//     touchStartRef.current = null;
//     touchMoveRef.current = null;

//     animationFrameRef.current = requestAnimationFrame(animateMomentum);
//   };

//   const animateMomentum = () => {
//     if (momentumRef.current !== 0) {
//       setSelectedIndex((prevIndex) => {
//         const newIndex = prevIndex + momentumRef.current;
//         const maxIndex = options.length - 1;
//         const minIndex = 0;

//         if (newIndex > maxIndex) {
//           momentumRef.current *= 0.8;
//           return maxIndex;
//         } else if (newIndex < minIndex) {
//           momentumRef.current *= 0.8;
//           return minIndex;
//         } else {
//           momentumRef.current *= 0.98;
//           return Math.round(newIndex);
//         }
//       });

//       if (Math.abs(momentumRef.current) > 0.1) {
//         animationFrameRef.current = requestAnimationFrame(animateMomentum);
//       } else {
//         momentumRef.current = 0;
//       }
//     }
//   };

//   return (
//     <div
//       className="spinnable-picker"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       {options.map((option, index) => (
//         <div
//           key={index}
//           className={`picker-option ${
//             index === selectedIndex ? "selected" : ""
//           }`}
//         >
//           {option}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SpinnablePicker;
