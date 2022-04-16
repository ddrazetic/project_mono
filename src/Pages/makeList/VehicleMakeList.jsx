import React, { useEffect, useState } from "react";
import { useStores } from "../../Stores/StoresContex";
import { observer } from "mobx-react";
import ReactPaginate from "react-paginate";
import Navigation from "../../Components/Navigation";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
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

const VehicleMakeList = observer(() => {
  const { vehicleMakeStore } = useStores();
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [abrv, setAbrv] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const history = useHistory();
  const onChangeName = (e) => {
    setName(e.target.value);
    setError("");
  };
  const onChangeAbrv = (e) => {
    setAbrv(e.target.value);
    setError("");
  };

  useEffect(() => {
    vehicleMakeStore.setDefaultValuesMake();
    vehicleMakeStore.getAllVehiclesMake();
  }, [vehicleMakeStore]);
  const submitSearch = (e) => {
    e.preventDefault();
    // vehicleMakeStore.searchInput = `WHERE name LIKE '%${search}%'`;
    vehicleMakeStore.setSearchinputMake(`WHERE name LIKE '%${search}%'`);
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
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }
  Modal.setAppElement("#root");

  const validateAll = () => {
    if (name.length < 1 || abrv.length < 1) {
      setError("Both fields are required!");
      return true;
    }
  };

  const setCurrentMake = (id, name, abrv) => {
    setName(name);
    setId(id);
    setAbrv(abrv);
    openModal();
  };
  const updateMake = (e) => {
    e.preventDefault();
    if (!validateAll()) {
      vehicleMakeStore.updateVehicleMake(id, name, abrv);
      setName("");
      setAbrv("");
      setError("");
      closeModal();
      notifyUpdateMake();
    }
  };
  const deleteMake = (e, id) => {
    e.preventDefault();
    vehicleMakeStore.deleteVehicleMake(id);
    notifyDeleteMake();
  };

  const notifyDeleteMake = () =>
    toast("Deleted Vehicle make and all of his models!");
  const notifyUpdateMake = () => toast("Updated Vehicle make!");

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vehicleMakeStore.vehicleMake.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.name}</td>
              <td>{vehicle.abrv}</td>
              <td>
                <button
                  onClick={() =>
                    setCurrentMake(vehicle.id, vehicle.name, vehicle.abrv)
                  }
                  className="updateButton"
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="deleteButton"
                  onClick={(e) => deleteMake(e, vehicle.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    vehicleMakeStore.setSelectedName(vehicle.id, vehicle.name);
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
                    vehicleMakeStore.setSelectedName(vehicle.id, vehicle.name);
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
        <button
          className="buttonOrder"
          onClick={() => vehicleMakeStore.setOrder()}
        >
          {vehicleMakeStore.order ? "ASC" : "DESC"}
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className="buttonClose" onClick={closeModal}>
          X
        </button>
        <h2 className="headerEdit">Update this make</h2>
        <form className="editVehicleMake" onSubmit={updateMake}>
          <label>Name for Vehicle Make: </label>
          <input value={name} onChange={onChangeName} type="text" />
          <label>Abbreviation for Vehicle Make:</label>
          <input value={abrv} onChange={onChangeAbrv} type="text" />
          <div className="alertError">{error}</div>
          <button type="submit">Update</button>
        </form>
      </Modal>
    </>
  );
});

export default VehicleMakeList;
