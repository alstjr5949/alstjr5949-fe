import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
import useProduct from '../hooks/useProduct';

const PaginationPage: NextPage = () => {
  const { productData } = useProduct();

  return (
    <>
      <Header />
      <Container>
        <ProductList products={productData?.data.products} />
        <Pagination />
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
