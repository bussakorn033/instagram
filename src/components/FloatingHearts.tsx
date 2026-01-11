import React from "react";
import {Box} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {keyframes} from "@mui/system";

interface FloatingHeartsProps {
  isActive: boolean;
  count?: number;
  duration?: number;
}

const heartAnimation = keyframes`
  0% {
    transform:
      translate(-50%, -50%)
      translate(0, 0)
      scale(0.4);
    opacity: 0;
    filter: blur(6px);
  }

  12% {
    opacity: 1;
    filter: blur(0);
  }

  40% {
    transform:
      translate(-50%, -50%)
      translate(calc(var(--x) * 0.6), calc(var(--y) * 0.6))
      scale(calc(var(--scale) * 1.05));
    opacity: 0.9;
  }

  70% {
    transform:
      translate(-50%, -50%)
      translate(calc(var(--x) * 0.9), calc(var(--y) * 0.9))
      scale(var(--scale));
    opacity: 0.5;
  }

  100% {
    transform:
      translate(-50%, -50%)
      translate(var(--x), var(--y))
      scale(calc(var(--scale) * 0.85));
    opacity: 0;
    filter: blur(8px);
  }
`;

const generateHearts = (count: number) =>
  Array.from({length: count}).map((_, i) => {
    const angle = (Math.PI * 2 * i) / count;
    const radius = Math.random() * 120 + 40;

    return {
      x: `${Math.cos(angle) * radius}px`,
      y: `${Math.sin(angle) * radius - 40}px`,
      scale: Math.random() * 0.4 + 0.6,
      delay: `${Math.random() * 0.2}s`,
      opacity: Math.random() * 0.4 + 0.6,
    };
  });

const FloatingHearts: React.FC<FloatingHeartsProps> = ({
  isActive,
  count = 5,
  duration = 2.5,
}) => {
  if (!isActive) return null;

  const hearts = generateHearts(count);

  return (
    <>
      {hearts.map((heart, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            pointerEvents: "none",
            animation: `${heartAnimation} ${duration}s cubic-bezier(.22,1,.36,1) forwards`,
            animationDelay: heart.delay,
            "--x": heart.x,
            "--y": heart.y,
            "--scale": heart.scale,
            zoom: 1.8,
            "@media (max-width: 1023px)": {
              zoom: 1.25,
            },
          }}
        >
          <FavoriteIcon
            sx={{
              fontSize: "3.2rem",
              color: "rgba(255,255,255,0.9)",
              opacity: heart.opacity,
              filter: `drop-shadow(0 3px 6px rgba(253, 95, 174, 0.45)) drop-shadow(0 6px 14px rgba(167, 140, 254, 0.35))`,
            }}
          />
        </Box>
      ))}
    </>
  );
};

export default FloatingHearts;
