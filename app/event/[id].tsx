import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack } from 'expo-router';
import { EVENTS } from '../../data/events';
import { getEventStatus } from '../../utils/time';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = EVENTS.find((e) => e.id === id);

  if (!event) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Event not found</Text>
      </SafeAreaView>
    );
  }

  const status = getEventStatus(event.startTime, event.endTime);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Session Details</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>{event.title}</Text>

        {/* Status Badge */}
        <View
          style={[
            styles.badge,
            status === 'LIVE' && styles.badgeLive,
            status === 'UPCOMING' && styles.badgeUpcoming,
            status === 'COMPLETED' && styles.badgeCompleted,
          ]}
        >
          <Text style={styles.badgeText}>{status}</Text>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <InfoRow label="Speaker" value={event.speaker} />
          <InfoRow
            label="Time"
            value={new Date(event.startTime).toLocaleString()}
          />
          <InfoRow label="Venue" value={event.venue} />
        </View>

        {/* Description */}
        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>About the Session</Text>
          <Text style={styles.descriptionText}>
            {event.description ||
              'No description available for this session.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Small Reusable Component ---------------- */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  errorText: {
    fontSize: 16,
    color: '#999',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },

  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
    backgroundColor: '#E5E7EB',
  },

  badgeLive: {
    backgroundColor: '#FF3B30',
  },

  badgeUpcoming: {
    backgroundColor: '#34C759',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginVertical: 16,
    marginBottom: 16,
    color: '#000'
  },

  badgeCompleted: {
    backgroundColor: '#C7C7CC',
  },

  badgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  infoRow: {
    marginBottom: 14,
  },

  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },

  descriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 10,
  },

  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
  },
});
