import React from "react";

type PaginationProps = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ current, total, onChange }) => (
  <div className="pagination">
    <button disabled={current === 1} onClick={() => onChange(current - 1)}>
      {"<"}
    </button>
    <span>
      {current} / {total}
    </span>
    <button disabled={current === total} onClick={() => onChange(current + 1)}>
      {">"}
    </button>
  </div>
);

export default Pagination;
