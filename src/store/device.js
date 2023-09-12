import { makeAutoObservable } from 'mobx';
import {
  BRAND_ROUTE,
  DEVICE_ROUTE,
  SELECTED_BRAND,
  SELECTED_TYPE,
  TYPE_ROUTE
} from '../utils/consts';

export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._selectedType = {};
    this._selectedBrand = {};
    makeAutoObservable(this); // при изминениях в переменных выше мобх будет отслеживать и отрендривать заново
  }

  setStoreItems(type, items) {
    switch (type) {
      case TYPE_ROUTE:
        this._types = items;
        break;
      case BRAND_ROUTE:
        this._brands = items;
        break;
      case DEVICE_ROUTE:
        this._devices = items;
        break;
      case SELECTED_TYPE:
        this._selectedType = items;
        break;
      case SELECTED_BRAND:
        this._selectedBrand = items;
        break;
      default:
        break;
    }
  }

  getStoreItems(type) {
    switch (type) {
      case TYPE_ROUTE:
        return this._types;
      case BRAND_ROUTE:
        return this._brands;
      case DEVICE_ROUTE:
        return this._devices;
      case SELECTED_TYPE:
        return this._selectedType;
      case SELECTED_BRAND:
        return this._selectedBrand;
      default:
        return null;
    }
  }
}
