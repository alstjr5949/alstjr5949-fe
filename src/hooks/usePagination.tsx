import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const usePagination = (productNum: number, limit: number) => {
  const router = useRouter();
  const { page } = router.query;

  const pagePerProduct = 10;

  const totalPage = Math.ceil(productNum / pagePerProduct);
  const pageIndex = Math.ceil(Number(page) / limit);
  const offset = (pageIndex - 1) * limit;

  const [pageNumArr, setPageNumArr] = useState<number[]>([]);

  const prevButtonClick = () => {
    if (Number(page) <= 10) {
      router.push(`/pagination?page=5`);
    } else if (Number(page) <= totalPage) {
      router.push(`/pagination?page=10`);
    }
  };

  const nextButtonClick = () => {
    if (Number(page) < 6) {
      router.push(`/pagination?page=6`);
    } else if (Number(page) < totalPage) {
      router.push(`/pagination?page=11`);
    }
  };

  const pageButtonClick = (pageNum: number) => {
    router.push(`/pagination?page=${pageNum}`);
  };

  useEffect(() => {
    const newNumArr = Array(totalPage)
      .fill(0)
      .map((_, i) => i + 1)
      .slice(offset, offset + limit);
    setPageNumArr(newNumArr);
  }, [limit, offset, totalPage]);

  return { pageNumArr, totalPage, prevButtonClick, nextButtonClick, pageButtonClick };
};

export default usePagination;
