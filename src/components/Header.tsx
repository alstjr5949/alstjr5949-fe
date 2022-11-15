import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import styled from 'styled-components';
import { useSessionStorage } from 'usehooks-ts';

interface IUser {
  data: {
    user: {
      ID: string;
      NAME: string;
    };
  };
}

const Header = () => {
  const router = useRouter();

  const [userID, setUserID] = useSessionStorage('userID', '');

  const getUserData = async (userID: string) => {
    try {
      const res = await axios.get(`/users/${userID}`);
      return res.data;
    } catch (error) {}
  };

  const logoutButtonClick = () => {
    setUserID('');
    router.push('/');
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
