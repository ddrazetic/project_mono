import VehicleMakeService from "../../Common/VehicleMakeService";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";

class CreateMakeStore {
  state = "initial";
  name = "";
  abrv = "";
  error = "";

  constructor() {
    this.VehicleMakeService = new VehicleMakeService();
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

  onChangeName = (e) => {
    this.setName(e.target.value);
    // console.log(this.name);
    this.setError("");
  };
  onChangeAbrv = (e) => {
    this.setAbrv(e.target.value);
    this.setError("");
  };

  validateAll = () => {
    if (this.name.length < 1 || this.abrv.length < 1) {
      this.setError("Both fields are required!");
      return true;
    }
  };

  notifyCreateMake = () =>
    toast(
      <p>
        Created Vehicle make! <br /> Name: <strong>{this.name}</strong> Abrv:{" "}
        <strong>{this.abrv}</strong>
      </p>
    );

  addVehicleMake = (e) => {
    e.preventDefault();
    if (!this.validateAll()) {
      this.createVehicleMake(this.name, this.abrv);
      this.notifyCreateMake();
      this.setName("");
      this.setAbrv("");
      this.setError("");
    }
  };

  createVehicleMake = async (name, abrv) => {
    try {
      const response = await this.VehicleMakeService.create({
        name: name,
        abrv: abrv,
      });
      if (response.status === 201) {
        runInAction(() => {
          this.state = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };
}

export default CreateMakeStore;
