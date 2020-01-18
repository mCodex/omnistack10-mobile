import React, { useEffect, memo } from 'react';
import Geolocation from '@react-native-community/geolocation';

import { Map } from './styles';

const Home = () => {
  useEffect(() => {
    const test = Geolocation.requestAuthorization();
    // console.log(test);
    Geolocation.getCurrentPosition(
      info => console.log(info),
      error => console.log(error),
      { enableHighAccuracy: true }
    );
  }, []);

  return <Map />;
};

export default memo(Home);
