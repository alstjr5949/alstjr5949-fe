import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const usePagination = () => {
  const router = useRouter();
  const { page } = router.query;

  const [pageNumArr, setPageNumArr] = useState<number[]>([]);

  const prevButtonClick = () => {
    if (Number(page) <= 10) {
      router.push(`/pagination?page=5`);
    } else if (Number(page) <= 15) {
      router.push(`/pagination?page=10`);
    }
  };

  const nextButtonClick = () => {
    if (Number(page) < 6) {
      router.push(`/pagination?page=6`);
    } else if (Number(page) < 11) {
      router.push(`/pagination?page=11`);
    }
  };

  const pageButtonClick = (pageNum: number) => {
    router.push(`/pagination?page=${pageNum}`);
  };

  useEffect(() => {
    if (Number(page) <= 5) {
      setPageNumArr([1, 2, 3, 4, 5]);
    } else if (Number(page) <= 10) {
      setPageNumArr([6, 7, 8, 9, 10]);
    } else if (Number(page) <= 15) {
      setPageNumArr([11]);
    }
  }, [page]);

  return { pageNumArr, prevButtonClick, nextButtonClick, pageButtonClick };
};

export default usePagination;
