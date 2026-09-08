import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PoseLogo from "../components/PoseLogo";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const contentTranslate = useRef(new Animated.Value(16)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslate, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Layered ambient glow */}
      <View style={styles.glowOuter} pointerEvents="none" />
      <View style={styles.glowInner} pointerEvents="none" />

      {/* Faint grid texture feel via subtle circles */}
      <View style={styles.dot1} pointerEvents="none" />
      <View style={styles.dot2} pointerEvents="none" />

      <SafeAreaView style={styles.safeArea}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoWrap,
            { opacity: fadeAnim, transform: [{ scale: logoScale }] },
          ]}
        >
          <View style={styles.glowRing}>
            <LinearGradient
              colors={["rgba(168,85,247,0.4)", "rgba(168,85,247,0)"]}
              style={styles.glowRingInner}
            />
          </View>
          <View style={styles.iconBadge}>
            <PoseLogo size={54} color="#D8B4FE" />
          </View>
        </Animated.View>

        {/* Title + subtitle */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: contentTranslate }],
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Pose Camera</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.subtitle}>
            Capture Your Best Angle.{"\n"}Effortlessly.
          </Text>
        </Animated.View>

        {/* Decorative abstract shapes */}
        <View style={styles.shapeWrap} pointerEvents="none">
          <View style={styles.ringLarge} />
          <View style={styles.ringSmall} />
          <View style={styles.shapeSquare} />
          <View style={styles.shapeCircle} />
          <View style={styles.shapeSquareSmall} />
        </View>

        {/* CTA */}
        <Animated.View
          style={[
            styles.ctaWrap,
            {
              opacity: buttonAnim,
              transform: [
                {
                  translateY: buttonAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.replace("Home")}
          >
            <LinearGradient
              colors={["#A855F7", "#7C3AED"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaText}>Get Started</Text>
              <Ionicons
                name="arrow-forward"
                size={16}
                color="#FFFFFF"
                style={{ marginLeft: 8 }}
              />
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footnote}>
            AI-powered pose guidance, on the go
          </Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08060D",
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 70,
    paddingBottom: 36,
  },
  glowOuter: {
    position: "absolute",
    top: -height * 0.15,
    width: width * 1.6,
    height: width * 1.6,
    borderRadius: (width * 1.6) / 2,
    backgroundColor: "rgba(124,58,237,0.06)",
    alignSelf: "center",
  },
  glowInner: {
    position: "absolute",
    top: -height * 0.05,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: "rgba(168,85,247,0.05)",
    alignSelf: "center",
  },
  dot1: {
    position: "absolute",
    top: 90,
    left: 30,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(216,180,254,0.4)",
  },
  dot2: {
    position: "absolute",
    top: 140,
    right: 40,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(216,180,254,0.3)",
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  glowRing: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  glowRingInner: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  iconBadge: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: "rgba(168,85,247,0.07)",
    borderWidth: 1,
    borderColor: "rgba(216,180,254,0.3)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#A855F7",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 24,
    elevation: 14,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: 0.4,
    marginTop: 26,
  },
  titleUnderline: {
    width: 36,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#A855F7",
    marginTop: 10,
    marginBottom: 12,
  },
  subtitle: {
    color: "#9B95A8",
    fontSize: 13.5,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  shapeWrap: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ringLarge: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.12)",
  },
  ringSmall: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.1)",
  },
  shapeSquare: {
    position: "absolute",
    width: 66,
    height: 66,
    borderRadius: 18,
    backgroundColor: "rgba(139,92,246,0.22)",
    transform: [{ rotate: "18deg" }],
    top: "46%",
    left: "30%",
  },
  shapeCircle: {
    position: "absolute",
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(192,132,252,0.28)",
    top: "56%",
    right: "26%",
  },
  shapeSquareSmall: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: "rgba(124,58,237,0.32)",
    transform: [{ rotate: "45deg" }],
    bottom: "28%",
    left: "38%",
  },
  ctaWrap: {
    width: "85%",
    alignItems: "center",
  },
  ctaButton: {
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#A855F7",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 12,
  },
  ctaText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  footnote: {
    color: "#5C5568",
    fontSize: 11,
    marginTop: 14,
    letterSpacing: 0.2,
  },
});
