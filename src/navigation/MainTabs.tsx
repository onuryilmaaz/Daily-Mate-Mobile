import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DashboardScreen from "../screens/DashboardScreen";
import Statistics from "../components/dashboard/Statistics";
import WorkplaceList from "../components/dashboard/WorkplaceList";
import ProfileScreen from "../screens/ProfileScreen";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#e5e7eb",
          height: 70,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "home-outline";
          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          if (route.name === "Stats")
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          if (route.name === "Workplaces")
            iconName = focused ? "business" : "business-outline";
          if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{ title: "Ana Sayfa" }}
      />
      <Tab.Screen
        name="Stats"
        component={Statistics}
        options={{ title: "İstatistikler" }}
      />
      <Tab.Screen
        name="Workplaces"
        component={WorkplaceList}
        options={{ title: "İş Yerleri" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
