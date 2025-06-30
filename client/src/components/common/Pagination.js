import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Dashboard.module.css';

const Pagination = ({
    currentPage = 1,
    totalPages = 9,
    itemsPerPage = 10,
    onPageChange,
    onItemsPerPageChange
}) => {
    const handlePreviousPage = () => {
        if (currentPage > 1 && onPageChange) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages && onPageChange) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        if (onPageChange) {
            onPageChange(page);
        }
    };

    const handleItemsPerPageChange = (event) => {
        if (onItemsPerPageChange) {
            onItemsPerPageChange(parseInt(event.target.value, 10));
        }
    };

    return (
        <div className={styles.pagination}>
            {/* Items per page dropdown */}
            <div className={styles.itemsPerPageContainer}>
                <select
                    id="items-per-page-selector"
                    className={styles.itemsPerPageSelect}
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                    <option value="50">50 per page</option>
                </select>
                <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.selectArrow}
                >
                    <path d="M1 1L6 6L11 1" stroke="#212B36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* Pagination buttons */}
            <div className={styles.paginationButtons}>
                {/* Previous button */}
                <button
                    id="pagination-previous"
                    className={styles.paginationButton}
                    onClick={handlePreviousPage}
                    disabled={currentPage <= 1}
                >
                    <svg width="16.765" height="16.765" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="#C4CDD5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Page 1 */}
                <button
                    id="pagination-page-1"
                    className={`${styles.paginationButton} ${currentPage === 1 ? styles.active : ''}`}
                    onClick={() => handlePageClick(1)}
                >
                    1
                </button>

                {/* Page 2 */}
                <button
                    id="pagination-page-2"
                    className={`${styles.paginationButton} ${currentPage === 2 ? styles.active : ''}`}
                    onClick={() => handlePageClick(2)}
                >
                    2
                </button>

                {/* Ellipsis */}
                <button
                    id="pagination-ellipsis"
                    className={`${styles.paginationButton} ${styles.paginationEllipsis}`}
                    disabled
                >
                    ...
                </button>

                {/* Page 8 */}
                <button
                    id="pagination-page-8"
                    className={`${styles.paginationButton} ${currentPage === 8 ? styles.active : ''}`}
                    onClick={() => handlePageClick(8)}
                >
                    8
                </button>

                {/* Page 9 */}
                <button
                    id="pagination-page-9"
                    className={`${styles.paginationButton} ${currentPage === 9 ? styles.active : ''}`}
                    onClick={() => handlePageClick(9)}
                >
                    9
                </button>

                {/* Next button */}
                <button
                    id="pagination-next"
                    className={styles.paginationButton}
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                >
                    <svg width="16.765" height="16.765" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="#C4CDD5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    itemsPerPage: PropTypes.number,
    onPageChange: PropTypes.func,
    onItemsPerPageChange: PropTypes.func
};

export default Pagination;
