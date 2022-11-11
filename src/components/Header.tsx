import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

interface IUser {
  data: {
    user: {
      ID: string;
      NAME: string;
    };
  };
}

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const Header = () => {
  const router = useRouter();

  const userSessionData = sessionStorage ? sessionStorage.getItem('data') : '';
  const userSessionDataJSON = userSessionData
    ? JSON.parse(userSessionData ? userSessionData : '')
    : '';

  const userID = userSessionDataJSON ? userSessionDataJSON.userData['data']['user']['ID'] : '';

  const getUserData = async (userID: string) => {
    try {
      const res = await axios.get(`/users/${userID}`);
      return res.data;
    } catch (error) {}
  };

  const logoutButtonClick = () => {
    if (sessionStorage) {
      sessionStorage.removeItem('data');
      router.push('/');
    }
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
