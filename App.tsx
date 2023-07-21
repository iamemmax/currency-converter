import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import Homescreen from './screens/Homescreen';
import MyTabs from './navigations/tab';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './components/utils/colors';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider isSSR={false}>
        <Box flex={"1"} bgColor={colors.bg_light} safeAreaTop>
          <StatusBar style='auto' />
          <MyTabs />
        </Box>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
