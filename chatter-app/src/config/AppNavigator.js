import React from 'react';
import {useColorScheme, StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Chat, Home, Login, SignUp, UserProfile, Profile, GroupProfile, MediaManager} from "../screens";
import {theme} from "./theme";
import saga from "./saga";
import {useInjectSaga} from "../utils/injectSaga";
import {navigationRef} from './Navigator';
import LinkWeb from "../screens/LinkWeb";
import BlockedList from "../screens/BlockedList";

const Stack = createNativeStackNavigator();

const appNavigator = () => {
  const routeNameRef = React.useRef();
  const scheme = useColorScheme();
  useInjectSaga({key: 'root', saga});

  React.useEffect(() => {
    if (scheme === 'dark') {
      setTimeout(() => {
        StatusBar.setBackgroundColor(theme.dark.bg);
        StatusBar.setBarStyle('light-content');
      }, 100);
    }
  }, []);

  const MyTheme = React.useMemo(() => ({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: scheme === 'dark' ? theme.dark.bg : theme.light.bg
    },
  }), [scheme]);

  const stackOptions = React.useMemo(() => ({headerShown: false}), []);

  return (
    <NavigationContainer
      theme={MyTheme} ref={navigationRef}
      onReady={() => {routeNameRef.current = navigationRef.getCurrentRoute().name;}}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName && scheme !== 'dark') {
          if (currentRouteName === 'UserProfile') {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#000')
          } else {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#fff')
          }
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator screenOptions={stackOptions}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name="UserProfile" component={UserProfile}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="GroupProfile" component={GroupProfile}/>
        <Stack.Screen name="LinkWeb" component={LinkWeb}/>
        <Stack.Screen name="BlockedList" component={BlockedList}/>
        <Stack.Screen name="MediaManager" component={MediaManager}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default appNavigator;
