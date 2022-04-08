import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="homeContainer">
      <Link className="homeLink redBackground" to="/createvehiclemake">
        Create new Vehicle make
      </Link>
      <Link className="homeLink yellowBackground" to="/createvehiclemodel">
        Create new Vehicle model
      </Link>
      <Link className="homeLink greenBackground" to="/vehiclemake">
        Vehicle makes
      </Link>
      <Link className="homeLink blueBackground" to="/vehiclemodel">
        Vehicle models
      </Link>
    </div>
  );
};

export default Home;
