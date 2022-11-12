import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Header from '../components/Header';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { Product } from '../types/product';
import { useInView } from 'react-intersection-observer';

const InfiniteScrollPage: NextPage = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  const getInfProductsData = async (page: number) => {
    const res = await axios.get(`/products?page=1&size=${page}`);
    return res.data.data.products;
  };

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery<Product[] | undefined>(
    'products',
    async ({ pageParam = 10 }) => {
      return await getInfProductsData(pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = 11;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage * 10 : undefined;
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <Header />
      <Container>
        {status === 'success' && <ProductList products={data.pages[data?.pages.length - 1]} />}
        <div ref={ref}></div>
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
