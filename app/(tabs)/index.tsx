import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { EVENTS } from "../../data/events";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Event Schedule</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 50, 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  }
});