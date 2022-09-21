import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from './pages/HomePage'
import PokemonPage from './pages/PokemonPage';
import DetailPage from './pages/DetailPage';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Dimensions } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const AppNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="PokemonPage" component={PokemonPage} options={{ headerShown: false }} />
        <Stack.Screen name="DetailPage" component={DetailPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'HomePage') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline';
              } else if (route.name === 'AppNavigator') {
                iconName = focused
                  ? 'ios-disc'
                  : 'ios-disc-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2b73b9',
            tabBarInactiveTintColor: '#2b73b9',
            tabBarStyle: {
              backgroundColor: '#ffcb05', margin: 20, elevation: 1, shadowOpacity: 0.2,
              borderTopWidth: 0, height: Dimensions.get('window').height * 0.07
            },
          })}
        >
          <Tab.Screen name="HomePage" component={HomePage} options={{
            title: 'Home',
            headerShown: false,
          }} />
          <Tab.Screen name="AppNavigator" component={AppNavigator} options={{
            title: 'Pokemon',
            headerShown: false,
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}