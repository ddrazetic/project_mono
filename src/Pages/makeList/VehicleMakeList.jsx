import React, { useEffect } from "react";
import { useStores } from "../../Stores/StoresContex";
import { observer } from "mobx-react";
// import ReactPaginate from "react-paginate";
import Navigation from "../../Components/Navigation.jsx";
import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";
import List from "../../Components/List";
import Pagination from "../../Components/Pagination";

const VehicleMakeList = observer(() => {
  const { makeListStore } = useStores();
  // const navigate = useNavigate();

  useEffect(() => {
    makeListStore.initialRun();
  }, [makeListStore]);
  Modal.setAppElement("#root");

  return (
    <>
      <Navigation />
      <h2 className="headerList">List of Vehicle Makes</h2>
      <form className="formSearch" onSubmit={makeListStore.submitSearch}>
        <label>Search by name:</label>
        <input
          type="text"
          className="inputSearch"
          value={makeListStore.search}
          onChange={(e) => makeListStore.setSearch(e.target.value)}
        />
        <button className="searchSubmit" type="submit">
          Search
        </button>
      </form>

      <div className="containerTable">
        <List
          data={makeListStore.vehicleMake}
          openModalDelete={makeListStore.openModalDelete}
          update={makeListStore.setCurrentMake}
          pathToUpdate={"updatevehiclemake"}
          modelTable={false}
          setSelectedName={makeListStore.setSelectedName}
        />
        <Pagination
          totalNumber={makeListStore.totalVehicleMake}
          rpp={makeListStore.rpp}
          handlePageClick={makeListStore.handlePageClick}
          setRpp={makeListStore.setRpp}
          setOrder={makeListStore.setOrder}
          order={makeListStore.order}
        />
      </div>
      <Modal
        isOpen={makeListStore.modalIsOpen}
        onRequestClose={makeListStore.closeModal}
        style={makeListStore.customStyles}
        contentLabel="Example Modal"
      >
        <button className="buttonClose" onClick={makeListStore.closeModal}>
          X
        </button>
        <h2 className="headerEdit">Are you sure to delete this Make?</h2>
        <div className="buttonsContainer">
          <button className="buttonDelete" onClick={makeListStore.deleteMake}>
            Yes
          </button>
          <button className="buttonDelete" onClick={makeListStore.closeModal}>
            No
          </button>
        </div>
      </Modal>
    </>
  );
});

export default VehicleMakeList;

/* <div className="containerTable">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Abrv</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {makeListStore.vehicleMake.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.name}</td>
                <td>{vehicle.abrv}</td>
                <td>
                  <button
                    onClick={() => {
                      makeListStore.setCurrentMake(
                        vehicle.id,
                        vehicle.name,
                        vehicle.abrv
                      );
                      navigate("/updatevehiclemake");
                    }}
                    className="updateButton"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={() => makeListStore.openModalDelete(vehicle.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      makeListStore.setSelectedName(vehicle.id, vehicle.name);
                      navigate("/createvehiclemodel");
                    }}
                    className="updateButton"
                  >
                    Create Models
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      makeListStore.setSelectedName(vehicle.id, vehicle.name);
                      navigate("/vehiclemodel");
                    }}
                    className="updateButton"
                  >
                    Models -&gt;
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
              makeListStore.totalVehicleMake / makeListStore.rpp
            )}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={makeListStore.handlePageClick}
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
            value={makeListStore.rpp}
            onChange={makeListStore.setRpp}
            type="text"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <button
            className="buttonOrder"
            onClick={() => makeListStore.setOrder()}
          >
            {makeListStore.order ? "ASC" : "DESC"}
          </button>
        </div>
      </div> */
