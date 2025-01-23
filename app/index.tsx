import React from "react";
import { DeckSwiper } from "@/components/Deck";
import { View, Text, StyleSheet } from "react-native";

const data = [
  { id: "1", name: "Card 1" },
  { id: "2", name: "Card 2" },
];

export default function App() {
  return (
    <View style={styles.container}>
      <DeckSwiper
        data={data}
        renderCard={(item) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
          </View>
        )}
        renderAheadCount={2}
        onSwipeLeft={() => alert("Swipe left")}
        onSwipeRight={() => alert("Swipe right")}
        onSwipeUp={() => alert("Swipe up")}
        onSwipeDown={() => alert("Swipe down")}
        onSingleTap={() => alert("Single tap")}
        onDoubleTap={() => alert("Double tap")}
        overlayLabels={{
          left: <Text style={{ color: "red", fontSize: 24 }}>SWIPE LEFT</Text>,
          right: (
            <View
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "yellow",
              }}
            >
              <Text style={{ color: "green", fontSize: 24 }}>SWIPE RIGHT</Text>
            </View>
          ),
          up: (
            <View
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                borderRadius: 50,
                padding: 25,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                SWIPE UP
              </Text>
            </View>
          ),
          down: (
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: 50,
                padding: 25,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                SWIPE DOWN
              </Text>
            </View>
          ),
        }}
      />
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
    width: 300,
    height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
