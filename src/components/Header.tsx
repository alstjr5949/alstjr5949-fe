import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userDataAtom } from '../atoms/atom';

interface IUser {
  data: {
    user: {
      ID: string;
      NAME: string;
    };
  };
}

const Header = () => {
  const user = useRecoilValue(userDataAtom);

  const userID = user.data.user.ID;

  const getUserData = async (userID: string) => {
    try {
      const res = await axios.get(`/users/${userID}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
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
              <LogoutBtn type='button'>logout</LogoutBtn>
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
