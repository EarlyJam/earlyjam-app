import * as ShadPagination from "@/components/ui/pagination";
import { useMemo } from "react";

type PaginationProps = {
  name: string;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function Pagination(props: PaginationProps) {
  const { name, totalPages, currentPage, onPageChange } = props;

  const { pageItems, beforeEllipsis, afterEllipsis } = useMemo(() => {
    if (totalPages <= 3) {
      return {
        pageItems: Array.from({ length: totalPages }, (_, i) => i + 1),
        beforeEllipsis: false,
        afterEllipsis: false,
      };
    }

    let pages: number[] = [];
    if (currentPage === 1) {
      pages = [1, 2, 3];
    } else if (currentPage === totalPages) {
      pages = [currentPage - 2, currentPage - 1, currentPage];
    } else {
      pages = [currentPage - 1, currentPage, currentPage + 1];
    }

    return {
      pageItems: pages,
      beforeEllipsis: currentPage > 2,
      afterEllipsis: currentPage < totalPages - 1,
    };
  }, [currentPage, totalPages]);

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ShadPagination.Pagination>
      <ShadPagination.PaginationContent>
        <ShadPagination.PaginationItem>
          <ShadPagination.PaginationPrevious
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
          />
        </ShadPagination.PaginationItem>
        {beforeEllipsis && (
          <ShadPagination.PaginationItem>
            <ShadPagination.PaginationEllipsis />
          </ShadPagination.PaginationItem>
        )}
        {pageItems.map((pageItem) => (
          <ShadPagination.PaginationItem
            key={`${name}-pagination-item-${pageItem.toString()}`}
          >
            <ShadPagination.PaginationLink
              isActive={currentPage === pageItem}
              onClick={() => onPageChange(pageItem)}
            >
              {pageItem}
            </ShadPagination.PaginationLink>
          </ShadPagination.PaginationItem>
        ))}
        {afterEllipsis && (
          <ShadPagination.PaginationItem>
            <ShadPagination.PaginationEllipsis />
          </ShadPagination.PaginationItem>
        )}
        <ShadPagination.PaginationItem>
          <ShadPagination.PaginationNext
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
          />
        </ShadPagination.PaginationItem>
      </ShadPagination.PaginationContent>
    </ShadPagination.Pagination>
  );
}

export default Pagination;
