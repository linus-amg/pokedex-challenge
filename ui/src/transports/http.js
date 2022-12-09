/* eslint-disable no-undef */

import { BACKEND_URL } from '../utils';

const authorizationHeader = `Basic ${btoa('ceezer:hireme')}`;

const defaultRequestOptions = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: authorizationHeader,
  },
  mode: 'cors',
  referrerPolicy: 'no-referrer-when-downgrade',
};

class HTTP {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  post = (path, body) => this.request('POST', path, body);
  patch = (path, body) => this.request('PATCH', path, body);
  put = (path, body) => this.request('PUT', path, body);
  get = path => this.request('GET', path);
  delete = path => this.request('DELETE', path);

  request = async (method = 'GET', path, body) => {
    const options = {
      method: method.toUpperCase(),
      ...defaultRequestOptions,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.endpoint}${path}`, options);

    return HTTP.handleResponse(response);
  };

  static handleResponse(response) {
    if (response) {
      const [contentType] = response.headers.get('Content-Type').split('; ');

      if (contentType === 'application/json') {
        return response.json();
      }

      return response.text();
    }

    throw new Error('no response from http transport');
  }
}

const endpoint = BACKEND_URL;
const http = new HTTP(endpoint);

export default http;
