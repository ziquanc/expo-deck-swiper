import { ReactNode } from "react";
import { ViewStyle } from "react-native";

/** Callback function type for swipe and tap events */
export type SwipeCallback<T> = (item: T) => void;

/** Overlay labels configuration for different swipe directions */
export interface OverlayLabels {
  left?: ReactNode;
  right?: ReactNode;
  up?: ReactNode;
  down?: ReactNode;
}

/** Style props for the deck swiper component */
export interface DeckSwiperStyles {
  containerStyle?: ViewStyle;
  cardStyle?: ViewStyle;
  backCardStyle?: ViewStyle;
  overlayContainerStyle?: ViewStyle;
}
