/**
 * @format
 */
import { AppRegistry, YellowBox } from 'react-native';

import 'react-native-gesture-handler';

import App from './src/routes/defaultStack';

import { name as appName } from './app.json';

YellowBox.ignoreWarnings(['Unrecognized Websocket']);

AppRegistry.registerComponent(appName, () => App);
