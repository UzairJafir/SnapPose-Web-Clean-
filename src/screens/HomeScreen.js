import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    HeadshotPose,
    SeatedPose,
    SideProfilePose,
    StandingPose,
} from "../components/PoseStickFigure";

const { width } = Dimensions.get("window");

const SCENE_FILTERS = ["Indoor", "Street", "Cafe", "Outdoor Park"];

const POSE_LIST = [
  {
    id: "1",
    title: "Standing",
    desc: "Confident upright stance",
    Icon: StandingPose,
  },
  {
    id: "2",
    title: "Seated",
    desc: "Relaxed sitting posture",
    Icon: SeatedPose,
  },
  {
    id: "3",
    title: "Side Profile",
    desc: "Angled silhouette look",
    Icon: SideProfilePose,
  },
  {
    id: "4",
    title: "Headshot",
    desc: "Close-up framing guide",
    Icon: HeadshotPose,
  },
];

export default function HomeScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState("Indoor");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            SnapPose<Text style={styles.logoAccent}>AI</Text>
          </Text>
          <View style={styles.scanIconWrap}>
            <LinearGradient
              colors={["#D946EF", "#6C5CE7"]}
              style={styles.scanIconGlow}
            >
              <Ionicons name="scan-outline" size={18} color="#fff" />
            </LinearGradient>
          </View>
        </View>

        {/* Hero Banner - gradient border trick */}
        <View style={styles.heroBorderWrap}>
          <LinearGradient
            colors={["#D946EF", "#6C5CE7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroBorder}
          >
            <View style={styles.heroInner}>
              <View style={styles.heroIconBadge}>
                <Ionicons name="camera-outline" size={26} color="#D946EF" />
              </View>
              <Text style={styles.heroTitle}>
                Live Camera{"\n"}Overlay Guide
              </Text>
              <Text style={styles.heroSubtitle}>
                Point, align, and trace your{"\n"}perfect pose in real time
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate("Camera")}
              >
                <LinearGradient
                  colors={["#D946EF", "#6C5CE7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.heroCta}
                >
                  <Text style={styles.heroCtaText}>Select Pose Outline</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={14}
                    color="#fff"
                    style={{ marginLeft: 6 }}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Scene filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {SCENE_FILTERS.map((filter) => {
            const active = filter === activeFilter;
            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                activeOpacity={0.85}
              >
                {active ? (
                  <LinearGradient
                    colors={["#D946EF", "#6C5CE7"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.filterPillActive}
                  >
                    <Text style={styles.filterTextActive}>{filter}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.filterPill}>
                    <Text style={styles.filterText}>{filter}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Pose list - glassmorphism cards */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pose Library</Text>
          <TouchableOpacity onPress={() => navigation.navigate("PoseGallery")}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {POSE_LIST.map((pose) => (
          <TouchableOpacity
            key={pose.id}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("Camera", { selectedPose: pose })
            }
          >
            <BlurView intensity={40} tint="dark" style={styles.poseCard}>
              <View style={styles.poseIconWrap}>
                <pose.Icon size={36} color="#D946EF" />
              </View>
              <View style={styles.poseInfo}>
                <Text style={styles.poseTitle}>{pose.title}</Text>
                <Text style={styles.poseDesc}>{pose.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#6C5CE7" />
            </BlurView>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0812",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  logoAccent: {
    color: "#D946EF",
  },
  scanIconWrap: {
    shadowColor: "#D946EF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  scanIconGlow: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  heroBorderWrap: {
    marginHorizontal: 20,
    borderRadius: 26,
    shadowColor: "#D946EF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  heroBorder: {
    borderRadius: 26,
    padding: 1.5,
  },
  heroInner: {
    backgroundColor: "#120E1C",
    borderRadius: 24.5,
    padding: 22,
    alignItems: "flex-start",
  },
  heroIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(217,70,239,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: "#9B95A8",
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: 18,
  },
  heroCta: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: "center",
  },
  heroCtaText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  filterRow: {
    paddingHorizontal: 20,
    marginTop: 26,
  },
  filterPill: {
    backgroundColor: "#15111F",
    borderWidth: 1,
    borderColor: "#241C33",
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 18,
    marginRight: 10,
  },
  filterPillActive: {
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 18,
    marginRight: 10,
  },
  filterText: {
    color: "#9B95A8",
    fontSize: 12.5,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
    fontSize: 12.5,
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  seeAll: {
    color: "#D946EF",
    fontSize: 13,
    fontWeight: "600",
  },
  poseCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(217,70,239,0.15)",
    overflow: "hidden",
    backgroundColor: "rgba(21, 17, 31, 0.75)",
  },
  poseIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(217,70,239,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  poseInfo: {
    flex: 1,
  },
  poseTitle: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
  },
  poseDesc: {
    color: "#8E8898",
    fontSize: 12,
    marginTop: 3,
  },
});
