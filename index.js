/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import KeyboardManager from 'react-native-keyboard-manager';
import {Platform} from 'react-native';

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setToolbarDoneBarButtonItemText('Pronto');
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);
}

AppRegistry.registerComponent(appName, () => App);
