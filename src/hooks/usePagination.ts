import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface UsePaginationProps {
  totalPageCount?: number;
  defaultPageSize?: number;
}

export const usePagination = ({
  totalPageCount = 1,
  defaultPageSize = 9,
}: UsePaginationProps = {}) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(totalPageCount);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const pageParam = router.query.pagenumber;
    const sizeParam = router.query.pagesize;

    if (typeof pageParam === "string") {
      const parsed = parseInt(pageParam);
      if (!isNaN(parsed) && parsed > 0) {
        setCurrentPage(parsed - 1);
      }
    }

    if (typeof sizeParam === "string") {
      const parsed = parseInt(sizeParam);
      if (!isNaN(parsed) && parsed > 0) {
        setPageSize(parsed);
      }
    }

    setIsReady(true);
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;

    const query = {
      ...router.query,
      pagenumber: (currentPage + 1).toString(),
      pagesize: pageSize.toString(),
    };

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  }, [currentPage, pageSize, router.isReady]);

  const pagesAsArray = Array(totalPage)
    .fill(0)
    .map((_, i) => i);

  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage === isPaginationLongEnough().slice(-1)[0];

  function setPreviousPage() {
    if (!isPrevDisabled) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function setNextPage() {
    if (!isNextDisabled) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function setClickedPage(number: number) {
    setCurrentPage(number);
  }

  function isPaginationLongEnough() {
    if (totalPage > 6) {
      if (totalPage / 2 >= currentPage) {
        return [
          ...pagesAsArray.slice(
            currentPage === 0 ? currentPage : currentPage - 1,
            currentPage + 3
          ),
          "...",
          ...pagesAsArray.slice(-1),
        ];
      }
      if (totalPage / 2 <= currentPage) {
        return [
          ...pagesAsArray.slice(0, 1),
          "...",
          ...pagesAsArray.slice(currentPage - 1, currentPage + 3),
        ];
      }
    }

    return pagesAsArray;
  }

  return {
    currentPage,
    pageSize,
    setNextPage,
    setPreviousPage,
    isPaginationLongEnough,
    setClickedPage,
    isPrevDisabled,
    isNextDisabled,
    setTotalPage,
    isReady,
  };
};
