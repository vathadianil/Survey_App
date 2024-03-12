import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

const Button = ({
  style,
  mode,
  onPress,
  children,
  icon,
  color,
  size,
  disabled,
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        mode === "flat" && styles.flat,
        disabled && { backgroundColor: Colors.shadowColor },
      ]}
    >
      <Pressable
        onPress={() => {
          if (disabled) return;
          onPress();
        }}
        android_ripple={!disabled && { color: Colors.shadowColor }}
        style={({ pressed }) => !disabled && pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          {icon && (
            <Ionicons
              style={styles.icon}
              name={icon}
              color={color || "#fff"}
              size={size || 16}
            />
          )}
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatText,
              disabled && { color: Colors.gray },
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: Colors.primary800,
    elevation: 3,
    shadowColor: Platform.OS === "ios" && Colors.shadowColor,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  pressed: {
    opacity: 0.25,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { marginRight: 6 },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontFamily: "regular",
  },
  flatText: {
    color: Colors.primary500,
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: Colors.shadowColor,
    borderRadius: 4,
  },
});
