import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <div className="navigation">
      <Link className="navigationLink redBackground" to="/createvehiclemake">
        Create new Vehicle make
      </Link>
      <Link className="navigationLink greenBackground" to="/vehiclemake">
        Vehicle makes
      </Link>
      <Link
        className="navigationLink yellowBackground"
        to="/createvehiclemodel"
      >
        Create new Vehicle model
      </Link>
      <Link className="navigationLink blueBackground" to="/vehiclemodel">
        Vehicle models
      </Link>
    </div>
  );
};

export default Navigation;
