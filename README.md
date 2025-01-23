# Expo Deck Swiper

A highly customizable and performant deck swiper component for React Native and Expo, featuring smooth animations, gesture controls, and extensive customization options.

## Features

- 👆 Smooth swipe gestures (left, right, up, down)
- 🎯 Single and double tap support
- 🎨 Customizable overlay labels for swipe directions
- 💅 Flexible styling options for cards and container
- 🔄 Card recycling for optimal performance
- 📱 Built for React Native and Expo
- 📦 TypeScript support

## Installation

```bash
npm install expo-deck-swiper
# or
yarn add expo-deck-swiper
```

This package requires the following peer dependencies:

```json
{
  "react": ">=16.8.0",
  "react-native": ">=0.60.0",
  "react-native-gesture-handler": ">=2.0.0",
  "react-native-reanimated": ">=2.0.0"
}
```

## Basic Usage

```tsx
import { DeckSwiper } from "expo-deck-swiper";

const data = [
  { id: "1", name: "Card 1" },
  { id: "2", name: "Card 2" },
];

export default function App() {
  return (
    <DeckSwiper
      data={data}
      renderCard={(item) => (
        <View style={styles.card}>
          <Text>{item.name}</Text>
        </View>
      )}
      onSwipeLeft={(item) => console.log("Swiped left:", item)}
      onSwipeRight={(item) => console.log("Swiped right:", item)}
    />
  );
}
```

## Props

### Required Props

| Prop         | Type                           | Description                            |
| ------------ | ------------------------------ | -------------------------------------- |
| `data`       | `T[]`                          | Array of items to be rendered as cards |
| `renderCard` | `(item: T) => React.ReactNode` | Function to render individual cards    |

### Optional Props

| Prop                    | Type               | Description                                        |
| ----------------------- | ------------------ | -------------------------------------------------- |
| `onSwipeLeft`           | `SwipeCallback<T>` | Callback when card is swiped left                  |
| `onSwipeRight`          | `SwipeCallback<T>` | Callback when card is swiped right                 |
| `onSwipeUp`             | `SwipeCallback<T>` | Callback when card is swiped up                    |
| `onSwipeDown`           | `SwipeCallback<T>` | Callback when card is swiped down                  |
| `onSingleTap`           | `SwipeCallback<T>` | Callback for single tap on card                    |
| `onDoubleTap`           | `SwipeCallback<T>` | Callback for double tap on card                    |
| `onDragStart`           | `SwipeCallback<T>` | Callback when card drag starts                     |
| `onDragEnd`             | `SwipeCallback<T>` | Callback when card drag ends                       |
| `overlayLabels`         | `OverlayLabels`    | Custom overlay components for each swipe direction |
| `containerStyle`        | `ViewStyle`        | Style for the container component                  |
| `cardStyle`             | `ViewStyle`        | Style for the card component                       |
| `backCardStyle`         | `ViewStyle`        | Style for the card behind the top card             |
| `overlayContainerStyle` | `ViewStyle`        | Style for the overlay container                    |
| `renderAheadCount`      | `number`           | Number of cards to render ahead (default: 2)       |

## Advanced Usage

### Custom Overlay Labels

```tsx
<DeckSwiper
  data={data}
  renderCard={renderCard}
  overlayLabels={{
    left: <Text style={{ color: "red" }}>NOPE</Text>,
    right: <Text style={{ color: "green" }}>LIKE</Text>,
    up: <Text style={{ color: "blue" }}>SUPER LIKE</Text>,
    down: <Text style={{ color: "orange" }}>MAYBE</Text>,
  }}
/>
```

### Custom Styling

```tsx
<DeckSwiper
  data={data}
  renderCard={renderCard}
  containerStyle={{
    backgroundColor: "#f5f5f5",
    padding: 10,
  }}
  cardStyle={{
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  }}
  backCardStyle={{
    opacity: 0.7,
    transform: [{ scale: 0.9 }],
  }}
/>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
