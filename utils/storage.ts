import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'event-favorites-map-v1'; 
export interface FavoritesMap {
  [eventId: string]: string | null;
}

export const getFavoritesMap = async (): Promise<FavoritesMap> => {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : {};
  } catch (e) {
    return {};
  }
};

export const saveFavoritesMap = async (map: FavoritesMap) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(map));
  } catch (e) {
    console.error(e);
  }
};