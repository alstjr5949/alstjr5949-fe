import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

import ProductList from '../components/ProductList';
import Header from '../components/Header';

import styled from 'styled-components';
import { Product } from '../types/product';

import { getInfProductsData } from '../api/api';

import { useSessionStorage } from 'usehooks-ts';

const InfiniteScrollPage: NextPage = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  const [scrollY, setScrollY] = useSessionStorage('scrollY', 0);

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery<Product[] | undefined>(
    'products',
    async ({ pageParam = 16 }) => {
      return await getInfProductsData(pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(105 / 16);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage * 16 : undefined;
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, [scrollY]);

  return (
    <>
      <Header />
      <Container>
        {status === 'success' && <ProductList products={data.pages[data?.pages.length - 1]} />}
        <Trigger ref={ref}></Trigger>
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

const Trigger = styled.div``;
