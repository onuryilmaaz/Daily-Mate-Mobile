import React, { useEffect } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast = ({
  message,
  type,
  visible,
  onClose,
  duration = 3000,
}: ToastProps) => {
  const translateY = new Animated.Value(-100);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-emerald-500",
          icon: "checkmark-circle",
          iconColor: "#10b981",
        };
      case "error":
        return {
          bg: "bg-red-500",
          icon: "close-circle",
          iconColor: "#ef4444",
        };
      case "warning":
        return {
          bg: "bg-amber-500",
          icon: "warning",
          iconColor: "#f59e0b",
        };
      default:
        return {
          bg: "bg-blue-500",
          icon: "information-circle",
          iconColor: "#3b82f6",
        };
    }
  };

  const styles = getTypeStyles();

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
      }}
      className={`absolute top-16 left-4 right-4 z-50 ${styles.bg} rounded-xl shadow-lg`}
    >
      <View className="flex-row items-center p-4">
        <Ionicons name={styles.icon as any} size={24} color="white" />
        <Text className="flex-1 text-white font-medium ml-3 text-base">
          {message}
        </Text>
        <TouchableOpacity onPress={hideToast} className="ml-2">
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Toast;
