import VehicleMakeService from "../../Common/VehicleMakeService";
import VehicleModelService from "../../Common/VehicleModelService";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";

class ModelListStore {
  stateModel = "initial";
  state = "initial";
  name = "";
  abrv = "";
  makeId = "";
  id = "";
  search = "";
  orderModel = true;
  searchInput = "";
  totalVehicleMake = 1;
  modalIsOpen = false;
  selectedMakeName = "";
  selectedMakeId = "";
  vehicleModel = [];
  vehicleMake = [];
  totalVehicleModel = 1;
  rppModel = 5;
  pageModel = 1;
  stateModel = "initial";
  searchInputModel = "";
  rpp = 1000;
  page = 1;
  deleteId = "";
  customStyles = {
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

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.VehicleModelService = new VehicleModelService();
    this.VehicleMakeService = new VehicleMakeService();
    makeAutoObservable(this);
  }

  setName = (value) => {
    this.name = value;
  };
  setAbrv = (value) => {
    this.abrv = value;
  };

  setId = (value) => {
    this.id = value;
  };
  setmakeId = (value) => {
    this.makeId = value;
  };
  setSearch = (value) => {
    this.search = value;
  };

  onChangeSearch = (e) => {
    e.preventDefault();
    this.setSearch(e.target.value);
    this.submitSearch(e.target.value);
  };

  initialRun = () => {
    this.setDefaultValuesModel();
    this.setSearch(this.rootStore.makeListStore.selectedMakeId);
    this.submitSearch(this.rootStore.makeListStore.selectedMakeId);
    this.getAllVehiclesMake();
    this.rootStore.makeListStore.setSelectedName("", "");
  };

  submitSearch = (searchI) => {
    this.setSearchinputModel(`WHERE makeId LIKE '%${searchI}%'`);
    this.getAllVehiclesModels();
  };

  setSearchinputModel = (search) => {
    this.searchInputModel = search;
  };
  setParamsModel = (params) => {
    if (this.searchInputModel) {
      params.append("searchQuery", this.searchInputModel);
    }
    if (this.orderModel) params.append("sort", "name|asc");
    else params.append("sort", "name|desc");
  };
  setOrderModel = () => {
    this.orderModel = !this.orderModel;
    this.getAllVehiclesModels();
  };

  getAllVehiclesModels = async () => {
    this.stateModel = "pending";
    try {
      const params = new URLSearchParams({
        rpp: this.rppModel,
        page: this.pageModel,
      });
      this.setParamsModel(params);

      const data = await this.VehicleModelService.getModels(params);
      runInAction(() => {
        this.vehicleModel = data.data.item;
        this.totalVehicleModel = data.data.totalRecords;
        this.stateModel = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.stateModel = "error";
      });
    }
  };

  setIsOpen = (value) => {
    this.modalIsOpen = value;
  };
  openModal = () => {
    this.setIsOpen(true);
  };

  closeModal = () => {
    this.setIsOpen(false);
  };

  setDefaultValuesModel = () => {
    this.rppModel = 5;
    this.pageModel = 1;
    this.searchInputModel = "";
    this.orderModel = true;
  };

  getAllVehiclesMake = async () => {
    this.state = "pending";
    try {
      const params = new URLSearchParams({
        rpp: this.rpp,
        page: this.page,
      });

      const data = await this.VehicleMakeService.get(params);
      runInAction(() => {
        this.vehicleMake = data.data.item;
        this.state = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };

  setRpp = (e) => {
    e.preventDefault();
    this.setRppVehicleModel(e.target.value);
    this.getAllVehiclesModels();
  };
  setRppVehicleModel = (value) => {
    this.rppModel = value;
    this.pageModel = 1;
  };

  handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    this.pageModel = currentPage;
    this.getAllVehiclesModels();
  };

  setCurrentModel = (id, name, abrv, makeId) => {
    this.setName(name);
    this.setId(id);
    this.setAbrv(abrv);
    this.setmakeId(makeId);
  };

  updateModel = (e) => {
    e.preventDefault();
    if (!this.validateAll()) {
      this.updateVehicleModel(this.id, this.name, this.abrv, this.makeId);
      this.setName("");
      this.setAbrv("");
      this.setError("");
      this.setmakeId("");
      this.closeModal();
      this.notifyUpdateModel();
    }
  };

  deleteModel = (e, id) => {
    e.preventDefault();
    this.deleteVehicleModel(this.deleteId);
    this.setDeleteId("");
    this.closeModal();
    this.notifyDeleteModel();
  };

  notifyDeleteModel = () => toast("Deleted Vehicle model!");

  updateVehicleModel = async (id, name, abrv, makeId) => {
    try {
      const response = await this.VehicleModelService.updateModel(id, {
        name: name,
        abrv: abrv,
        makeId: makeId,
      });

      if (response.status === 200) {
        runInAction(() => {
          this.stateModel = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.stateModel = "error";
      });
    }
    this.getAllVehiclesModels();
  };
  deleteVehicleModel = async (id) => {
    try {
      const response = await this.VehicleModelService.deleteModel(id);
      if (response.status === 204) {
        runInAction(() => {
          this.stateModel = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.stateModel = "error";
      });
    }
    this.getAllVehiclesModels();
  };
  setDeleteId = (value) => {
    this.deleteId = value;
  };
  openModalDelete = (id) => {
    this.setDeleteId(id);
    this.openModal();
  };
}

export default ModelListStore;
