import VehicleModelService from "../../Common/VehicleModelService";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";

class createModelStore {
  state = "initial";
  name = "";
  abrv = "";
  error = "";
  makeId = "";

  constructor() {
    this.VehicleModelService = new VehicleModelService();
    makeAutoObservable(this);
  }

  setName = (value) => {
    this.name = value;
  };
  setAbrv = (value) => {
    this.abrv = value;
  };
  setError = (value) => {
    this.error = value;
  };
  setMakeId = (value) => {
    this.makeId = value;
  };

  onChangeName = (e) => {
    this.setName(e.target.value);
    // console.log(this.name);
    this.setError("");
  };
  onChangeAbrv = (e) => {
    this.setAbrv(e.target.value);
    this.setError("");
  };

  onChangeMakeId = (e) => {
    this.setMakeId(e.target.value);
    this.setError("");
  };

  validateAll = () => {
    if (
      this.name.length < 1 ||
      this.abrv.length < 1 ||
      this.makeId.length < 1
    ) {
      this.setError("All fields are required!");
      return true;
    }
  };
  notifyCreateModel = () =>
    toast(
      <p>
        Created Vehicle model! <br /> Name: <strong>{this.name}</strong> Abrv:{" "}
        <strong>{this.abrv}</strong>
      </p>
    );

  addVehicleModel = (e) => {
    e.preventDefault();
    if (!this.validateAll()) {
      this.createVehicleModel(this.name, this.abrv, this.makeId);
      this.notifyCreateModel();
      this.setName("");
      this.setAbrv("");
      this.setError("");
      //   vehicleMakeStore.getAllVehiclesModels();
    }
  };

  createVehicleModel = async (name, abrv, makeId) => {
    try {
      const response = await this.VehicleModelService.createModel({
        name: name,
        abrv: abrv,
        makeId: makeId,
      });
      if (response.status === 201) {
        runInAction(() => {
          this.stateModel = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.stateModel = "error";
      });
    }
  };

  //   addVehicleMake = (e) => {
  //     e.preventDefault();
  //     if (!this.validateAll()) {
  //       this.createVehicleMake(this.name, this.abrv);
  //       this.notifyCreateMake();
  //       this.setName("");
  //       this.setAbrv("");
  //       this.setError("");
  //     }
  //   };

  //   createVehicleMake = async (name, abrv) => {
  //     try {
  //       const response = await this.VehicleMakeService.create({
  //         name: name,
  //         abrv: abrv,
  //       });
  //       if (response.status === 201) {
  //         runInAction(() => {
  //           this.state = "success";
  //         });
  //       }
  //     } catch (error) {
  //       runInAction(() => {
  //         this.state = "error";
  //       });
  //     }
  //   };
}

export default createModelStore;
