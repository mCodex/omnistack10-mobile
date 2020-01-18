import React, { memo, useState, useEffect } from 'react';

import api from './services/api';

import DevCard from './components/DevCard';
import DevForm from './components/DevForm';

import { Container, Aside, FormTitle, Main, List } from './styles';

const App = () => {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    const loadDevs = async () => {
      const response = await api.get('devs');
      return setDevs(response.data);
    };

    loadDevs();
  }, [devs]);

  const handleFormOnSubmit = async values => {
    const response = await api.post('devs', values);
    return setDevs([...devs, response.data]);
  };

  return (
    <Container>
      <Aside>
        <FormTitle>Cadastrar</FormTitle>
        <DevForm onSubmit={handleFormOnSubmit} />
      </Aside>
      <Main>
        <List>
          {devs.map(dev => (
            <DevCard dev={dev} key={dev._id} />
          ))}
        </List>
      </Main>
    </Container>
  );
};

export default memo(App);
