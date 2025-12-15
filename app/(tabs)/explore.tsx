import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EVENTS } from '../../data/events';
import { EventCard } from '../../components/EventCard';
import { EventPopup } from '../../components/EventPopup';
import { EventSession } from '../../types';
import { getFavoritesMap } from '../../utils/storage';

export default function ExploreScreen() {
  const [favoriteEvents, setFavoriteEvents] = useState<EventSession[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventSession | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const favoritesMap = await getFavoritesMap();
        const savedIds = Object.keys(favoritesMap);
        
        const filtered = EVENTS.filter(e => savedIds.includes(e.id));
        setFavoriteEvents(filtered);
      };
      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Schedule</Text>

      {favoriteEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookmarks yet.</Text>
          <Text style={styles.emptySubText}>
            Go to the Home tab and tap the heart on sessions you want to attend.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard 
              event={item} 
              onPress={() => setSelectedEvent(item)} 
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <EventPopup
        visible={selectedEvent !== null}
        event={selectedEvent}
        onClose={() => {
          setSelectedEvent(null);
          
          const refresh = async () => {
            const favoritesMap = await getFavoritesMap();
            const savedIds = Object.keys(favoritesMap);
            setFavoriteEvents(EVENTS.filter(e => savedIds.includes(e.id)));
          };
          refresh();
        }}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16,
    color: '#000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});