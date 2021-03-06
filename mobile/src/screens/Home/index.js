import React, { useEffect, memo, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geolocation from '@react-native-community/geolocation';
import { Marker, Callout } from 'react-native-maps';

import api from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';

import {
  Map,
  Avatar,
  CalloutContainer,
  DevName,
  DevBio,
  DevTechs,
  SearchForm,
  SearchInput,
  SearchButton
} from './styles';

const Home = ({ navigation }) => {
  const [currentRegion, setCurrentRegion] = useState();
  const [devs, setDevs] = useState([]);
  const [techsInput, setTechsInput] = useState('');

  const setupWebSocket = () => {
    disconnect();

    const { latitude, longitude } = currentRegion;
    return connect(latitude, longitude, techsInput);
  };

  const loadDevs = async () => {
    const { latitude, longitude } = currentRegion;
    const { data } = await api.get('search', {
      params: {
        latitude,
        longitude,
        techs: techsInput
      }
    });

    setDevs(data);
    return setupWebSocket();
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        return setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  const handleRegionChanged = region => {
    return setCurrentRegion(region);
  };

  if (!currentRegion) {
    return <ActivityIndicator />;
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Map initialRegion={currentRegion} onRegionChangeComplete={handleRegionChanged}>
        {devs.map(
          ({
            _id,
            githubUsername,
            name,
            avatarUrl,
            bio,
            techs,
            location: {
              coordinates: [longitude, latitude]
            }
          }) => (
            <Marker coordinate={{ latitude, longitude }} key={_id}>
              <Avatar source={{ uri: avatarUrl }} />
              <Callout onPress={() => navigation.navigate('Profile', { githubUsername })}>
                <CalloutContainer>
                  <DevName>{name}</DevName>
                  <DevBio>{bio}</DevBio>
                  <DevTechs>{techs}</DevTechs>
                </CalloutContainer>
              </Callout>
            </Marker>
          )
        )}
      </Map>
      <SearchForm>
        <SearchInput
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techsInput}
          onChangeText={setTechsInput}
        />
        <SearchButton onPress={loadDevs}>
          <FontAwesome5 name="location-arrow" color="#fff" size={16} />
        </SearchButton>
      </SearchForm>
    </KeyboardAwareScrollView>
  );
};

export default memo(Home);
