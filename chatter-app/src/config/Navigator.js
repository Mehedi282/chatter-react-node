import { createNavigationContainerRef } from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady())
    navigationRef.navigate(name, params);
}

export function replace(name, params) {
  if (navigationRef.isReady())
    navigationRef.dispatch(StackActions.replace(name, params))
}

export function goBack(name) {
  if (navigationRef.isReady())
    navigationRef.goBack(name);
}
