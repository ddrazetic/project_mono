import vehiclesService from "../Common/vehicles.service";
import { makeAutoObservable, runInAction } from "mobx";

class createVehicleMakeStore {
  vehicleMake = [];
  countryData = [];
  rpp = 5;
  page = 1;
  searchInput = "";
  state = "initial";
  totalVehicleMake = 1;

  constructor() {
    this.vehiclesService = new vehiclesService();
    makeAutoObservable(this);
  }

  setParams = (params) => {
    // console.log(this.searchInput);
    if (this.searchInput) {
      params.append("searchQuery", this.searchInput);
      // console.log(params.searchQuery);
    }
  };

  getAllVehiclesMake = async () => {
    this.state = "pending";
    try {
      const params = new URLSearchParams({
        rpp: this.rpp,
        page: this.page,
        sort: "name|desc",
      });
      this.setParams(params);

      const data = await this.vehiclesService.get(params);
      runInAction(() => {
        this.vehicleMake = data.data.item;
        this.totalVehicleMake = data.data.totalRecords;
        this.state = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };

  setDefaultValuesMake = () => {
    this.rpp = 5;
    this.page = 1;
    this.searchInput = "";
  };

  setRppVehicleMake = (value) => {
    this.rpp = value;
    this.page = 1;
  };

  createVehicleMake = async (name, abrv) => {
    try {
      const response = await this.vehiclesService.create({
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

  updateVehicleMake = async (id, name, abrv) => {
    try {
      const response = await this.vehiclesService.update(id, {
        name: name,
        abrv: abrv,
      });

      if (response.status === 200) {
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
  deleteVehicleMake = async (id) => {
    try {
      const response = await this.vehiclesService.delete(id);
      if (response.status === 204) {
        runInAction(() => {
          this.state = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
    this.getAllVehiclesMake();
  };
}

export default createVehicleMakeStore;
