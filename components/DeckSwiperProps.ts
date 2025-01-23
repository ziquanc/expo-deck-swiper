import { StyleProp, ViewStyle } from "react-native";

export interface BaseItem {
  id: string | number;
}

export interface DeckSwiperProps<T extends BaseItem> {
  data: T[];
  renderCard: (item: T) => React.ReactNode;
  onSwipeLeft?: (item: T) => void;
  onSwipeRight?: (item: T) => void;
  onSwipeUp?: (item: T) => void;
  onSwipeDown?: (item: T) => void;
  onSingleTap?: (item: T) => void;
  onDoubleTap?: (item: T) => void;
  onDragStart?: (item: T) => void;
  onDragEnd?: (item: T) => void;
  overlayLabels?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
    up?: React.ReactNode;
    down?: React.ReactNode;
  };
  containerStyle?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  backCardStyle?: StyleProp<ViewStyle>;
  overlayContainerStyle?: StyleProp<ViewStyle>;
  renderAheadCount?: number;
}
