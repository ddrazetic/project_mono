import React, { useEffect } from "react";
import { useStores } from "../../Stores/StoresContex";
import { observer } from "mobx-react";
import Navigation from "../../Components/Navigation.jsx";
import Modal from "react-modal";
// import ReactPaginate from "react-paginate";
// import { useNavigate } from "react-router-dom";
import List from "../../Components/List";
import Pagination from "../../Components/Pagination";
const VehicleModelList = observer(() => {
  const { modelListStore } = useStores();
  // const navigate = useNavigate();
  Modal.setAppElement("#root");

  useEffect(() => {
    modelListStore.initialRun();
  }, [modelListStore]);

  return (
    <>
      <Navigation />
      <h2 className="headerList blueheader">List of Vehicle Models</h2>
      <form className="formSearch formSearchBlue">
        <label>Search by Make:</label>
        <select
          type="text"
          className="inputSearch"
          value={modelListStore.search}
          onChange={modelListStore.onChangeSearch}
        >
          {" "}
          <option value={""}>all Models</option>
          {modelListStore.vehicleMake.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {" "}
              {vehicle.name}
            </option>
          ))}
        </select>
      </form>
      <div className="containerTable">
        <List
          data={modelListStore.vehicleModel}
          data1={modelListStore.vehicleMake}
          openModalDelete={modelListStore.openModalDelete}
          update={modelListStore.setCurrentModel}
          pathToUpdate={"updatevehiclemodel"}
          modelTable={true}
          styleClass={"tableBlue"}
        />
        <Pagination
          totalNumber={modelListStore.totalVehicleModel}
          rpp={modelListStore.rppModel}
          handlePageClick={modelListStore.handlePageClick}
          setRpp={modelListStore.setRpp}
          setOrder={modelListStore.setOrderModel}
          order={modelListStore.orderModel}
        />
      </div>
      <Modal
        isOpen={modelListStore.modalIsOpen}
        onRequestClose={modelListStore.closeModal}
        style={modelListStore.customStyles}
        contentLabel="Example Modal"
      >
        <button className="buttonClose" onClick={modelListStore.closeModal}>
          X
        </button>
        <h2 className="headerEdit">Are you sure to delete this Model?</h2>
        <div className="buttonsContainer">
          <button className="buttonDelete" onClick={modelListStore.deleteModel}>
            Yes
          </button>
          <button className="buttonDelete" onClick={modelListStore.closeModal}>
            No
          </button>
        </div>
      </Modal>
    </>
  );
});

export default VehicleModelList;

/* <div className="containerTable">
<table className="table tableBlue">
  <thead>
    <tr>
      <th>Name</th>
      <th>Abrv</th>
      <th>MAKE</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {modelListStore.vehicleModel.map((vehicle) => (
      <tr key={vehicle.id}>
        <td>{vehicle.name}</td>
        <td>{vehicle.abrv}</td>
        <td>
          {modelListStore.vehicleMake.map((vehicleM) => {
            if (vehicleM.id === vehicle.makeId) return vehicleM.name;
            else return null;
          })}
        </td>
        <td>
          <button
            onClick={() => {
              modelListStore.setCurrentModel(
                vehicle.id,
                vehicle.name,
                vehicle.abrv,
                vehicle.makeId
              );
              navigate("/updatevehiclemodel");
            }}
            className="updateButton"
          >
            Update
          </button>
        </td>
        <td>
          <button
            className="deleteButton"
            onClick={() => modelListStore.openModalDelete(vehicle.id)}
            // onClick={(e) => modelListStore.deleteModel(e, vehicle.id)}
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
      modelListStore.totalVehicleModel / modelListStore.rppModel
    )}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={modelListStore.handlePageClick}
    containerClassName={"pagination "}
    pageClassName={"page-item page-item-blue"}
    pageLinkClassName={"page-link"}
    previousClassName={"page-item page-item-blue"}
    previousLinkClassName={"page-link"}
    nextClassName={"page-item page-item-blue"}
    nextLinkClassName={"page-link"}
    breakClassName={"page-item page-item-blue"}
    breakLinkClassName={"page-link"}
    activeClassName={"page-item-active page-item-active-blue "}
  />
  <select
    className="selectForm selectForm-blue"
    value={modelListStore.rppModel}
    onChange={modelListStore.setRpp}
    type="text"
  >
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={15}>15</option>
    <option value={20}>20</option>
    <option value={30}>30</option>
  </select>
  <button
    className="buttonOrder buttonOrderBlue"
    onClick={() => modelListStore.setOrderModel()}
  >
    {modelListStore.orderModel ? "ASC" : "DESC"}
  </button>
</div>
</div> */
