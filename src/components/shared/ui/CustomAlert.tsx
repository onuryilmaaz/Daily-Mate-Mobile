import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type AlertButtonVariant = "primary" | "secondary" | "danger" | "cancel";

interface AlertButton {
  text: string;
  onPress: () => void | Promise<void>;
  variant?: AlertButtonVariant;
}

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  buttons: AlertButton[];
  onClose: () => void;
}

const CustomAlert = ({
  visible,
  title,
  message,
  buttons,
  onClose,
}: CustomAlertProps) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getButtonVariantClasses = (variant: string = "primary") => {
    switch (variant) {
      case "primary":
        return "bg-blue-600";
      case "secondary":
        return "bg-gray-500";
      case "danger":
        return "bg-red-600";
      case "cancel":
        return "bg-gray-200";
      default:
        return "bg-blue-600";
    }
  };

  const getButtonTextColor = (variant: string = "primary") => {
    switch (variant) {
      case "cancel":
        return "text-gray-700";
      default:
        return "text-white";
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        className="flex-1 bg-black/50 justify-center items-center p-4"
        style={{ opacity: fadeAnim }}
      >
        <Animated.View
          className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
          style={{ transform: [{ scale: scaleAnim }] }}
        >
          {/* Header */}
          <View className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 relative overflow-hidden">
            {/* Decorative elements */}
            <View className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
            <View className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/10 rounded-full" />

            <View className="flex-row items-center justify-between relative z-10">
              <View className="flex-1">
                <Text className="text-white text-lg font-bold">{title}</Text>
                <Text className="text-black text-sm mt-1">{message}</Text>
              </View>
              <TouchableOpacity
                onPress={onClose}
                className="w-8 h-8 rounded-full bg-white/20 items-center justify-center"
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Content */}
          <View className="px-6 py-4">
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="max-h-48"
            >
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    button.onPress();
                    onClose();
                  }}
                  className={`rounded-xl py-4 px-6 mb-3 items-center justify-center shadow-sm ${getButtonVariantClasses(button.variant)}`}
                  activeOpacity={0.8}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Text
                    className={`font-semibold text-base ${getButtonTextColor(button.variant)}`}
                  >
                    {button.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default CustomAlert;
