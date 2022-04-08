import React, { useEffect, useState } from "react";
import { useVehicleMakeStore } from "../Stores/VehicleMakeContext";
import { observer } from "mobx-react";
import ReactPaginate from "react-paginate";
import Navigation from "./Navigation";

const VehicleMakeList = observer(() => {
  const vehicleMakeStore = useVehicleMakeStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    vehicleMakeStore.setDefaultValuesMake();
    vehicleMakeStore.getAllVehiclesMake();
  }, [vehicleMakeStore]);
  const submitSearch = (e) => {
    e.preventDefault();
    vehicleMakeStore.searchInput = `WHERE name LIKE '%${search}%'`;
    vehicleMakeStore.getAllVehiclesMake();
  };
  const setRpp = (e) => {
    e.preventDefault();
    vehicleMakeStore.setRppVehicleMake(e.target.value);
    vehicleMakeStore.getAllVehiclesMake();
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    vehicleMakeStore.page = currentPage;
    vehicleMakeStore.getAllVehiclesMake();
  };

  return (
    <>
      <Navigation />
      <h2 className="headerList">List of Vehicle Makes</h2>
      <form className="formSearch" onSubmit={submitSearch}>
        <label>Search by name:</label>
        <input
          type="text"
          className="inputSearch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="searchSubmit" type="submit">
          Search
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Abrv</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vehicleMakeStore.vehicleMake.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.name}</td>
              <td>{vehicle.abrv}</td>
              <td>
                <button className="updateButton">Update</button>
              </td>
              <td>
                <button
                  className="deleteButton"
                  onClick={() => {
                    vehicleMakeStore.deleteVehicleMake(vehicle.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginationContainer">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={Math.ceil(
            vehicleMakeStore.totalVehicleMake / vehicleMakeStore.rpp
          )}
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
        <select
          className="selectForm"
          value={vehicleMakeStore.rpp}
          onChange={setRpp}
          type="text"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </>
  );
});

export default VehicleMakeList;
