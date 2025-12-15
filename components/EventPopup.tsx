import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { EventSession } from '../types';
import { getEventStatus } from '../utils/time';
import { Ionicons } from '@expo/vector-icons'; 

interface EventPopupProps {
  visible: boolean;
  event: EventSession | null;
  onClose: () => void;
}

export const EventPopup = ({ visible, event, onClose }: EventPopupProps) => {
  if (!event) return null;

  const status = getEventStatus(event.startTime, event.endTime);
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
    <Modal
      visible={visible}
      transparent={true} 
      animationType="fade" 
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popupCard}>
          <View style={styles.header}>
            <Text style={[styles.statusBadge, { backgroundColor: getBadgeColor(status) }]}>{status}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={30} color="#ccc" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.speaker}>🎤 {event.speaker}</Text>
            
            <View style={styles.divider} />
            
            <View style={styles.row}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.info}>
                {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.info}>{event.venue}</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.descriptionLabel}>About this session</Text>
            <Text style={styles.description}>
              {event.description || "No description provided."}
            </Text>
          </ScrollView>

          
        
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  popupCard: {
    width: '85%', 
    maxHeight: '80%', 
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  speaker: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  info: {
    marginLeft: 8,
    fontSize: 16,
    color: '#444',
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    marginTop: 10,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});