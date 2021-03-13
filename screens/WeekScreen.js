import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WeekScreen = () => {
  return (
    <View style={styles.container}>
      <Text>W.S</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WeekScreen;
