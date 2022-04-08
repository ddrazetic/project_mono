import React, { useEffect } from "react";
import { useVehicleMakeStore } from "../Stores/VehicleMakeContext";
import { observer } from "mobx-react";
import ReactPaginate from "react-paginate";

const VehicleMakeList = observer(() => {
  const vehicleMakeStore = useVehicleMakeStore();
  useEffect(() => {
    vehicleMakeStore.rpp = 10;
    vehicleMakeStore.getAllVehiclesMake();
  }, []);

  const handlePageClick = async (data) => {
    // console.log(data.selected);

    let currentPage = data.selected + 1;
    vehicleMakeStore.page = currentPage;
    vehicleMakeStore.getAllVehiclesMake();
  };

  return (
    <div>
      <h2 className="headerList">List of Vehicle Makes</h2>

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
                <button
                  className="deleteButton"
                  onClick={() => {
                    vehicleMakeStore.deleteVehicleMake(vehicle.id);
                  }}
                >
                  Delete
                </button>
              </td>
              <td>
                <button className="updateButton">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={10}
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
    </div>
  );
});

export default VehicleMakeList;
