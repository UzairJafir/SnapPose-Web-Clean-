import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Real Screens Imports
import CameraScreen from "../screens/CameraScreen";
import HomeScreen from "../screens/HomeScreen";
import PoseGalleryScreen from "../screens/PoseGalleryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigation (Dashboard, Poses Gallery, Profile)
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#13101C",
          borderTopColor: "rgba(217,70,239,0.18)",
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
          position: "absolute",
        },
        tabBarActiveTintColor: "#D946EF",
        tabBarInactiveTintColor: "#7A7488",
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Dashboard")
            iconName = focused ? "grid" : "grid-outline";
          else if (route.name === "Gallery")
            iconName = focused ? "images" : "images-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{ tabBarLabel: "Dashboard" }}
      />
      <Tab.Screen
        name="Gallery"
        component={PoseGalleryScreen}
        options={{ tabBarLabel: "Poses" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigation Setup
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="PoseGallery" component={PoseGalleryScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
