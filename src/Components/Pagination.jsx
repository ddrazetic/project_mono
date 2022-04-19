import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({
  rpp,
  setRpp,
  setOrder,
  totalNumber,
  handlePageClick,
  order,
}) => {
  return (
    <div className="paginationContainer">
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={Math.ceil(totalNumber / rpp)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination "}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"page-item-active"}
      />
      <select className="selectForm" value={rpp} onChange={setRpp} type="text">
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
      <button className="buttonOrder" onClick={() => setOrder()}>
        {order ? "ASC" : "DESC"}
      </button>
    </div>
  );
};

export default Pagination;
