import { $host, $authHost } from './http';

export default class ApiService {
  constructor(apiBase) {
    this._apiBase = apiBase;
  }

  getResource = async (host, url, query, body, method = 'get') => {
    let absUrl = `api${this._apiBase}${url}`;
    if (query) {
      const queryObj = Object.keys(query);
      queryObj.forEach(
        (field, key) => (absUrl += `${key === 0 ? '?' : ''}${field}=${query[field]}${
          key !== queryObj.length - 1 ? '&' : ''
        }`)
      );
    }

    const { data } = await host[method](absUrl, body);
    return data;
  };

  createItem = async (body) => this.getResource($authHost, '', '', body, 'post');

  updateItemById = async (id, body) => this.getResource($authHost, `/update/${id}`, '', body, 'post');

  getAllItems = async (query) => this.getResource($host, '', query);

  getItemById = async (id) => this.getResource($host, `/${id}`);

  deleteItem = async (id) => this.getResource($authHost, `/delete/${id}`, '', '', 'post');
}

export const createDevice = async (device) => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};
