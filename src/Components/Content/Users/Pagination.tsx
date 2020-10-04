import React, { useState } from "react";

type PropsType = {
  totalCount: number;
  pageSize: number;
  changePage: (page: number) => void;
  currentPage: number;
};
export default function Pagination({
  totalCount,
  pageSize,
  changePage,
  currentPage,
}: PropsType) {
  let pages:Array<number> = [];
  let pagesCount: number = Math.ceil(totalCount / pageSize); //числа страниц = общее число пользователей / размер обной страницы (20 шт)
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionSize = 9; // отображаемое подряд колличество страниц
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionNumber = portionSize * portionNumber;

  let pagination = (
    <div>
      {portionNumber > 1 && (
        <button
          id="skipBTN"
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          {"<<"}
        </button>
      )}
      {pages
        .filter(
          (page) => page >= leftPortionNumber && page <= rightPortionNumber
        )
        .map((page) => (
          <button
            key={page}
            onClick={() => {
              changePage(page);
            }}
            id={currentPage === page ? "currentPage" : undefined}
          >
            {page}
          </button>
        ))}
      {portionCount > portionNumber && (
        <button
          id="skipBTN"
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          {">>"}
        </button>
      )}
    </div>
  );
  return <div id="pagination">{pagination}</div>;
}
