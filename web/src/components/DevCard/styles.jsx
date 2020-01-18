import styled from 'styled-components';

export const ListItem = styled.li`
  width: 100%;
  background: #fff;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 20px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
`;

export const UserInfo = styled.div`
  margin-left: 10px;
`;

export const UserName = styled.strong`
  display: block;
  font-size: 16px;
  color: #333;
`;

export const Techs = styled.span`
  font-size: 13px;
  color: #999;
  margin-top: 2px;
`;

export const Bio = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 20px;
  margin: 10px 0px;
`;

export const GithubLink = styled.a`
  color: #8e4dff;
  font-size: 14px;
  text-decoration: none;

  :hover {
    color: #5a2ea6;
  }
`;
