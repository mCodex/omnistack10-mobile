/* @flow */

import React, { memo } from 'react';

import { ListItem, Avatar, UserInfo, UserName, Techs, Bio, Header, GithubLink } from './styles';

type Dev = {
  name: string,
  avatarUrl: string,
  githubUsername: string,
  bio: string,
  techs: Array<string>
};

type Props = {
  dev: Array<Dev>
};

const DevCard = ({ dev: { name, avatarUrl, githubUsername, bio, techs } }: Props) => {
  return (
    <ListItem>
      <Header>
        <Avatar src={avatarUrl} alt={name} />
        <UserInfo>
          <UserName>{name}</UserName>
          <Techs>{techs.join(', ')}</Techs>
        </UserInfo>
      </Header>
      <Bio>{bio}</Bio>
      <GithubLink href={`https://github.com/${githubUsername}`} target="_blank">
        Acessar perfil no Github
      </GithubLink>
    </ListItem>
  );
};

export default memo(DevCard);
