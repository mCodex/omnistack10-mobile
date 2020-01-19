import { View, Image, Text, TextInput } from 'react-native';
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

export const SearchForm = styled(View)({
  position: 'absolute',
  bottom: 20,
  left: 20,
  right: 20,
  zIndex: 5,
  flexDirection: 'row'
});

export const SearchInput = styled(TextInput)({
  flex: 1,
  height: 50,
  backgroundColor: '#fff',
  color: '#333',
  borderRadius: 25,
  paddingHorizontal: 20,
  fontSize: 16,
  boxShadow: '4px 4px #000',
  shadowOpacity: 0.2,
  elevation: 1
});
