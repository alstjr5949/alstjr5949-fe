import React from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import usePagination from '../hooks/usePagination';
import { useRouter } from 'next/router';

const Pagination = () => {
  const router = useRouter();
  const { page } = router.query;

  const { pageNumArr, prevButtonClick, pageButtonClick, nextButtonClick } = usePagination();

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
      <Button onClick={nextButtonClick} disabled={page === '11' ? true : false}>
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
