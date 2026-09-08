import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    CreativePose,
    HeadshotPose,
    SeatedPose,
    SideProfilePose,
    StandingPose,
} from "../components/PoseStickFigure";

const { width } = Dimensions.get("window");
const CARD_GAP = 12;
const CARD_WIDTH = (width - 20 * 2 - CARD_GAP) / 2;

const CATEGORIES = [
  { label: "All", icon: "apps-outline" },
  { label: "Standing", icon: "body-outline" },
  { label: "Seated", icon: "accessibility-outline" },
  { label: "Portrait", icon: "person-circle-outline" },
  { label: "Creative", icon: "sparkles-outline" },
];

const ALL_POSES = [
  {
    id: "1",
    title: "Confident Stand",
    category: "Standing",
    Icon: StandingPose,
  },
  { id: "2", title: "Casual Lean", category: "Standing", Icon: StandingPose },
  { id: "3", title: "Relaxed Sit", category: "Seated", Icon: SeatedPose },
  { id: "4", title: "Cafe Chair", category: "Seated", Icon: SeatedPose },
  { id: "5", title: "Side Angle", category: "Portrait", Icon: SideProfilePose },
  {
    id: "6",
    title: "Close Headshot",
    category: "Portrait",
    Icon: HeadshotPose,
  },
  { id: "7", title: "Dynamic Jump", category: "Creative", Icon: CreativePose },
  { id: "8", title: "Action Pose", category: "Creative", Icon: CreativePose },
];

function PoseCard({ item, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  const pressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], width: CARD_WIDTH }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={onPress}
        style={styles.card}
      >
        {/* SVG Stick figure container */}
        <View style={styles.cardIconWrap}>
          <View style={styles.iconGlowRing} />
          <item.Icon size={40} color="#E879F9" />
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>

          <View style={styles.categoryBadge}>
            <View style={styles.categoryDot} />
            <Text style={styles.cardCategory}>{item.category}</Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
            <LinearGradient
              colors={["#D946EF", "#6C5CE7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.useButton}
            >
              <Ionicons name="camera" size={12} color="#fff" />
              <Text style={styles.useButtonText}>Use Pose</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function PoseGalleryScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPoses = useMemo(() => {
    if (activeCategory === "All") return ALL_POSES;
    return ALL_POSES.filter((pose) => pose.category === activeCategory);
  }, [activeCategory]);

  const goToCamera = (item) =>
    navigation.navigate("Camera", { selectedPose: item });

  const renderCategoryChip = ({ item }) => {
    const active = item.label === activeCategory;
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setActiveCategory(item.label)}
      >
        {active ? (
          <LinearGradient
            colors={["#D946EF", "#6C5CE7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.chipActive}
          >
            <Ionicons
              name={item.icon}
              size={13}
              color="#fff"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.chipTextActive}>{item.label}</Text>
          </LinearGradient>
        ) : (
          <View style={styles.chip}>
            <Ionicons
              name={item.icon}
              size={13}
              color="#8E8898"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.chipText}>{item.label}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0812" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Pose Gallery</Text>
          <Text style={styles.subtitle}>
            Choose a guide overlay for your photo
          </Text>
        </View>
        <View style={styles.headerIconBadge}>
          <Ionicons name="grid-outline" size={18} color="#D946EF" />
        </View>
      </View>

      {/* Category Horizontal Filter List */}
      <View style={{ height: 46, marginBottom: 12 }}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategoryChip}
          keyExtractor={(item) => item.label}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        />
      </View>

      {/* Pose Grid List */}
      <FlatList
        data={filteredPoses}
        renderItem={({ item }) => (
          <PoseCard item={item} onPress={() => goToCamera(item)} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
    paddingTop: 10,
    paddingBottom: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },
  subtitle: {
    color: "#9B95A8",
    fontSize: 12,
    marginTop: 2,
  },
  headerIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(217,70,239,0.1)",
    borderWidth: 1,
    borderColor: "rgba(217,70,239,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  chipRow: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#15111F",
    borderWidth: 1,
    borderColor: "#241C33",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  chipActive: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  chipText: {
    color: "#8E8898",
    fontSize: 12,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  gridContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: CARD_GAP,
  },
  card: {
    backgroundColor: "#13101C",
    borderWidth: 1,
    borderColor: "rgba(217,70,239,0.18)",
    borderRadius: 16,
    padding: 12,
  },
  cardIconWrap: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  iconGlowRing: {
    position: "absolute",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(217,70,239,0.12)",
  },
  cardBody: {
    paddingTop: 2,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D946EF",
    marginRight: 5,
  },
  cardCategory: {
    color: "#7A7488",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  useButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  useButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
