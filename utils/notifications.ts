// utils/notifications.ts
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

export const scheduleReminder = async (title: string, startTime: string) => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert(
      "Permission Required", 
      "Please enable notifications in your phone settings to get reminders."
    );
    return null;
  }

  const eventDate = new Date(startTime);
  

  const triggerDate = new Date(eventDate.getTime() - 10 * 60 * 1000); // 10 minutes before

  if (triggerDate <= new Date()) {
    return null; 
  }

  const secondsUntilEvent = Math.floor((triggerDate.getTime() - Date.now()) / 1000);

 
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Session Starting Soon!",
        body: `${title} is starting in 10 minutes.`,
        sound: 'default',
      },
      trigger: { 
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: secondsUntilEvent,
        repeats: false 
      },
    });
    
    Alert.alert("Reminder Set", `We'll notify you at ${triggerDate.toLocaleTimeString()}`);
    
    return notificationId;
    
  } catch (error) {
    console.error("Notification failed:", error);
    return null;
  }
};

export const cancelReminder = async (notificationId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};