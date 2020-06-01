import Axios, { Method } from 'axios';
import _ from 'lodash';
import qs from 'qs';
import config from '../config';
import { Endpoint, ENDPOINTS } from '../endpoints';
import { TOKEN } from '../token';

interface ApiHeaders {}

class ApiFactory<T> {
  headers: ApiHeaders;

  endpoints: typeof ENDPOINTS;

  constructor(endpoints: typeof ENDPOINTS) {
    this.headers = {};
    this.endpoints = endpoints;
  }

  fetch = <T extends object>(
    endpoint: Endpoint,
    data: T,
  ) => {
    const response = this.generateFullUri(this.endpoints[endpoint].uri, data);
    let { url } = response;
    const { removed } = response;
    const method = this.endpoints[endpoint].method as Method;
    const body = _.omit(data, removed);
    const token = TOKEN.get();
    if (token) {
      this.headers = { Authorization: `${token}` };
    } else {
      this.headers = {};
    }

    const queryString = qs.stringify(body || {});
    if (!!queryString && method === 'GET') {
      url += `?${queryString}`;
    }
    return Axios({
      url,
      method,
      data: body,
      headers: this.headers,
    });
  };

  private generateFullUri = <T>(endpoint: string, data: T) => {
    const removed: string[] = [];

    const url = `${config.endpoints.api}${endpoint}`.replace(
      /\{(.*?)\}/g,
      (token, name) => {
        let value = token;
        if (data && _.get(data, name)) {
          removed.push(name);
          value = _.get(data, name).toString();
        }
        return value;
      },
    );

    return { url, removed };
  };

  /* Tests */
  public reinitializeEndpoints = (endpoints: typeof ENDPOINTS) => {
    this.endpoints = endpoints;
  };
}

const api = new ApiFactory(ENDPOINTS);

export { api };

