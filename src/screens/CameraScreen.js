import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StandingPose } from "../components/PoseStickFigure";

export default function CameraScreen({ route, navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");

  // Home Screen se select ki hui pose receive karna
  const selectedPose = route.params?.selectedPose;
  const PoseIcon = selectedPose?.Icon || StandingPose;

  if (!permission) {
    return <View style={styles.container} />;
  }

  // Camera permission allow na hone par
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={60} color="#D946EF" />
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} activeOpacity={0.8}>
          <LinearGradient
            colors={["#D946EF", "#6C5CE7"]}
            style={styles.permissionBtn}
          >
            <Text style={styles.permissionBtnText}>Grant Permission</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        {/* Top Header */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.poseTitleText}>
            {selectedPose?.title || "Standing"} Pose
          </Text>
          <TouchableOpacity style={styles.iconBtn} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Center Live Stick Figure Overlay Guide */}
        <View style={styles.overlayContainer} pointerEvents="none">
          <PoseIcon size={280} color="rgba(217, 70, 239, 0.75)" />
        </View>

        {/* Bottom Shutter Capture Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => alert("Photo Captured!")}
          >
            <View style={styles.captureOuterBtn}>
              <LinearGradient
                colors={["#D946EF", "#6C5CE7"]}
                style={styles.captureInnerBtn}
              />
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#0A0812",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  permissionBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  permissionBtnText: {
    color: "#FFF",
    fontWeight: "700",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  poseTitleText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    paddingBottom: 40,
    alignItems: "center",
  },
  captureOuterBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: "#FFF",
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  captureInnerBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
