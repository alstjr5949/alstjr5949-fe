import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';

import { useSessionStorage } from 'usehooks-ts';

import { getUserData } from '../api/api';

import styled from 'styled-components';

interface IUser {
  data: {
    user: {
      ID: string;
      NAME: string;
    };
  };
}

const Header = () => {
  const [userID, setUserID] = useSessionStorage('userID', '');

  const logoutButtonClick = () => {
    setUserID('');
    return;
  };

  const { isLoading, data: userData } = useQuery<IUser>(['userID', userID], () =>
    getUserData(userID ? userID : '')
  );
  return (
    <>
      {isLoading ? (
        '로딩 컴포넌트'
      ) : (
        <StyledHeader>
          <Link href='/'>
            <Title>HAUS</Title>
          </Link>
          {userData?.data.user.NAME ? (
            <LoginLogoutButtonCont>
              <Link href='/'>
                <AnchorText>{userData.data.user.NAME}</AnchorText>
              </Link>
              <LogoutBtn type='button' onClick={logoutButtonClick}>
                logout
              </LogoutBtn>
            </LoginLogoutButtonCont>
          ) : (
            <Link href='/login'>
              <AnchorText>login</AnchorText>
            </Link>
          )}
        </StyledHeader>
      )}
    </>
  );
};

export default React.memo(Header);

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  cursor: pointer;
  font-size: 48px;
`;

const LoginLogoutButtonCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const AnchorText = styled.a`
  cursor: pointer;
`;

const LogoutBtn = styled.button``;
