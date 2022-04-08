// import { nanoid } from "nanoid";
import vehiclesService from "../Common/vehicles.service";
import {
  observable,
  action,
  computed,
  makeAutoObservable,
  toJS,
  runInAction,
  makeObservable,
} from "mobx";

class createVehicleMakeStore {
  vehicleMake = [];
  countryData = [];
  rpp = 10;
  page = 1;
  state = "initial";
  constructor() {
    this.vehiclesService = new vehiclesService();
    makeObservable(this, {
      vehicleMake: observable,
      countryData: observable,
      state: observable,
      rpp: observable,
      page: observable,
    });
  }
  searchQuery = "";

  getAllVehiclesMake = async () => {
    this.state = "pending";
    try {
      const params = new URLSearchParams({
        rpp: this.rpp,
        page: this.page,
        // searchQuery: "WHERE name = 'swdwe'",
        sort: "name",
      });

      const data = await this.vehiclesService.get(params);
      runInAction(() => {
        this.vehicleMake = data.data.item;
        // console.log(data.data.item);
        this.state = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
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

// getAllVehicleMake = () => {
//   // this.vehicleMake = [];
//   this.vehiclesService
//     .get()
//     .then((response) => {
//       this.state = "pending";
//       console.log(response.data.item);

//       this.vehicleMake = response.data.item;
//       // console.log(toJS(this.vehicleMake));
//       // response.data.item.map((vehicle) => this.vehicleMake.push(vehicle));
//     })
//     .catch((e) => {
//       this.state = "error";
//       console.log(e);
//     });
// };

// addVehicleMake = (name, abrv) => {
//   this.vehiclesService
//     .create({
//       name: name,
//       abrv: abrv,
//     })
//     .then((response) => {
//       console.log(response.data);
//       this.state = "success";
//     })
//     .catch((e) => {
//       console.log(e);
//       this.state = "error";
//     });
//   // this.getAllVehicleMake();
// };

// export function createVehicleMakeStore() {
//   return makeAutoObservable({
//     vehicleMake: [],
//     state: "pending",
//     idModel: 1,
//     idMake: 1,
//     addVehicleMake(name, abrv) {
//       vehiclesService
//         .create({
//           name: name,
//           abrv: abrv,
//         })
//         .then((response) => {
//           console.log(response.data);
//           this.state = "pending";
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//       // this.getAllVehicleMake();
//     },
//     removeVehicleMake(id) {
//       this.vehicleMake = this.vehicleMake.filter(
//         (vehicle) => vehicle.id !== id
//       );
//     },
//     vehicleModel: [],
//     addVehicleModel(name, abrv, makeId) {
//       this.vehicleModel.push({
//         name,
//         abrv,
//         makeId,
//         id: ++this.idModel,
//       });
//     },
//     removeVehicleModel(id) {
//       this.vehicleModel = this.vehicleModel.filter(
//         (vehicle) => vehicle.id !== id
//       );
//     },
//     getAllVehicleMake() {
//       // this.vehicleMake = [];
//       vehiclesService
//         .get()
//         .then((response) => {
//           this.state = "pending";
//           console.log(response.data.item);

//           this.vehicleMake = response.data.item;
//           console.log(toJS(this.vehicleMake));
//           // response.data.item.map((vehicle) => this.vehicleMake.push(vehicle));
//         })
//         .catch((e) => {
//           this.state = "error";
//           console.log(e);
//         });
//     },
//   });
// }

// import vehiclesService from "../Common/vehicles.service";
// import { observable, action, computed } from "mobx";
// export function createVehicleMakeStore() {
//   return {
//     vehicleMake: [],
//     idModel: 1,
//     idMake: 1,
//     addVehicleMake(name, abrv) {
//       this.vehicleMake.push({
//         name,
//         abrv,
//         id: ++this.idMake,
//       });
//     },
//     removeVehicleMake(id) {
//       this.vehicleMake = this.vehicleMake.filter(
//         (vehicle) => vehicle.id !== id
//       );
//     },
//     vehicleModel: [],
//     addVehicleModel(name, abrv, makeId) {
//       this.vehicleModel.push({
//         name,
//         abrv,
//         makeId,
//         id: ++this.idModel,
//       });
//     },
//     removeVehicleModel(id) {
//       this.vehicleModel = this.vehicleModel.filter(
//         (vehicle) => vehicle.id !== id
//       );
//     },
//   };
// }
