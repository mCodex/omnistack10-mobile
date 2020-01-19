import React, { useEffect, memo, useState, useCallback } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geolocation from '@react-native-community/geolocation';
import { ActivityIndicator } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

import api from '../../services/api';

import {
  Map,
  Avatar,
  CalloutContainer,
  DevName,
  DevBio,
  DevTechs,
  SearchForm,
  SearchInput
} from './styles';

const Home = ({ navigation }) => {
  const [currentRegion, setCurrentRegion] = useState();
  const [devs, setDevs] = useState([]);

  const loadDevs = useCallback(async () => {
    const { latitude, longitude } = currentRegion;
    const { data } = await api.get('search', {
      params: {
        latitude,
        longitude,
        techs: 'React'
      }
    });

    return setDevs(data);
  }, [currentRegion]);

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
    if (!currentRegion) {
      return;
    }
    loadDevs();
  }, [currentRegion]); //eslint-disable-line

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
        />
      </SearchForm>
    </KeyboardAwareScrollView>
  );
};

export default memo(Home);
