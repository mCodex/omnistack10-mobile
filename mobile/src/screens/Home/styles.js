import { View, Image, Text } from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components';

export const Map = styled(MapView)({
  flex: 1
});

export const Avatar = styled(Image)({
  width: 54,
  height: 54,
  borderRadius: 4,
  borderWidth: 4,
  borderColor: '#fff'
});

export const CalloutContainer = styled(View)({
  width: 260
});

export const DevName = styled(Text)({
  fontWeight: 'bold',
  fontSize: 16
});

export const DevBio = styled(Text)({
  color: '#666',
  marginTop: 5
});

export const DevTechs = styled(Text)({
  marginTop: 5
});
