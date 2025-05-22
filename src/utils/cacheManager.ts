import RNFetchBlob from 'react-native-blob-util';
import { Platform } from 'react-native';

// Cache directory based on the platform
const cacheDir: string =
  Platform.OS === 'ios'
    ? RNFetchBlob.fs.dirs.DocumentDir
    : RNFetchBlob.fs.dirs.CacheDir;

// Supported audio extensions
const AUDIO_EXTENSIONS = ['mp3', 'm4a', 'wav', 'aac', 'ogg'];

// Event system for cache changes
type CacheEventListener = (removedFilePath: string) => void;
const cacheEventListeners: CacheEventListener[] = [];

export const addCacheEventListener = (listener: CacheEventListener) => {
  cacheEventListeners.push(listener);
  return () => {
    const index = cacheEventListeners.indexOf(listener);
    if (index > -1) {
      cacheEventListeners.splice(index, 1);
    }
  };
};

const notifyCacheListeners = (removedFilePath: string) => {
  cacheEventListeners.forEach(listener => listener(removedFilePath));
};

/**
 * Checks if a file is an audio file based on its extension
 * @param fileName - The name of the file to check
 * @returns boolean indicating if the file is an audio file
 */
const isAudioFile = (fileName: string): boolean => {
  return AUDIO_EXTENSIONS.some(ext => fileName.toLowerCase().endsWith(ext));
};

/**
 * Cleans expired audio files from cache
 * @param expirationTime - Time in milliseconds after which files should be considered expired
 * @returns Promise that resolves when the cleanup is complete
 */
export const cleanExpiredAudioCache = async (
  expirationTime: number
): Promise<void> => {
  try {
    // Get all files in the cache directory
    const files = await RNFetchBlob.fs.ls(cacheDir);

    // Filter audio files and check their expiration
    const cleanupPromises = files
      .filter(file => isAudioFile(file))
      .map(async file => {
        const filePath = `${cacheDir}/${file}`;
        const stats = await RNFetchBlob.fs.stat(filePath);
        const fileAge = Date.now() - stats.lastModified;

        // If file is expired, delete it
        if (fileAge >= expirationTime) {
          await RNFetchBlob.fs.unlink(filePath);
          notifyCacheListeners(filePath);
        }
      });

    await Promise.all(cleanupPromises);
  } catch (error) {
    console.error('Error cleaning expired audio cache:', error);
    throw error;
  }
};

/**
 * Gets the total size of all audio files in cache
 * @returns Promise that resolves to the total size in bytes
 */
export const getTotalAudioCacheSize = async (): Promise<number> => {
  try {
    const files = await RNFetchBlob.fs.ls(cacheDir);
    const audioFiles = files.filter(file => isAudioFile(file));

    let totalSize = 0;
    for (const file of audioFiles) {
      const filePath = `${cacheDir}/${file}`;
      const stats = await RNFetchBlob.fs.stat(filePath);
      totalSize += stats.size;
    }

    return totalSize;
  } catch (error) {
    console.error('Error getting total audio cache size:', error);
    throw error;
  }
};

/**
 * Cleans all audio files from cache regardless of expiration
 * @returns Promise that resolves when the cleanup is complete
 */
export const cleanAllAudioCache = async (): Promise<void> => {
  try {
    const files = await RNFetchBlob.fs.ls(cacheDir);
    const audioFiles = files.filter(file => isAudioFile(file));

    const cleanupPromises = audioFiles.map(async file => {
      const filePath = `${cacheDir}/${file}`;
      await RNFetchBlob.fs.unlink(filePath);
      notifyCacheListeners(filePath);
    });

    await Promise.all(cleanupPromises);
  } catch (error) {
    console.error('Error cleaning all audio cache:', error);
    throw error;
  }
};
