import React, { useEffect, memo, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { ActivityIndicator } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import axios from '../../services/api';

import { Map, Avatar, CalloutContainer, DevName, DevBio, DevTechs } from './styles';

const Home = ({ navigation }) => {
  const [currentRegion, setCurrentRegion] = useState();
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        const { data } = await axios.get('devs');
        setDevs(data);
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

  if (!currentRegion) {
    return <ActivityIndicator />;
  }
  console.log(devs);
  return (
    <Map initialRegion={currentRegion}>
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
  );
};

export default memo(Home);
