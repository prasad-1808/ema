export function FloralDecoration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 50 Q50 30, 100 50"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
        fill="none"
      />
      <path
        d="M30 45 Q40 35, 50 40"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.25"
        fill="none"
      />
      <path
        d="M50 42 Q60 30, 70 38"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.25"
        fill="none"
      />
      <ellipse cx="35" cy="38" rx="8" ry="4" fill="currentColor" fillOpacity="0.1" transform="rotate(-30 35 38)" />
      <ellipse cx="55" cy="32" rx="7" ry="3.5" fill="currentColor" fillOpacity="0.1" transform="rotate(-20 55 32)" />
      <ellipse cx="75" cy="35" rx="6" ry="3" fill="currentColor" fillOpacity="0.1" transform="rotate(-15 75 35)" />
      <path
        d="M180 50 Q150 30, 100 50"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
        fill="none"
      />
      <path
        d="M170 45 Q160 35, 150 40"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.25"
        fill="none"
      />
      <path
        d="M150 42 Q140 30, 130 38"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.25"
        fill="none"
      />
      <ellipse cx="165" cy="38" rx="8" ry="4" fill="currentColor" fillOpacity="0.1" transform="rotate(30 165 38)" />
      <ellipse cx="145" cy="32" rx="7" ry="3.5" fill="currentColor" fillOpacity="0.1" transform="rotate(20 145 32)" />
      <ellipse cx="125" cy="35" rx="6" ry="3" fill="currentColor" fillOpacity="0.1" transform="rotate(15 125 35)" />
      <circle cx="100" cy="50" r="3" fill="currentColor" fillOpacity="0.15" />
      <circle cx="90" cy="48" r="2" fill="currentColor" fillOpacity="0.12" />
      <circle cx="110" cy="48" r="2" fill="currentColor" fillOpacity="0.12" />
    </svg>
  );
}

export function FloralCorner({ className, position }: { className?: string; position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const rotations = {
    "top-left": "rotate(0)",
    "top-right": "rotate(90)",
    "bottom-right": "rotate(180)",
    "bottom-left": "rotate(270)",
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: rotations[position] }}
    >
      <path
        d="M0 0 Q30 10, 50 50 Q10 30, 0 0"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.2"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M0 20 Q20 25, 35 45"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeOpacity="0.15"
        fill="none"
      />
      <ellipse cx="15" cy="15" rx="6" ry="3" fill="currentColor" fillOpacity="0.1" transform="rotate(-45 15 15)" />
      <ellipse cx="25" cy="30" rx="5" ry="2.5" fill="currentColor" fillOpacity="0.08" transform="rotate(-30 25 30)" />
      <circle cx="10" cy="10" r="2" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}
