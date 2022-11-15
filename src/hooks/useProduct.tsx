import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getProductsData } from '../api/api';
import { Product } from '../types/product';

interface IProducts {
  data: {
    products: Product[];
    totalCount: number;
  };
}

const useProduct = () => {
  const router = useRouter();
  const { page } = router.query;

  const [totalProductNum, setTotalProductNum] = useState<number>(0);

  const { data: productData } = useQuery<IProducts>(['productData', page], () =>
    getProductsData(page ? page : undefined, 10)
  );

  useEffect(() => {
    setTotalProductNum(productData ? productData.data.totalCount : 0);
  }, [productData]);

  return { productData, totalProductNum };
};

export default useProduct;
