import type { NextPage } from 'next';
import React from 'react';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import Header from '../components/Header';

import styled from 'styled-components';

import useProduct from '../hooks/useProduct';

const PaginationPage: NextPage = () => {
  const { productData, totalProductNum } = useProduct();

  return (
    <>
      <Header />
      <Container>
        <ProductList products={productData?.data.products} />
        <Pagination productNum={totalProductNum} />
      </Container>
    </>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
