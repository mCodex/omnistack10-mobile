import React, { memo } from 'react';
import { Text } from 'react-native';
import WebView from 'react-native-webview';

const Profile = ({ route }) => {
  const { githubUsername } = route.params;

  return <WebView source={{ uri: `https://github.com/${githubUsername}` }} />;
};

export default memo(Profile);
