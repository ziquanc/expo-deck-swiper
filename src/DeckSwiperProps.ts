import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { DeckSwiperStyles, OverlayLabels, SwipeCallback } from "./types";

/** Base interface for items in the deck */
export interface BaseItem {
  id: string;
  [key: string]: any;
}

/** Props for the DeckSwiper component */
export interface DeckSwiperProps<T extends BaseItem> extends DeckSwiperStyles {
  /** Array of items to be displayed in the deck */
  data: T[];
  /** Function to render each card */
  renderCard: (item: T) => ReactNode;
  /** Callback when a card is swiped left */
  onSwipeLeft?: SwipeCallback<T>;
  /** Callback when a card is swiped right */
  onSwipeRight?: SwipeCallback<T>;
  /** Callback when a card is swiped up */
  onSwipeUp?: SwipeCallback<T>;
  /** Callback when a card is swiped down */
  onSwipeDown?: SwipeCallback<T>;
  /** Callback when a card is single tapped */
  onSingleTap?: SwipeCallback<T>;
  /** Callback when a card is double tapped */
  onDoubleTap?: SwipeCallback<T>;
  /** Custom overlay labels for different swipe directions */
  overlayLabels?: OverlayLabels;
  /** Callback when drag gesture starts */
  onDragStart?: SwipeCallback<T>;
  /** Callback when drag gesture ends */
  onDragEnd?: SwipeCallback<T>;
  /** Number of cards to render ahead for performance */
  renderAheadCount?: number;
  /** Allowed swipe directions */
  allowedDirections?: Array<"left" | "right" | "up" | "down">;
}
