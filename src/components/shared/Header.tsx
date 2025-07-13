import { useSafeAreaInsets } from "react-native-safe-area-context";

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Header = () => {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("window");
  const isSmallScreen = width < 400;

  const styles = {
    padding: 24,
    logoSize: isSmallScreen ? 20 : 26,
    titleSize: isSmallScreen ? 24 : 32,
    greetingSize: isSmallScreen ? 18 : 22,
    cardPadding: isSmallScreen ? 16 : 20,
  };
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Günaydın";
    if (hour < 17) return "İyi günler";
    return "İyi akşamlar";
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0f172a"
        translucent={Platform.OS === "android"}
      />
      <LinearGradient
        colors={["#0f172a", "#1e293b", "#334155"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 24,
          paddingHorizontal: styles.padding,
        }}
      >
        {/* Ana Container */}
        <View style={{ gap: 20 }}>
          {/* Üst Kısım - Logo ve Çıkış */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            {/* Logo Bölümü */}
            <View style={{ flex: 1, gap: 16 }}>
              <View
                style={{
                  flexDirection: isSmallScreen ? "column" : "row",
                  alignItems: isSmallScreen ? "flex-start" : "center",
                  gap: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    borderWidth: 1,
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    padding: 12,
                    borderRadius: 16,
                    shadowColor: "#3b82f6",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                >
                  <LinearGradient
                    colors={["#3b82f6", "#8b5cf6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 16,
                    }}
                  />
                  <Ionicons
                    name="briefcase-outline"
                    size={styles.logoSize}
                    color="white"
                  />
                </View>

                <View style={{ gap: 4 }}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: styles.titleSize,
                      fontWeight: "700",
                      letterSpacing: -0.5,
                    }}
                  >
                    Daily Mate
                  </Text>
                  <Text
                    style={{
                      color: "#cbd5e1",
                      fontSize: isSmallScreen ? 12 : 14,
                      fontWeight: "500",
                      opacity: 0.8,
                    }}
                  >
                    Çalışma Takip Sistemi
                  </Text>
                </View>
              </View>
            </View>

            {/* Çıkış Butonu */}
            <TouchableOpacity
              onPress={logout}
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                borderWidth: 1,
                borderColor: "rgba(239, 68, 68, 0.3)",
                paddingHorizontal: isSmallScreen ? 12 : 16,
                paddingVertical: isSmallScreen ? 8 : 12,
                borderRadius: 12,
                shadowColor: "#ef4444",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
              activeOpacity={0.8}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: isSmallScreen ? 4 : 8,
                }}
              >
                <Ionicons
                  name="log-out-outline"
                  size={isSmallScreen ? 16 : 20}
                  color="#ef4444"
                />
                {!isSmallScreen && (
                  <Text
                    style={{
                      color: "#ef4444",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    Çıkış
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Karşılama Kartı */}
          {/* <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.12)",
              borderRadius: 20,
              padding: styles.cardPadding,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: styles.greetingSize,
                  fontWeight: "600",
                  lineHeight: styles.greetingSize * 1.3,
                }}
              >
                {getGreeting()}, {user?.name || "Kullanıcı"}!
              </Text>
              <Text
                style={{
                  color: "#e2e8f0",
                  fontSize: isSmallScreen ? 14 : 16,
                  lineHeight: isSmallScreen ? 20 : 24,
                  fontWeight: "400",
                  opacity: 0.9,
                }}
              >
                Bugün nasıl bir gün geçirdiniz?
              </Text>
            </View>
          </View> */}

          {/* Alt Bilgi Çubuğu */}
          <View
            style={{
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: isSmallScreen ? "flex-start" : "center",
              justifyContent: "space-between",
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: "rgba(255, 255, 255, 0.1)",
              gap: isSmallScreen ? 12 : 0,
            }}
          >
            {/* Sistem Durumu */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "#22c55e",
                  borderRadius: 4,
                  shadowColor: "#22c55e",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.6,
                  shadowRadius: 4,
                  elevation: 4,
                }}
              />
              <Text
                style={{
                  color: "#cbd5e1",
                  fontSize: isSmallScreen ? 12 : 14,
                  fontWeight: "500",
                }}
              >
                Sistem Aktif
              </Text>
            </View>

            {/* Tarih */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Ionicons
                name="calendar-outline"
                size={isSmallScreen ? 14 : 16}
                color="#94a3b8"
              />
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: isSmallScreen ? 12 : 14,
                  fontWeight: "500",
                }}
              >
                {formatDate()}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default Header;
