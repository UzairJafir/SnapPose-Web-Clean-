import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
  const [gridOverlay, setGridOverlay] = useState(true);
  const [shutterSound, setShutterSound] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0812" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Studio Settings</Text>
            <Text style={styles.headerSubtitle}>
              Manage camera and overlay preferences
            </Text>
          </View>
          <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.8}>
            <Ionicons name="options-outline" size={18} color="#D946EF" />
          </TouchableOpacity>
        </View>

        {/* Professional Brand Profile Card */}
        <View style={styles.brandCard}>
          <View style={styles.avatarGlow}>
            <LinearGradient
              colors={["#D946EF", "#6C5CE7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarGradient}
            >
              <Ionicons name="camera" size={32} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <Text style={styles.brandName}>SnapPose AI</Text>
          <Text style={styles.brandTag}>Next-Gen Pose Assistant</Text>

          <View style={styles.proBadge}>
            <Ionicons name="sparkles" size={12} color="#D946EF" />
            <Text style={styles.proBadgeText}>PRO EDITION</Text>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Active Poses</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>HD</Text>
            <Text style={styles.statLabel}>Overlay Quality</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>v1.0</Text>
            <Text style={styles.statLabel}>App Version</Text>
          </View>
        </View>

        {/* Preferences Toggles Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Camera Controls</Text>

          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconWrap}>
                <Ionicons name="grid-outline" size={16} color="#D946EF" />
              </View>
              <Text style={styles.menuItemText}>Composition Grid</Text>
            </View>
            <Switch
              value={gridOverlay}
              onValueChange={setGridOverlay}
              trackColor={{ false: "#241C33", true: "#D946EF" }}
              thumbColor={gridOverlay ? "#FFFFFF" : "#7A7488"}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconWrap}>
                <Ionicons
                  name="volume-high-outline"
                  size={16}
                  color="#D946EF"
                />
              </View>
              <Text style={styles.menuItemText}>Shutter Sound</Text>
            </View>
            <Switch
              value={shutterSound}
              onValueChange={setShutterSound}
              trackColor={{ false: "#241C33", true: "#D946EF" }}
              thumbColor={shutterSound ? "#FFFFFF" : "#7A7488"}
            />
          </View>
        </View>

        {/* Support & Preferences List */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferences & Info</Text>

          <TouchableOpacity style={styles.menuItemBtn} activeOpacity={0.8}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconWrap}>
                <Ionicons
                  name="color-palette-outline"
                  size={16}
                  color="#D946EF"
                />
              </View>
              <Text style={styles.menuItemText}>Overlay Custom Color</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#7A7488" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItemBtn} activeOpacity={0.8}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconWrap}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={16}
                  color="#D946EF"
                />
              </View>
              <Text style={styles.menuItemText}>
                Privacy & Camera Permission
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#7A7488" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0812",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 90,
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#7A7488",
    fontSize: 12,
    marginTop: 2,
  },
  settingsBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(217,70,239,0.1)",
    borderWidth: 1,
    borderColor: "rgba(217,70,239,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  brandCard: {
    alignItems: "center",
    backgroundColor: "#13101C",
    borderWidth: 1,
    borderColor: "rgba(217,70,239,0.18)",
    borderRadius: 20,
    paddingVertical: 20,
    marginBottom: 16,
  },
  avatarGlow: {
    padding: 3,
    borderRadius: 36,
    backgroundColor: "rgba(217, 70, 239, 0.18)",
    marginBottom: 10,
  },
  avatarGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  brandTag: {
    color: "#7A7488",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10,
  },
  proBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(217,70,239,0.12)",
    borderWidth: 1,
    borderColor: "rgba(217,70,239,0.3)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  proBadgeText: {
    color: "#D946EF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#13101C",
    borderWidth: 1,
    borderColor: "rgba(217,70,239,0.18)",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  statLabel: {
    color: "#7A7488",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 22,
    backgroundColor: "#241C33",
  },
  sectionContainer: {
    backgroundColor: "#13101C",
    borderWidth: 1,
    borderColor: "rgba(217,70,239,0.18)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  menuItemBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "rgba(217,70,239,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  menuItemText: {
    color: "#D0C9DF",
    fontSize: 13,
    fontWeight: "600",
  },
});
