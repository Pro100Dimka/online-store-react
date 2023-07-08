import { $host, $authHost } from './http';

export default class ApiService {
  constructor(apiBase) {
    this._apiBase = apiBase;
  }
  getResource = async (host, url, query, method = 'get') => {
    const absUrl = `api${this._apiBase}${url}`;
    const { data } = await host[method](absUrl, query);
    return data;
  };
  createItem = async (query) => this.getResource($authHost, '', query, 'post');
  updateItemById = async (id, query) =>
    this.getResource($authHost, `/update/${id}`, query, 'post');
  getAllItems = async () => this.getResource($host, '');
  getItemById = async (id) => this.getResource($host, `/${id}`);
  deleteItem = async (id) =>
    this.getResource($authHost, `/delete/${id}`, '', 'post');
}

export const createDevice = async (device) => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};
