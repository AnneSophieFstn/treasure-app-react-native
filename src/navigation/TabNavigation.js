import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListCategories from "../screens/Categories/ListCategories";
import Connexion from "../screens/Auth/Connexion";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Liste categories"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="Liste categories"
        component={ListCategories}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Connexion}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}
