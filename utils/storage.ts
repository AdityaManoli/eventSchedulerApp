import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'event-app-favorites';

export const getFavorites = async (): Promise<string[]> => {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
};

export const saveFavorites = async (ids: string[]) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(ids));
  } catch (e) {
    console.error(e);
  }
};