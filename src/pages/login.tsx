import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { FieldErrors, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userDataAtom } from '../atoms/atom';
import Header from '../components/Header';

interface ILoginForm {
  userId: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const setUserData = useSetRecoilState(userDataAtom);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onValid = async (data: ILoginForm) => {
    try {
      const res = await axios.post('/login', {
        id: data.userId,
        password: data.password,
      });
      setUserData(res.data);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <>
      <Header />
      <Form onSubmit={handleSubmit(onValid, onInvalid)}>
        <InputBox>
          <Label htmlFor='userId'>아이디</Label>
          <TextInput
            {...register('userId', {
              required: '필수 입력 요소입니다.',
              pattern: {
                message: '올바른 아이디 형식으로 입력해주세요.',
                value: /^\w{5,30}$/,
              },
              minLength: {
                message: '5글자 이상 입력해주세요.',
                value: 5,
              },
              maxLength: {
                message: '30글자 이하로 입력해주세요.',
                value: 30,
              },
            })}
            id='userId'
            type='text'
            className={Boolean(errors.userId?.message) ? 'error' : ''}
          />
          <ErrorText>{errors.userId?.message}</ErrorText>
        </InputBox>
        <InputBox>
          <Label htmlFor='password'>비밀번호</Label>
          <TextInput
            {...register('password', {
              required: '필수 입력 요소입니다.',
              pattern: {
                message: '올바른 비밀번호 형식으로 입력해주세요.',
                value: /^\w{5,30}$/,
              },
              minLength: {
                message: '8글자 이상 입력해주세요.',
                value: 8,
              },
              maxLength: {
                message: '30글자 이하로 입력해주세요.',
                value: 30,
              },
            })}
            id='password'
            type='password'
            className={Boolean(errors.password?.message) ? 'error' : ''}
          />
        </InputBox>
        <ErrorText>{errors.password?.message}</ErrorText>
        <LoginButton
          type='submit'
          disabled={Boolean(errors.password?.message || errors.userId?.message) ? true : false}
        >
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 0 20px 40px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
  margin-top: 16px;
`;

const TextInput = styled.input`
  margin-top: 8px;
  padding: 16px;
  background-color: #f7f7fa;
  border-radius: 12px;
  border: none;
  &.error {
    background-color: #fdedee;
  }
`;

const ErrorText = styled.p`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  cursor: pointer;
  &:disabled {
    background-color: #e2e2ea;
    cursor: default;
  }
`;
