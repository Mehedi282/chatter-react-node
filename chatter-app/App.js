/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar} from 'react-native';
import AppNavigator from "./src/config/AppNavigator";
import {IS_IOS, ThemeContainer} from "./src/config/theme";
import configureStore from "./src/config/configureStore";
import {MenuProvider} from 'react-native-popup-menu';
import {Provider} from "react-redux";
console.disableYellowBox = true;

const App: () => Node = () => {
  const store = configureStore({});

  return (
    <Provider store={store}>
      {!IS_IOS ? <StatusBar backgroundColor="#fff" barStyle="dark-content" /> : null}
      <ThemeContainer>
        <MenuProvider>
          <View style={{flex: 1}}>
            <AppNavigator />
          </View>
        </MenuProvider>
      </ThemeContainer>
    </Provider>
  );
};

export default App;
