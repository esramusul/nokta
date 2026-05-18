import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { View } from 'react-native';

// Audit Widget imports
import { AuditWidget } from '@xtatistix/mobile-audit';
import type { AuditNote } from '@xtatistix/mobile-audit';
import { captureScreen, captureRef } from 'react-native-view-shot';
import { Paths, File } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const AUDIT_STORAGE_KEY = 'audit_notes_v1';

export default function RootLayout() {
  const pathname = usePathname();

  const auditDeps = {
    captureScreen: async () => await captureScreen({ format: 'png', quality: 0.8 }),
    captureRef: async (ref: any) => await captureRef(ref, { format: 'png', quality: 0.8 }),
    writeFile: async (filename: string, content: string) => {
      const file = new File(Paths.document, filename);
      file.write(content);
      return file.uri;
    },
    writeFileBinary: async (filename: string, base64: string) => {
      const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const file = new File(Paths.document, filename);
      file.write(bytes);
      return file.uri;
    },
    shareFile: async (uri: string) => {
      await Sharing.shareAsync(uri);
    },
    storage: {
      loadNotes: async (): Promise<AuditNote[]> => {
        try {
          const raw = await AsyncStorage.getItem(AUDIT_STORAGE_KEY);
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      },
      saveNotes: async (notes: AuditNote[]): Promise<void> => {
        await AsyncStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(notes));
      },
    },
    currentScreen: pathname || 'unknown',
    BugIcon: <Ionicons name="bug" size={24} color="white" />,
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
