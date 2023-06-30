import { makeAutoObservable } from 'mobx';
export default class DeviceStore {
  constructor() {
    this._types = [
      { id: 1, name: 'Холодильники' },
      { id: 2, name: 'Теклевизорі' },
      { id: 3, name: 'Пілесосі' },
      { id: 4, name: 'Швабри' },
      { id: 5, name: 'Печенье' },
      { id: 6, name: 'test2' },
      { id: 7, name: 'test' },
      { id: 8, name: 'test2' },
      { id: 9, name: 'test' },
      { id: 10, name: 'test2' },
      { id: 11, name: 'test' },
      { id: 12, name: 'test2' },
      { id: 13, name: 'test' },
      { id: 14, name: 'test2' },
    ];
    this._brands = [
      { id: 1, name: 'eteee' },
      { id: 2, name: 'tsssest2' },
    ];
    this._devices = [
      {
        id: 1,
        name: '111111',
        price: 5000,
        rating: 5,
        img: 'https://bipbap.ru/wp-content/uploads/2017/04/000f_7290754.jpg',
      },
      {
        id: 2,
        name: '222222',
        price: 5000,
        rating: 5,
        img: 'https://bipbap.ru/wp-content/uploads/2017/04/000f_7290754.jpg',
      },
      {
        id: 3,
        name: '333333',
        price: 5000,
        rating: 5,
        img: 'https://bipbap.ru/wp-content/uploads/2017/04/000f_7290754.jpg',
      },
      {
        id: 4,
        name: '444444',
        price: 5000,
        rating: 5,
        img: 'https://bipbap.ru/wp-content/uploads/2017/04/000f_7290754.jpg',
      },
      {
        id: 5,
        name: '111111',
        price: 5000,
        rating: 5,
        img: 'https://bipbap.ru/wp-content/uploads/2017/04/000f_7290754.jpg',
      },
      {
        id: 6,
        name: '222222',
        price: 5000,
        rating: 5,
        img: 'https://bipbap.ru/wp-content/uploads/2017/04/000f_7290754.jpg',
      },
      {
        id: 7,
        name: '333333',
        price: 5000,
        rating: 5,
        img: 'https://bipbap.ru/wp-content/uploads/2017/04/000f_7290754.jpg',
      },
      {
        id: 8,
        name: '444444',
        price: 5000,
        rating: 5,
        img: 'https://bipbap.ru/wp-content/uploads/2017/04/000f_7290754.jpg',
      },
      {
        id: 9,
        name: '444444',
        price: 5000,
        rating: 5,
        img: 'https://bipbap.ru/wp-content/uploads/2017/04/000f_7290754.jpg',
      },
    ];
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
