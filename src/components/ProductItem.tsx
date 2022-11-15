import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import styled from 'styled-components';

import { Product } from '../types/product';

import { commaizeNumber } from '../utilities';

import { useSessionStorage } from 'usehooks-ts';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { id, name, thumbnail, price } }: ProductItemProps) => {
  const [scrollY, setScrollY] = useSessionStorage('scrollY', 0);
  return (
    <Link href={`/products/${id}`}>
      <Container onClick={() => setScrollY(window.pageYOffset)}>
        <LazyLoadImage src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
        <Name>{name}</Name>
        <Price>{commaizeNumber(price)}</Price>
      </Container>
    </Link>
  );
};

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
  cursor: pointer;
  & img {
    width: 100%;
    height: 180px;
  }
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
