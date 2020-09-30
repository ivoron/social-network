import React, { useState } from "react";

export default function Pagination(props) {
  let pages = [];
  let pagesCount = Math.ceil(props.totalCount / props.pageSize); //числа страниц = общее число пользователей / размер обной страницы (20 шт)
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
              props.changePage(page);
            }}
            id={props.currentPage === page ? "currentPage" : null}
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
