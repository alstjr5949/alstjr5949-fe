import Link from 'next/link';
import styled from 'styled-components';

import { Product } from '../types/product';
import { commaizeNumber } from '../utilities';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { id, name, thumbnail, price } }: ProductItemProps) => (
  <Link href={`/products/${id}`}>
    <Container>
      <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
      <Name>{name}</Name>
      <Price>{commaizeNumber(price)}</Price>
    </Container>
  </Link>
);

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
