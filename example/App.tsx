import React from "react";
import { DeckSwiper } from "expo-deck-swiper";
import { View, Text, StyleSheet, Image } from "react-native";

const data = [
  {
    id: "1",
    name: "Sarah Parker",
    age: 28,
    bio: "Adventure seeker & coffee enthusiast",
    image: require("../assets/images/react-logo.png"),
  },
  {
    id: "2",
    name: "John Smith",
    age: 32,
    bio: "Tech geek, loves hiking and photography",
    image: require("../assets/images/react-logo.png"),
  },
  {
    id: "3",
    name: "Emma Wilson",
    age: 25,
    bio: "Artist & musician, looking for creative connections",
    image: require("../assets/images/react-logo.png"),
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <DeckSwiper
        data={data}
        allowedDirections={["left", "right"]}
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
        renderCard={(item) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>
                {item.name}, {item.age}
              </Text>
              <Text style={styles.bio}>{item.bio}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
});
