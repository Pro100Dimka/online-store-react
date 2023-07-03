import { makeAutoObservable } from 'mobx';
export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._selectedType = {};
    this._selectedBrand = {};
    makeAutoObservable(this); // при изминениях в переменных выше мобх будет отслеживать и отрендривать заново
  }
  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }
  setSelectedType(type) {
    this._selectedType = type;
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }
  getTypes() {
    return this._types;
  }
  getBrands() {
    return this._brands;
  }
  getDevices() {
    return this._devices;
  }
  getSelectedType() {
    return this._selectedType;
  }
  getSelectedBrand() {
    return this._selectedBrand;
  }
}
