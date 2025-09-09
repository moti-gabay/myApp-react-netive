import AuthGate from "@/components/AuthGate";
import { FontAwesome, Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
export type RootStackParamList = {
  AuthGate: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

export default function TabsLayout() {
  return (
    <Tabs>

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <AuthGate>

        {/* Tasks Tab עם Stack פנימי */}
        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="checklist" size={size} color={color} />
            ),
          }}
        >
          {/* {() => (
          <Stack>
          <Stack.Screen name="index" options={{ title: "Tasks List" }} />
          <Stack.Screen name="addTask" options={{ title: "Add Task" }} />
          <Stack.Screen name="[taskId]" options={{ title: "Edit Task" }} />
          </Stack>
          )} */}
        </Tabs.Screen>

        {/* Profile Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user-circle" size={size} color={color} />
            ),
          }}
        />

      </AuthGate>
      {/* Login Tab */}
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="login" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Register"
        options={{
          title: "Register",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
