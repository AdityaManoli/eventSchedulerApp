import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { EVENTS } from '../../data/events'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventCard } from '@/components/EventCard';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Event Schedule</Text>
      <FlatList
        data={EVENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginVertical: 16,
    marginBottom: 16,
    color: '#000'
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000'
  },
  itemTime: {
    color: '#666',
  }
});