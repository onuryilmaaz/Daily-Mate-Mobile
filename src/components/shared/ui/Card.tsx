import React from "react";
import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <View
      className={`bg-white rounded-xl shadow-sm p-4 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export default Card;
