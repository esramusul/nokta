import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { View } from 'react-native';

// Audit Widget imports
import { AuditWidget } from '@xtatistix/mobile-audit';
import { captureScreen, captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const pathname = usePathname();

  const auditDeps = {
    captureScreen: async () => await captureScreen({ format: 'png', quality: 0.8 }),
    captureRef: async (ref: any) => await captureRef(ref, { format: 'png', quality: 0.8 }),
    writeFile: async (filename: string, content: string) => {
      const uri = FileSystem.documentDirectory + filename;
      await FileSystem.writeAsStringAsync(uri, content);
      return uri;
    },
    writeFileBinary: async (filename: string, base64: string) => {
      const uri = FileSystem.documentDirectory + filename;
      await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
      return uri;
    },
    shareFile: async (uri: string) => {
      await Sharing.shareAsync(uri);
    },
    storage: {
      get: async (key: string) => await AsyncStorage.getItem(key),
      set: async (key: string, val: string) => await AsyncStorage.setItem(key, val)
    },
    currentScreen: pathname || 'unknown',
    BugIcon: <Ionicons name="bug" size={24} color="white" />
  };

  return (
    <ThemeProvider value={DarkTheme}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="interview" />
          <Stack.Screen name="result" />
          <Stack.Screen name="expert" />
        </Stack>
        <AuditWidget deps={auditDeps} />
      </View>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
