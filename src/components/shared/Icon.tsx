import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";

export type IconType =
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "FontAwesome5"
  | "FontAwesome6"
  | "Fontisto"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial";

export type IconProps = {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
  className?: string;
};

export const Icon = ({ type, name, size, color, className }: IconProps) => {
  if (type === "AntDesign") {
    return (
      <AntDesign
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "Entypo") {
    return (
      <Entypo
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "EvilIcons") {
    return (
      <EvilIcons
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "Feather") {
    return (
      <Feather
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "FontAwesome") {
    return (
      <FontAwesome
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "FontAwesome5") {
    return (
      <FontAwesome5
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "FontAwesome6") {
    return (
      <FontAwesome6
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "Fontisto") {
    return (
      <Fontisto
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "Foundation") {
    return (
      <Foundation
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "Ionicons") {
    return (
      <Ionicons
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "MaterialCommunityIcons") {
    return (
      <MaterialCommunityIcons
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "MaterialIcons") {
    return (
      <MaterialIcons
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "Octicons") {
    return (
      <Octicons
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "SimpleLineIcons") {
    return (
      <SimpleLineIcons
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  if (type === "Zocial") {
    return (
      <Zocial
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    );
  }

  return null;
};
