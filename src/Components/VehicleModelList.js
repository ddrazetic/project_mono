import React from "react";
import { observer } from "mobx-react";
import Navigation from "./Navigation";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    backgroundColor: "#f3a1a1ad",
    boxShadow: "10px 10px 8px #e6a8a8",
    textShadow: "3px 3px 5px #8f3737",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const VehicleModelList = observer(() => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  Modal.setAppElement("#root");

  return (
    <>
      <Navigation />
      <button onClick={openModal}>Open Modal</button>
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
        <form className="editVehicleMake">
          <label>Name for Vehicle Model: </label>
          <input type="text" />
          <label>Abbreviation for Vehicle Model:</label>
          <input type="text" />
          <div className="alertError">error</div>
          <button type="submit">Add Vehicle</button>
        </form>
      </Modal>
      {/* {" "}
      <ul>
        {vehicleMakeStore.vehicleModel.map((vehicle) => (
          <li key={vehicle.id}>
            {`Ime: ${vehicle.name}  Kratica: ${vehicle.abrv} Id: ${vehicle.id} makeId: ${vehicle.makeId}`}{" "}
          </li>
        ))}
      </ul> */}
    </>
  );
});

export default VehicleModelList;
