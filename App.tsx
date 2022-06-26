import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme       = useColorScheme();

  if (!isLoadingComplete) {

    return null;

  } else {
    return (
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </IconComponentProvider>
    );
  }
}
