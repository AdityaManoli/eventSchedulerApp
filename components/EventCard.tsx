import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EventSession } from '../types';
import { getEventStatus } from '../utils/time';
import { TouchableOpacity } from 'react-native';

interface EventCardProps {
  event: EventSession;
  onPress: () => void;  
}

export const EventCard = ({ event, onPress }: EventCardProps) => {
  const status =  getEventStatus(event.startTime, event.endTime);
  const formattedTime = new Date(event.startTime).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'LIVE':
        return '#FF3B30';
      case 'UPCOMING':
        return '#34C759'; 
      default:
        return '#C7C7CC'; 
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.badge, { backgroundColor: getBadgeColor(status) }]}>
          <Text style={styles.badgeText}>{status}</Text>
        </View>
          <Text style={styles.time}>{formattedTime}</Text>
        </View>
          
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.speaker}>{event.speaker}</Text>
        <Text style={styles.venue}>📍 {event.venue}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: '#007AFF', 
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  speaker: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  venue: {
    fontSize: 12,
    color: '#999',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  }
});