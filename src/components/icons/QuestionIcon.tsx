export function QuestionIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d="M3.5 4C3.5 2.62 4.62 1.5 6 1.5C7.38 1.5 8.5 2.62 8.5 4C8.5 4.82 8.105 5.545 7.5 6C7.08 6.315 6 7 6 8.5"
        stroke="#FEFEFE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10.5V10.505"
        stroke="#FEFEFE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
