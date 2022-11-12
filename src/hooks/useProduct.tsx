import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Product } from '../types/product';

interface IProducts {
  data: {
    products: Product[];
  };
}

const useProduct = () => {
  const router = useRouter();
  const { page } = router.query;

  const getProductData = async (pageNum: string | string[] | undefined, size?: number) => {
    try {
      const res = await axios.get(`/products?page=${pageNum}&size=${size}`);
      return res.data;
    } catch (error) {}
  };

  const { data: productData } = useQuery<IProducts>(['productData', page], () =>
    getProductData(page ? page : undefined, 10)
  );

  return { productData };
};

export default useProduct;
