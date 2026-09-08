import Svg, {
    Circle,
    Defs,
    Line,
    Path,
    RadialGradient,
    Stop,
} from "react-native-svg";

export default function PoseLogo({ size = 60, color = "#C084FC" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 140">
      <Defs>
        <RadialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <Stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </RadialGradient>
      </Defs>

      {/* Person silhouette */}
      <Path
        d="M60,10 C69,10 76,17 76,26 C76,35 69,42 60,42 C51,42 44,35 44,26 C44,17 51,10 60,10 Z
           M18,124 C18,80 36,60 60,60 C84,60 102,80 102,124"
        stroke={color}
        strokeWidth={4.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Aperture */}
      <Circle
        cx="60"
        cy="94"
        r="19"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
      />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <Line
          key={deg}
          x1="60"
          y1="94"
          x2="60"
          y2="79"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          transform={`rotate(${deg} 60 94)`}
        />
      ))}
      <Circle cx="60" cy="94" r="5" fill="url(#lensGlow)" />
    </Svg>
  );
}
