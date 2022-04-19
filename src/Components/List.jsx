import React from "react";
import { useNavigate } from "react-router-dom";
const List = ({
  data,
  data1,
  openModalDelete,
  update,
  pathToUpdate,
  modelTable,
  styleClass,
  setSelectedName,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <table className={"table " + styleClass}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Abrv</th>
            {modelTable ? <th>MAKE</th> : null}
          </tr>
        </thead>
        <tbody>
          {data.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.name}</td>
              <td>{vehicle.abrv}</td>
              {modelTable ? (
                <td>
                  {data1.map((vehicleM) => {
                    if (vehicleM.id === vehicle.makeId) return vehicleM.name;
                    else return null;
                  })}
                </td>
              ) : null}
              <td>
                <button
                  onClick={() => {
                    update(
                      vehicle.id,
                      vehicle.name,
                      vehicle.abrv,
                      vehicle.makeId
                    );
                    navigate("/" + pathToUpdate);
                  }}
                  className="updateButton"
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="deleteButton"
                  onClick={() => openModalDelete(vehicle.id)}
                >
                  Delete
                </button>
              </td>
              {!modelTable ? (
                <td>
                  <button
                    onClick={() => {
                      setSelectedName(vehicle.id, vehicle.name);
                      navigate("/createvehiclemodel");
                    }}
                    className="updateButton"
                  >
                    Create Models
                  </button>
                </td>
              ) : null}
              {!modelTable ? (
                <td>
                  <button
                    onClick={() => {
                      setSelectedName(vehicle.id, vehicle.name);
                      navigate("/vehiclemodel");
                    }}
                    className="updateButton"
                  >
                    Models -&gt;
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
