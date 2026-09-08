import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

const COLORS = {
  background: "#0B0B12",
  primary: "#6C5CE7",
};

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <AppNavigator />
    </>
  );
}
