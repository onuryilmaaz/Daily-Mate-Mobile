import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  interpolate,
  withTiming,
} from "react-native-reanimated";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  variant?: "default" | "error" | "success" | "warning";
  size?: "small" | "medium" | "large";
  animated?: boolean;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  variant = "default",
  size = "medium",
  animated = true,
}: EmptyStateProps) => {
  const containerOpacity = useSharedValue(0);
  const containerTranslateY = useSharedValue(30);
  const iconScale = useSharedValue(0);
  const iconRotation = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0);
  const floatingAnimation = useSharedValue(0);

  React.useEffect(() => {
    if (animated) {
      // Staggered entrance animation
      containerOpacity.value = withTiming(1, { duration: 600 });
      containerTranslateY.value = withSpring(0, { damping: 20, stiffness: 90 });

      iconScale.value = withDelay(
        200,
        withSpring(1, { damping: 15, stiffness: 100 })
      );
      iconRotation.value = withDelay(
        200,
        withSpring(360, { damping: 20, stiffness: 80 })
      );

      textOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));

      if (actionText && onAction) {
        buttonScale.value = withDelay(
          600,
          withSpring(1, { damping: 15, stiffness: 100 })
        );
      }

      // Continuous floating animation
      floatingAnimation.value = withDelay(
        800,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 2000 }),
            withTiming(0, { duration: 2000 })
          ),
          -1,
          true
        )
      );
    } else {
      containerOpacity.value = 1;
      containerTranslateY.value = 0;
      iconScale.value = 1;
      iconRotation.value = 0;
      textOpacity.value = 1;
      buttonScale.value = 1;
    }
  }, [animated, actionText, onAction]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ translateY: containerTranslateY.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value },
      { rotate: `${iconRotation.value}deg` },
      { translateY: interpolate(floatingAnimation.value, [0, 1], [0, -8]) },
    ],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const isSmallScreen = screenWidth < 380;
  const isLargeScreen = screenWidth > 768;

  const getSizeConfig = () => {
    const baseConfig = {
      small: {
        iconSize: isSmallScreen ? 36 : 44,
        iconContainer: isSmallScreen ? 80 : 88,
        titleSize: isSmallScreen ? 18 : 20,
        descriptionSize: isSmallScreen ? 14 : 15,
        spacing: isSmallScreen ? 20 : 24,
        containerPadding: isSmallScreen ? 24 : 32,
      },
      medium: {
        iconSize: isSmallScreen ? 44 : isLargeScreen ? 64 : 56,
        iconContainer: isSmallScreen ? 88 : isLargeScreen ? 128 : 112,
        titleSize: isSmallScreen ? 20 : isLargeScreen ? 28 : 24,
        descriptionSize: isSmallScreen ? 15 : isLargeScreen ? 18 : 16,
        spacing: isSmallScreen ? 24 : isLargeScreen ? 32 : 28,
        containerPadding: isSmallScreen ? 32 : isLargeScreen ? 48 : 40,
      },
      large: {
        iconSize: isSmallScreen ? 56 : isLargeScreen ? 80 : 72,
        iconContainer: isSmallScreen ? 112 : isLargeScreen ? 160 : 144,
        titleSize: isSmallScreen ? 24 : isLargeScreen ? 32 : 28,
        descriptionSize: isSmallScreen ? 16 : isLargeScreen ? 20 : 18,
        spacing: isSmallScreen ? 28 : isLargeScreen ? 40 : 32,
        containerPadding: isSmallScreen ? 40 : isLargeScreen ? 56 : 48,
      },
    };
    return baseConfig[size];
  };

  const getVariantConfig = () => {
    const configs = {
      default: {
        iconBg: ["#667eea", "#764ba2"] as const,
        iconColor: "#ffffff",
        titleColor: "#1a202c",
        descriptionColor: "#718096",
        buttonBg: ["#667eea", "#764ba2"] as const,
        buttonText: "#ffffff",
        glowColor: "#667eea",
        backgroundColor: "#f8fafc",
      },
      error: {
        iconBg: ["#ff6b6b", "#ee5a52"] as const,
        iconColor: "#ffffff",
        titleColor: "#c53030",
        descriptionColor: "#e53e3e",
        buttonBg: ["#ff6b6b", "#ee5a52"] as const,
        buttonText: "#ffffff",
        glowColor: "#ff6b6b",
        backgroundColor: "#fef5f5",
      },
      success: {
        iconBg: ["#51cf66", "#40c057"] as const,
        iconColor: "#ffffff",
        titleColor: "#2d3748",
        descriptionColor: "#38a169",
        buttonBg: ["#51cf66", "#40c057"] as const,
        buttonText: "#ffffff",
        glowColor: "#51cf66",
        backgroundColor: "#f0fff4",
      },
      warning: {
        iconBg: ["#ffd43b", "#fab005"] as const,
        iconColor: "#ffffff",
        titleColor: "#b7791f",
        descriptionColor: "#d69e2e",
        buttonBg: ["#ffd43b", "#fab005"] as const,
        buttonText: "#ffffff",
        glowColor: "#ffd43b",
        backgroundColor: "#fffbeb",
      },
    };
    return configs[variant];
  };

  const sizeConfig = getSizeConfig();
  const variantConfig = getVariantConfig();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: variantConfig.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          containerAnimatedStyle,
          {
            alignItems: "center",
            paddingVertical: sizeConfig.containerPadding,
            paddingHorizontal: sizeConfig.containerPadding,
            maxWidth: isLargeScreen ? 500 : "90%",
            backgroundColor: "#ffffff",
            borderRadius: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 20,
            elevation: 15,
          },
        ]}
      >
        {/* Decorative Background Elements */}
        <View
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: variantConfig.glowColor,
            opacity: 0.1,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: variantConfig.glowColor,
            opacity: 0.05,
          }}
        />

        {/* Icon Container */}
        <Animated.View style={iconAnimatedStyle}>
          <LinearGradient
            colors={variantConfig.iconBg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: sizeConfig.iconContainer,
              height: sizeConfig.iconContainer,
              borderRadius: sizeConfig.iconContainer / 2,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: sizeConfig.spacing,
              shadowColor: variantConfig.glowColor,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            <Ionicons
              name={icon}
              size={sizeConfig.iconSize}
              color={variantConfig.iconColor}
            />
          </LinearGradient>
        </Animated.View>

        {/* Content Container */}
        <Animated.View
          style={[
            textAnimatedStyle,
            { alignItems: "center", gap: sizeConfig.spacing / 2 },
          ]}
        >
          {/* Title */}
          <Text
            style={{
              color: variantConfig.titleColor,
              fontSize: sizeConfig.titleSize,
              fontWeight: "800",
              textAlign: "center",
              lineHeight: sizeConfig.titleSize * 1.2,
              letterSpacing: -0.5,
              marginBottom: 8,
            }}
          >
            {title}
          </Text>

          {/* Description */}
          <Text
            style={{
              color: variantConfig.descriptionColor,
              fontSize: sizeConfig.descriptionSize,
              textAlign: "center",
              lineHeight: sizeConfig.descriptionSize * 1.4,
              fontWeight: "500",
              maxWidth: isLargeScreen ? 400 : isSmallScreen ? 260 : 300,
              opacity: 0.9,
            }}
          >
            {description}
          </Text>
        </Animated.View>

        {/* Action Button */}
        {actionText && onAction && (
          <Animated.View
            style={[
              buttonAnimatedStyle,
              { marginTop: sizeConfig.spacing * 1.2 },
            ]}
          >
            <TouchableOpacity
              onPress={onAction}
              activeOpacity={0.85}
              style={{
                shadowColor: variantConfig.glowColor,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <LinearGradient
                colors={variantConfig.buttonBg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  paddingHorizontal: isSmallScreen ? 28 : 32,
                  paddingVertical: isSmallScreen ? 14 : 16,
                  borderRadius: 16,
                  minWidth: isSmallScreen ? 140 : 160,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: variantConfig.buttonText,
                    fontSize: isSmallScreen ? 15 : 17,
                    fontWeight: "700",
                    letterSpacing: 0.5,
                  }}
                >
                  {actionText}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

export default EmptyState;
