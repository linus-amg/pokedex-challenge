/* eslint-disable no-undef */

const defaultRequestOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${btoa("ceezer:hireme")}`,
  },
  mode: 'cors',
  referrerPolicy: 'no-referrer-when-downgrade'
};

class HTTP {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  post = (path, body) => this.request('POST', path, body);
  patch = (path, body) => this.request('PATCH', path, body);
  put = (path, body) => this.request('PUT', path, body);
  get = async (path) => this.request('GET', path);
  delete = async (path) => this.request('DELETE', path);

  request = async (method = 'GET', path, body) => {
    
    const options = {
      method: method.toUpperCase(),
      ...defaultRequestOptions
    };

    console.log(options)

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.endpoint}${path}`, options);
    // if (response.status === 401) {
    //   return window.stores.sessionStore.setAuthenticated(false);
    // }

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

const endpoint = process.env.REACT_APP_BACKEND_URL || '//localhost:7000';
const http = new HTTP(endpoint);

export default http;
