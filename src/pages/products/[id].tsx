import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import Header from '../../components/Header';

import styled from 'styled-components';

import { Product } from '../../types/product';

import { commaizeNumber } from '../../utilities';

interface IProductDetail {
  product: Product;
}

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const getProductDetail = async (id: string | string[] | undefined) => {
    try {
      const productData = await axios.get(`/products/${id}`);
      return productData.data.data;
    } catch (error) {}
  };

  const { data: productDetail } = useQuery<IProductDetail>(['productDatail', id], () =>
    getProductDetail(id)
  );
  return (
    <>
      <Header />
      {productDetail ? (
        <>
          <Thumbnail
            src={
              productDetail.product.thumbnail
                ? productDetail.product.thumbnail
                : '/defaultThumbnail.jpg'
            }
          />
          <ProductInfoWrapper>
            <Name>{productDetail.product.name}</Name>
            <Price>{commaizeNumber(productDetail.product.price)}원</Price>
          </ProductInfoWrapper>
        </>
      ) : (
        <Wrapper>존재하지 않는 상품입니다.</Wrapper>
      )}
    </>
  );
};

export default ProductDetailPage;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;

const Wrapper = styled.div`
  height: 420px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
