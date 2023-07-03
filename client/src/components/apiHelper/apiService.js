import { errorHandler } from './errorHandler';

export default class ApiService {
  constructor(apiBase) {
    this._apiBase = `${process.env.REACT_APP_API_URL}/${apiBase}`;
  }
  getResource = async (url, query, method = 'GET', body, headers = {}) => {
    const token = localStorage.getItem('token');
    const absUrl = new URL(`${this._apiBase}${url}`);
    // if (query) {
    //   Object.keys(query).forEach((key) =>
    //     absUrl.searchParams.append(key, query[key])
    //   );
    //   console.log('query', query);
    // }

    if (body) {
      // объект который отправляется на бек(форма)
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }
    // if (token && !headers?.Authorization) {
    //   headers.Authorization = `${token}`;
    // }
    const res = await fetch(absUrl, {
      method,
      body,
      headers: {
        ...headers,
      },
    });
    const contentType = res.headers.get('Content-Type');
    const checkRes = async (type) => {
      const resData = type.includes('application/json')
        ? await res.json()
        : await res.blob();
      if (res.ok) return resData?.data ? resData.data : resData;
      console.log(res.ok);
      console.log(resData);
    };
    return checkRes(contentType);
  };
  createItem = async (query) => this.getResource('', null, 'POST', query);
}

// http://localhost:5000/api/user/registration
