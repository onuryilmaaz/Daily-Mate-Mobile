import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useWorkplaceStore } from "../store/useWorkplaceStore";
import ColorPicker from "react-native-wheel-color-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import Input from "../components/shared/ui/Input";

const { width: screenWidth } = Dimensions.get("window");

const WorkplaceFormScreen = ({ navigation, route }: any) => {
  const { workplace } = route.params || {};
  const { addWorkplace, updateWorkplace } = useWorkplaceStore();

  const [name, setName] = useState(workplace?.name || "");
  const [dailyWage, setDailyWage] = useState(
    workplace?.dailyWage?.toString() || ""
  );
  const [color, setColor] = useState(workplace?.color || "#667eea");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Animations
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(30);
  const buttonScale = useSharedValue(1);
  const colorPickerScale = useSharedValue(0.95);

  React.useEffect(() => {
    formOpacity.value = withTiming(1, { duration: 600 });
    formTranslateY.value = withSpring(0, { damping: 20, stiffness: 90 });
    colorPickerScale.value = withSpring(1, { damping: 15, stiffness: 100 });
  }, []);

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const colorPickerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: colorPickerScale.value }],
  }));

  const handleSubmit = async () => {
    const wageNumber = parseFloat(dailyWage);
    if (!name.trim()) {
      Alert.alert("Eksik Bilgi", "İş yeri adını girmeyi unutmayın.");
      return;
    }
    if (isNaN(wageNumber) || wageNumber <= 0) {
      Alert.alert("Hatalı Ücret", "Lütfen geçerli bir günlük ücret girin.");
      return;
    }

    setIsLoading(true);
    buttonScale.value = withSpring(0.95, { damping: 15 });

    const data = { name: name.trim(), dailyWage: wageNumber, color };

    try {
      if (workplace) {
        await updateWorkplace(workplace._id, data);
      } else {
        await addWorkplace(data);
      }

      buttonScale.value = withSpring(1, { damping: 15 }, () => {
        runOnJS(navigation.goBack)();
      });
    } catch (error) {
      Alert.alert("İşlem Başarısız", "Bir hata oluştu. Lütfen tekrar deneyin.");
      buttonScale.value = withSpring(1, { damping: 15 });
    } finally {
      setIsLoading(false);
    }
  };

  // Universal input
  const InputField = ({
    label,
    value,
    onChangeText,
    onBlur,
    placeholder,
    keyboardType,
    icon,
    prefix,
    suffix,
  }: any) => {
    const inputId = label.toLowerCase().replace(/\s+/g, "");
    const isFocused = focusedInput === inputId;

    return (
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#374151",
            marginBottom: 8,
            marginLeft: 4,
          }}
        >
          {label}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 4,
            borderWidth: 2,
            borderColor: isFocused ? color : "#e5e7eb",
            shadowColor: isFocused ? color : "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isFocused ? 0.2 : 0.1,
            shadowRadius: 8,
            elevation: isFocused ? 4 : 2,
          }}
        >
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={isFocused ? color : "#9ca3af"}
              style={{ marginRight: 12 }}
            />
          )}
          {prefix && (
            <Text
              style={{
                fontSize: 16,
                color: "#6b7280",
                marginRight: 8,
              }}
            >
              {prefix}
            </Text>
          )}
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: "#111827",
              paddingVertical: 16,
              fontWeight: "500",
            }}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            value={value}
            onChangeText={onChangeText}
            onBlur={() => {
              onBlur && onBlur();
              setFocusedInput(null);
            }}
            keyboardType={keyboardType}
            onFocus={() => setFocusedInput(inputId)}
          />
          {suffix && (
            <Text
              style={{
                fontSize: 16,
                color: "#6b7280",
                marginLeft: 8,
                fontWeight: "600",
              }}
            >
              {suffix}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 16,
              backgroundColor: "#ffffff",
              borderBottomWidth: 1,
              borderBottomColor: "#e5e7eb",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#f3f4f6",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <Ionicons name="arrow-back" size={20} color="#374151" />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "800",
                  color: "#111827",
                }}
              >
                {workplace ? "İş Yerini Düzenle" : "Yeni İş Yeri"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginTop: 2,
                }}
              >
                {workplace
                  ? "Bilgileri güncelleyin"
                  : "Yeni bir iş yeri ekleyin"}
              </Text>
            </View>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={[formAnimatedStyle, { padding: 20 }]}>
              {/* Form Fields */}
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 20,
                  padding: 24,
                  marginBottom: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 8,
                }}
              >
                <Input
                  placeholder="Örn: ABC Şirketi"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="none"
                  autoComplete="name"
                  icon="business"
                />
                <Input
                  placeholder="Günlük Ücret"
                  value={dailyWage}
                  onChangeText={setDailyWage}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoComplete="name"
                  icon="cash"
                />
              </View>

              {/* Color Picker */}
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 20,
                  padding: 24,
                  marginBottom: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Ionicons name="color-palette" size={20} color="#374151" />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#374151",
                      marginLeft: 8,
                    }}
                  >
                    Renk Seçin
                  </Text>
                  <View
                    style={{
                      marginLeft: "auto",
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: color,
                      borderWidth: 3,
                      borderColor: "#ffffff",
                      shadowColor: color,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 6,
                      elevation: 4,
                    }}
                  />
                </View>

                <Animated.View
                  style={[
                    colorPickerAnimatedStyle,
                    {
                      height: 280,
                      borderRadius: 16,
                      overflow: "hidden",
                      backgroundColor: "#f9fafb",
                      padding: 20,
                    },
                  ]}
                >
                  <ColorPicker
                    color={color}
                    onColorChangeComplete={setColor}
                    thumbSize={24}
                    sliderSize={20}
                    noSnap={true}
                    row={false}
                    gapSize={16}
                    discreteLength={0}
                    sliderHidden={false}
                    swatches={false}
                  />
                </Animated.View>
              </View>

              {/* Submit */}
              <Animated.View style={buttonAnimatedStyle}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={isLoading}
                  style={{
                    shadowColor: color,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 8,
                  }}
                >
                  <LinearGradient
                    colors={[color, `${color}dd`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      paddingVertical: 18,
                      paddingHorizontal: 32,
                      borderRadius: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      opacity: isLoading ? 0.7 : 1,
                    }}
                  >
                    {isLoading ? (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Ionicons name="hourglass" size={20} color="#ffffff" />
                        <Text
                          style={{
                            color: "#ffffff",
                            fontSize: 18,
                            fontWeight: "700",
                            marginLeft: 8,
                          }}
                        >
                          Kaydediliyor...
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#ffffff"
                        />
                        <Text
                          style={{
                            color: "#ffffff",
                            fontSize: 18,
                            fontWeight: "700",
                            marginLeft: 8,
                          }}
                        >
                          {workplace ? "Güncelle" : "Kaydet"}
                        </Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default WorkplaceFormScreen;
