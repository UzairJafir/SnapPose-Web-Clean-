import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const { width } = Dimensions.get("window");
const FRAME_W = width * 0.72;
const FRAME_H = FRAME_W * 1.55;

// Stylized pose-outline path (two jumping figures, simplified skeleton silhouette)
const OUTLINE_PATH = `
  M70,60 C90,60 100,75 98,95 C96,112 82,120 70,138
  C60,150 40,158 28,180 C18,198 22,220 35,235
  C48,248 60,232 65,215 C70,198 78,205 85,222
  C92,238 78,255 60,258
  M150,40 C168,38 180,52 178,72 C176,90 162,98 152,115
  C165,128 185,132 198,150 C210,168 205,192 188,205
  C172,217 158,200 155,182 C152,166 142,175 148,195
  C154,214 138,228 120,222
`;

const PATH_LENGTH = 900; // approx length for dash animation

export default function PoseCameraShowcase({ photoUri }) {
  const drawAnim = useRef(new Animated.Value(0)).current;
  const sparkle1 = useRef(new Animated.Value(0)).current;
  const sparkle2 = useRef(new Animated.Value(0)).current;
  const sparkle3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Outline draw-and-reset loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(drawAnim, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: false,
        }),
        Animated.delay(900),
        Animated.timing(drawAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.delay(300),
      ]),
    ).start();

    // Sparkle twinkle loops (staggered so they don't sync)
    const twinkle = (val, delay, duration) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(val, { toValue: 1, duration, useNativeDriver: true }),
          Animated.timing(val, { toValue: 0, duration, useNativeDriver: true }),
        ]),
      ).start();

    twinkle(sparkle1, 0, 900);
    twinkle(sparkle2, 400, 1000);
    twinkle(sparkle3, 800, 850);
  }, []);

  const dashOffset = drawAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [PATH_LENGTH, 0],
  });

  return (
    <View style={styles.frameWrap}>
      {/* Sparkles */}
      <Animated.View
        style={[styles.sparkle, { top: 10, left: -8, opacity: sparkle1 }]}
      >
        <Ionicons name="sparkles" size={18} color="#FBBF24" />
      </Animated.View>
      <Animated.View
        style={[styles.sparkle, { bottom: 70, right: -12, opacity: sparkle2 }]}
      >
        <Ionicons name="sparkles" size={14} color="#FDE68A" />
      </Animated.View>
      <Animated.View
        style={[styles.sparkle, { top: 90, right: -6, opacity: sparkle3 }]}
      >
        <Ionicons name="sparkles" size={10} color="#FEF3C7" />
      </Animated.View>

      {/* Phone-style frame */}
      <View style={styles.phoneFrame}>
        <Image
          source={
            photoUri
              ? { uri: photoUri }
              : {
                  uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
                }
          }
          style={styles.photo}
          resizeMode="cover"
        />

        {/* Darken edges for contrast */}
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "transparent", "rgba(0,0,0,0.5)"]}
          style={StyleSheet.absoluteFill}
        />

        {/* Glowing animated pose outline */}
        <View style={StyleSheet.absoluteFill}>
          <Svg width="100%" height="100%" viewBox="0 0 220 280">
            <AnimatedPath
              d={OUTLINE_PATH}
              stroke="#FBBF24"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={PATH_LENGTH}
              strokeDashoffset={dashOffset}
              opacity={0.95}
            />
          </Svg>
        </View>

        {/* Top camera controls */}
        <View style={styles.topControls}>
          <Ionicons name="flash-off-outline" size={16} color="#fff" />
          <Ionicons name="timer-outline" size={16} color="#fff" />
          <Ionicons name="grid-outline" size={16} color="#fff" />
        </View>

        {/* Bottom camera controls */}
        <View style={styles.bottomControls}>
          <View style={styles.zoomPill}>
            <Animated.Text style={styles.zoomText}>1x</Animated.Text>
            <Animated.Text style={[styles.zoomText, { opacity: 0.5 }]}>
              2
            </Animated.Text>
          </View>
          <View style={styles.shutterOuter}>
            <View style={styles.shutterInner} />
          </View>
          <View style={{ width: 24 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frameWrap: {
    width: FRAME_W,
    height: FRAME_H,
    alignItems: "center",
    justifyContent: "center",
  },
  sparkle: {
    position: "absolute",
    zIndex: 5,
  },
  phoneFrame: {
    width: FRAME_W,
    height: FRAME_H,
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: "#111",
    borderWidth: 6,
    borderColor: "#1A1A1A",
    shadowColor: "#FBBF24",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 10,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  topControls: {
    position: "absolute",
    top: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  bottomControls: {
    position: "absolute",
    bottom: 18,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  zoomPill: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 6,
  },
  zoomText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  shutterOuter: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 3,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
  },
});
