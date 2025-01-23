import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, PanResponder, Animated } from "react-native";
import { DeckSwiperProps, BaseItem } from "./DeckSwiperProps";

const SWIPE_THRESHOLD = 120;
const ROTATION_RANGE = 10;
const DOUBLE_TAP_DELAY = 300;

export function DeckSwiper<T extends BaseItem>({
  data,
  renderCard,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onSingleTap,
  onDoubleTap,
  overlayLabels,
  onDragStart,
  onDragEnd,
  containerStyle,
  cardStyle,
  backCardStyle,
  overlayContainerStyle,
  renderAheadCount = 2,
}: DeckSwiperProps<T>) {
  const [cards, setCards] = useState<T[]>(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const lastTap = useRef<number>(0);
  const tapTimeout = useRef<NodeJS.Timeout | null>(null);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [`-${ROTATION_RANGE}deg`, "0deg", `${ROTATION_RANGE}deg`],
  });

  useEffect(() => {
    // Reset index when data changes
    setCurrentIndex(0);
  }, [data]);

  const handleRearrangement = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const [removed] = newCards.splice(currentIndex, 1);
      newCards.push(removed);
      // console.log("newCards", newCards);
      return newCards;
    });

    // Keep showing the next card (which is now at the same index)
    setCurrentIndex((prev) => Math.min(prev, cards.length - 1));
  };

  const handleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
      onDoubleTap?.(cards[currentIndex]);
      if (tapTimeout.current) clearTimeout(tapTimeout.current);
    } else {
      tapTimeout.current = setTimeout(() => {
        onSingleTap?.(cards[currentIndex]);
      }, DOUBLE_TAP_DELAY);
    }
    lastTap.current = now;
  };

  const [isDragging, setIsDragging] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onDragStart?.(cards[currentIndex]);
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        rotate.setValue(gesture.dx / SWIPE_THRESHOLD);
        setIsDragging(true);
        setLastGesture({ dx: gesture.dx, dy: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        setIsDragging(false);
        onDragEnd?.(cards[currentIndex]);
        if (
          Math.abs(gesture.dx) > SWIPE_THRESHOLD ||
          Math.abs(gesture.dy) > SWIPE_THRESHOLD
        ) {
          const direction = getSwipeDirection(gesture);
          handleSwipe(direction);
        } else {
          if (Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5) {
            handleTap();
          }
          resetPosition();
        }
      },
    })
  ).current;

  const getSwipeDirection = (
    gesture: any
  ): "left" | "right" | "up" | "down" => {
    if (Math.abs(gesture.dx) > Math.abs(gesture.dy)) {
      return gesture.dx > 0 ? "right" : "left";
    } else {
      return gesture.dy > 0 ? "down" : "up";
    }
  };

  const handleSwipe = (direction: "left" | "right" | "up" | "down") => {
    const swipeCallbacks = {
      left: onSwipeLeft,
      right: onSwipeRight,
      up: onSwipeUp,
      down: onSwipeDown,
    };

    Animated.timing(position, {
      toValue: {
        x: direction === "left" ? -500 : direction === "right" ? 500 : 0,
        y: direction === "up" ? -500 : direction === "down" ? 500 : 0,
      },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      swipeCallbacks[direction]?.(cards[currentIndex]);
      handleRearrangement();
      position.setValue({ x: 0, y: 0 });
      rotate.setValue(0);
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: false,
    }).start();

    Animated.spring(rotate, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => ({
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate: rotateInterpolate },
    ],
  });

  const [lastGesture, setLastGesture] = useState<{ dx: number; dy: number }>({
    dx: 0,
    dy: 0,
  });

  const DRAG_THRESHOLD = 50;

  const renderOverlay = () => {
    if (!isDragging || !lastGesture) return null;

    const dragDistance = Math.sqrt(
      Math.pow(lastGesture.dx, 2) + Math.pow(lastGesture.dy, 2)
    );

    if (dragDistance < DRAG_THRESHOLD) return null;

    if (Math.abs(lastGesture.dx) > Math.abs(lastGesture.dy)) {
      return lastGesture.dx > 0 ? overlayLabels?.right : overlayLabels?.left;
    } else {
      return lastGesture.dy > 0 ? overlayLabels?.down : overlayLabels?.up;
    }
  };

  if (cards.length === 0) return null;

  return (
    <View style={[styles.container, containerStyle]}>
      {cards
        .slice(currentIndex, currentIndex + renderAheadCount)
        .map((item, index) => {
          const isTopCard = index === 0;
          const cardStyle = isTopCard ? getCardStyle() : styles.backCard;
          return (
            <Animated.View
              key={`card-${item.id}-${index}`}
              style={[
                styles.card,
                cardStyle,
                isTopCard ? undefined : [styles.backCard, backCardStyle],
              ]}
              {...(isTopCard ? panResponder.panHandlers : {})}
            >
              {renderCard(item)}
              {isTopCard && (
                <View style={[styles.overlayContainer, overlayContainerStyle]}>
                  {renderOverlay()}
                </View>
              )}
            </Animated.View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "absolute",
    width: "80%",
    height: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 10,
    backgroundColor: "white",
    zIndex: 2,
  },
  backCard: {
    zIndex: 1,
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  overlayContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
});
