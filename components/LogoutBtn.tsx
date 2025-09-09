import React from "react";
import { useAppDispatch } from "../src/store/hooks";
import { logoutUser } from "../src/store/slices/authSlice";
import { Button } from "react-native";
export const LogoutButton = () => {
  const dispatch = useAppDispatch();

  return <Button title="Logout" onPress={() => dispatch(logoutUser())} />;
};
