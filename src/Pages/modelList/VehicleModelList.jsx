import React, { useEffect, useState } from "react";
import { useStores } from "../../Stores/StoresContex";
import { observer } from "mobx-react";
import Navigation from "../../Components/Navigation";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    backgroundColor: "#ebb7b7",
    boxShadow: "10px 10px 8px #e6a8a8",
    textShadow: "3px 3px 5px #8f3737",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const VehicleModelList = observer(() => {
  const {vehicleMakeStore} = useStores();
  const [search, setSearch] = useState(vehicleMakeStore.selectedMakeId);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [abrv, setAbrv] = useState("");
  const [makeId, setmakeId] = useState("");
  const [error, setError] = useState("");
  const onChangeName = (e) => {
    setName(e.target.value);
    setError("");
  };
  const onChangeAbrv = (e) => {
    setAbrv(e.target.value);
    setError("");
  };
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    submitSearch(e.target.value);
  };

  const submitSearch = (searchI) => {
    vehicleMakeStore.setSearchinputModel(`WHERE makeId LIKE '%${searchI}%'`);
    vehicleMakeStore.getAllVehiclesModels();
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  Modal.setAppElement("#root");

  useEffect(() => {
    vehicleMakeStore.setDefaultValuesModel();
    vehicleMakeStore.setSearchinputModel(
      `WHERE makeId LIKE '%${vehicleMakeStore.selectedMakeId}%'`
    );
    vehicleMakeStore.getAllVehiclesModels();
    vehicleMakeStore.setRppMax();
    vehicleMakeStore.getAllVehiclesMake();

    vehicleMakeStore.setSelectedName("", "");
  }, [vehicleMakeStore]);

  const setRpp = (e) => {
    e.preventDefault();
    vehicleMakeStore.setRppVehicleModel(e.target.value);
    vehicleMakeStore.getAllVehiclesModels();
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    vehicleMakeStore.pageModel = currentPage;
    vehicleMakeStore.getAllVehiclesModels();
  };
  const validateAll = () => {
    if (name.length < 1 || abrv.length < 1) {
      setError("Both fields are required!");
      return true;
    }
  };
  const setCurrentModel = (id, name, abrv, makeId) => {
    setName(name);
    setId(id);
    setAbrv(abrv);
    setmakeId(makeId);
    openModal();
  };
  const updateModel = (e) => {
    e.preventDefault();
    if (!validateAll()) {
      vehicleMakeStore.updateVehicleModel(id, name, abrv, makeId);
      setName("");
      setAbrv("");
      setError("");
      setmakeId("");
      closeModal();
      notifyUpdateModel();
    }
  };
  const deleteModel = (e, id) => {
    e.preventDefault();
    vehicleMakeStore.deleteVehicleModel(id);
    notifyDeleteModel();
  };
  const notifyDeleteModel = () => toast("Deleted Vehicle model!");
  const notifyUpdateModel = () => toast("Updated Vehicle model!");

  return (
    <>
      <Navigation />
      <h2 className="headerList blueheader">List of Vehicle Models</h2>
      <form className="formSearch formSearchBlue">
        <label>Search by Make:</label>
        <select
          type="text"
          className="inputSearch"
          value={search}
          onChange={onChangeSearch}
        >
          {" "}
          <option value={""}>all Models</option>
          {vehicleMakeStore.vehicleMake.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {" "}
              {vehicle.name}
            </option>
          ))}
        </select>
      </form>

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
          {vehicleMakeStore.vehicleModel.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.name}</td>
              <td>{vehicle.abrv}</td>
              <td>
                {vehicleMakeStore.vehicleMake.map((vehicleM) => {
                  if (vehicleM.id === vehicle.makeId) return vehicleM.name;
                  else return null;
                })}
              </td>
              <td>
                <button
                  onClick={() =>
                    setCurrentModel(
                      vehicle.id,
                      vehicle.name,
                      vehicle.abrv,
                      vehicle.makeId
                    )
                  }
                  className="updateButton"
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="deleteButton"
                  onClick={(e) => deleteModel(e, vehicle.id)}
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
            vehicleMakeStore.totalVehicleModel / vehicleMakeStore.rppModel
          )}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
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
          value={vehicleMakeStore.rppModel}
          onChange={setRpp}
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
          onClick={() => vehicleMakeStore.setOrderModel()}
        >
          {vehicleMakeStore.orderModel ? "ASC" : "DESC"}
        </button>
      </div>
      <p>{vehicleMakeStore.selectedMakeName}</p>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className="buttonClose" onClick={closeModal}>
          X
        </button>
        <h2 className="headerEdit">Update this Model</h2>
        <form className="editVehicleMake" onSubmit={updateModel}>
          <label>Name for Vehicle Model: </label>
          <input value={name} onChange={onChangeName} type="text" />
          <label>Abbreviation for Vehicle Model:</label>
          <input value={abrv} onChange={onChangeAbrv} type="text" />
          <div className="alertError">{error}</div>
          <button type="submit">Update</button>
        </form>
      </Modal>
    </>
  );
});

export default VehicleModelList;
