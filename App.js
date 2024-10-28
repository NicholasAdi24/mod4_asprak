import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"; // Import Stack Navigator
import { Octicons } from "@expo/vector-icons";
import HomeScreen from "./pages/HomeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import AnimeScreen from "./pages/AnimeScreen";
import LoginScreen from "./pages/LoginScreen";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

// Bottom Tab Navigator for Home, Profile, Anime Screens
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "lightgray",
          marginHorizontal: 16,
          borderRadius: 24,
          height: 64,
          marginBottom: 16,
          shadowOpacity: 0,
          elevation: 1,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Anime") {
            iconName = "book";
          }
          return <Octicons name={iconName} size={24} color={focused ? "black" : "lightgray"} />;
        },
        headerShown: false,
      })}
    >
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
      <BottomTab.Screen name="Anime" component={AnimeScreen} />
    </BottomTab.Navigator>
  );
}

// Stack Navigator for handling Login and BottomTabNavigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* First screen is Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        {/* Once logged in, navigate to BottomTabNavigator */}
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
