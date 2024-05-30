import React from 'react';
import PropTypes from 'prop-types';
import {KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const Pagination = ({ currentPage, totalPages, onPageChange, nextPage, prevPage }:any) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-3 py-1 mx-1 rounded ${i === currentPage ? 'text-[#f23f51] font-semibold' : 'text-white hover:text-[#f23f51]'}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    }

    if (currentPage - delta > 2) {
      pageNumbers.splice(1, 0, <span key="left-ellipsis" className="mx-1">...</span>);
    }

    if (currentPage + delta < totalPages - 1) {
      pageNumbers.splice(pageNumbers.length - 1, 0, <span key="right-ellipsis" className="mx-1">...</span>);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center my-4">
      <button
        className="px-3 py-1 mx-1 rounded disabled:opacity-50"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        <KeyboardArrowLeft/>
      </button>
      {renderPageNumbers()}
      <button
        className="px-3 py-1 mx-1 rounded disabled:opacity-50"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        <KeyboardArrowRight/>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};

export default Pagination;
