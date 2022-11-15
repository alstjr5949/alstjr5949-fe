import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import usePagination from '../hooks/usePagination';

import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

interface PaginationProps {
  productNum: number;
}

const Pagination = ({ productNum }: PaginationProps) => {
  const router = useRouter();
  const { page } = router.query;

  const pageLimit = 5;

  const { pageNumArr, totalPage, prevButtonClick, pageButtonClick, nextButtonClick } =
    usePagination(productNum, pageLimit);

  return (
    <Container>
      <Button onClick={prevButtonClick} disabled={page === '1' ? true : false}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pageNumArr.map((pageNum) => (
          <Page
            onClick={() => pageButtonClick(pageNum)}
            key={pageNum}
            selected={pageNum === Number(page)}
            disabled={pageNum === Number(page)}
          >
            {pageNum}
          </Page>
        ))}
      </PageWrapper>
      <Button onClick={nextButtonClick} disabled={page === `${totalPage}` ? true : false}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
