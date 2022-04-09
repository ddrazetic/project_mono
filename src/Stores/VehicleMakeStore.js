import vehiclesService from "../Common/VehiclesDataService";
import { makeAutoObservable, runInAction } from "mobx";

class createVehicleMakeStore {
  vehicleMake = [];
  VehicleModel = [];
  rpp = 5;
  page = 1;
  order = true;
  searchInput = "";
  state = "initial";
  totalVehicleMake = 1;

  constructor() {
    this.vehiclesService = new vehiclesService();
    makeAutoObservable(this);
  }

  setParams = (params) => {
    if (this.searchInput) {
      params.append("searchQuery", this.searchInput);
      // console.log(params.searchQuery);
    }
    if (this.order) params.append("sort", "name|asc");
    else params.append("sort", "name|desc");
  };
  setOrder = () => {
    this.order = !this.order;
    this.getAllVehiclesMake();
  };

  getAllVehiclesMake = async () => {
    this.state = "pending";
    try {
      const params = new URLSearchParams({
        rpp: this.rpp,
        page: this.page,
      });
      // this.setOrder(params);
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
    this.order = true;
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
    this.getAllVehiclesMake();
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
