import { FontAwesome, Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} /> // 🏠
        ),
      }}
      />

      <Tabs.Screen name="tasks" options={{
        title: "Tasks",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="checklist" size={size} color={color} /> // 📋
        ),
      }}
      />

      <Tabs.Screen name="profile" options={{
        title: "Profile",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user-circle" size={size} color={color} /> // 👤
        ),
      }} />
      <Tabs.Screen name="login" options={{
        title: "Login",
        tabBarIcon: ({ color, size }) => (
          <SimpleLineIcons name="login" size={size} color={color}/>
        ),
      }} />
    </Tabs>
  );
}
