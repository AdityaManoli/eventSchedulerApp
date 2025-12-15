# 📅 Event Scheduler App

A modern, cross-platform mobile application built with React Native and Expo that helps users manage conference sessions with intelligent notifications and seamless bookmarking.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

### 🎯 Core Functionality
- **Event Listing**: Browse all conference sessions with real-time status indicators (Live, Upcoming, Ended)
- **Deep Dive Details**: Tap any event to view a modal popup with speaker information, venue details, and full descriptions
- **My Schedule**: Create your personal schedule by bookmarking favorite events to a dedicated Favorites tab
- **Smart Notifications**: Automatically receive local push notifications 10 minutes before any favorited event begins
- **Notification Management**: Intelligently cancels notifications when you un-favorite an event
- **Modern UI**: Beautiful card-based layout with custom floating tab bar and clean typography

### 🔔 Notification Intelligence
The app uses a sophisticated notification system that:
- Calculates the exact time difference between now and 10 minutes before your event
- Schedules notifications with the OS, which handles them even when the app is closed
- Maintains a map of event IDs to notification IDs for instant cancellation when needed
- Works entirely offline using local notifications (no server required)

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo** | Development platform and build tools |
| **TypeScript** | Type-safe development |
| **Expo Router** | File-based navigation system |
| **AsyncStorage** | Persistent local data storage |
| **expo-notifications** | Local notification scheduling |
| **Ionicons** | Beautiful icon library |

## 📁 Project Structure

```
event-scheduler-app/
├── app/                          # Main application screens
│   ├── index.tsx                 # Home screen (event listing)
│   ├── favorites.tsx             # Favorites/My Schedule screen
│   └── _layout.tsx               # Global layout and tab navigation
├── components/                   # Reusable UI components
│   ├── EventCard.tsx             # Individual event card component
│   └── EventPopup.tsx            # Event details popup
├── data/                         # Static data
│   └── events.ts                 # Conference event data
├── utils/                        # Helper functions
│   ├── storage.ts                # AsyncStorage map operations
│   ├── notifications.ts          # Notification scheduling/canceling
│   └── time.ts                   # Time calculation utilities
├── types.ts                      # TypeScript interfaces
├── package.json                  # Project dependencies
└── app.json                      # Expo configuration
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Expo Go** app on your physical device:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation

1. **Clone or download the project**
   ```bash
   cd event-scheduler-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Expo-specific packages**
   ```bash
   npx expo install expo-notifications expo-router @react-native-async-storage/async-storage @expo/vector-icons
   ```

### Running the App

1. **Start the development server**
   ```bash
   npx expo start
   ```

2. **Connect your device**
   - A QR code will appear in your terminal
   - **iOS**: Open the Camera app and scan the QR code
   - **Android**: Open the Expo Go app and scan the QR code
   
3. **Wait for the app to load**
   - The app will bundle and load on your device
   - You may see some warnings in the terminal (see Known Issues below)

## 🔑 Key Concepts Implemented

### 1. The "Waiter" (Async/Await)
The app uses asynchronous functions to interact with device storage:
```typescript
const favorites = await loadFavoritesMap();
```
This prevents the UI from freezing while waiting for data to load from the device's storage.

### 2. The "Time Bomb" (Local Notifications)
When you favorite an event, the app:
1. Calculates: `eventStartTime - 10 minutes - currentTime`
2. Converts this to seconds
3. Hands the countdown to the operating system
4. The OS manages the timer, even if the app is closed or the device restarts

### 3. Map-Based Storage Pattern
Instead of storing a simple array of event IDs, the app uses a map structure:
```typescript
{
  "event-1": "notification-abc123",
  "event-2": "notification-def456"
}
```
This allows instant lookup of notification IDs, enabling precise cancellation when un-favoriting events.

## 🧪 Testing Notifications

By default, notifications trigger 10 minutes before events. To test immediately:

1. **Open** `utils/notifications.ts`
2. **Comment out** the "Real Mode" line:
   ```typescript
   // const trigger = { seconds: secondsUntilNotification }; // Real Mode
   ```
3. **Uncomment** the "Test Mode" line:
   ```typescript
   const trigger = { seconds: 5 }; // Test Mode - 5 seconds
   ```
4. **Save the file** and reload the app
5. **Favorite an event** and minimize the app immediately
6. **Wait 5 seconds** for the notification

**Remember to switch back to Real Mode before deploying!**

## ⚠️ Known Issues

### Push Notification Warning (Expo Go)
You may see this warning in the terminal:
```
Warning: Push notifications may not work in Expo Go...
```

**You can safely ignore this.** The app uses **local notifications** (scheduled on-device), not push notifications (server-sent). Local notifications work perfectly in Expo Go. The warning only applies to remote push notifications, which this app doesn't use.

## 🎯 Future Improvements

- [ ] **Speaker Images**: Add profile photos for speakers and event imagery
- [ ] **Search Functionality**: Implement a search bar on the Home screen to filter events
- [ ] **Filters**: Add ability to filter by track, time, or status
- [ ] **Standalone Build**: Create a distributable `.apk` file for Android
- [ ] **iOS Build**: Generate an `.ipa` for App Store distribution
- [ ] **Calendar Integration**: Allow users to export events to their device calendar
- [ ] **Reminders**: Support multiple notification times (15min, 30min, 1hr before)
- [ ] **Dark Mode**: Implement theme switching for better accessibility
- [ ] **Offline Sync**: Add backend integration for multi-device synchronization

## 📱 Screenshots

*Add screenshots of your app here once available*

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons by [Ionicons](https://ionic.io/ionicons)
- Inspired by modern conference scheduling needs

## 📞 Support

If you encounter any issues or have questions:
- Open an issue in the repository
- Check the [Expo documentation](https://docs.expo.dev/)
- Review the [React Native documentation](https://reactnative.dev/docs/getting-started)

---

**Made with ❤️ using React Native and Expo**