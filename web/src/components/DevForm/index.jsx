/* @flow */
import React, { useState, useEffect, memo } from 'react';
import { Formik } from 'formik';

import { InputBlock, InputGroup, Label, Input, Form, Button } from './styles';

const formInput = [
  {
    label: 'Usuário do Github',
    name: 'githubUsername'
  },
  {
    label: 'Tecnologias',
    name: 'techs'
  }
];

const locationInput = [
  {
    label: 'Latitude',
    name: 'latitude'
  },
  {
    label: 'Longitude',
    name: 'longitude'
  }
];

type Props = {
  onSubmit: Function
};

const DevForm = ({ onSubmit }: Props) => {
  const [coords, setCoords] = useState({ latitude: '', longitude: '' });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        return setCoords({ latitude, longitude });
      },
      error => {
        console.log(error);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  const handleFormSubmit = async (values, { resetForm }) => {
    await onSubmit(values);
    return resetForm();
  };

  return (
    <Formik
      initialValues={{
        githubUsername: '',
        techs: '',
        latitude: coords.latitude,
        longitude: coords.longitude
      }}
      enableReinitialize
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          {formInput.map(({ label, name }, i) => (
            <InputBlock key={i} style={{ marginTop: i > 0 ? 20 : 0 }}>
              <Label htmlFor={name}>{label}</Label>
              <Input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[name]}
                name={name}
              />
              {errors[name] && touched[name] && <div id="feedback">{errors[name]}</div>}
            </InputBlock>
          ))}

          <InputGroup>
            {locationInput.map(({ label, name }, i) => (
              <InputBlock key={i}>
                <Label htmlFor={name}>{label}</Label>
                <Input
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[name]}
                  name={name}
                />
                {errors[name] && touched[name] && <div id="feedback">{errors[name]}</div>}
              </InputBlock>
            ))}
          </InputGroup>

          <Button type="submit">Salvar</Button>
        </Form>
      )}
    </Formik>
  );
};

export default memo(DevForm);
