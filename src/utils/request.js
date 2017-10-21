import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, method, params) {
  if (method === 'POST') {
    const formData = new FormData();

    for (const key in params) {
      if (params[key] != null) {
        const value = params[key];
        formData.append(key, value);
      }
    }
    return fetch(url, {
      method: method,
      body: formData,
    }).then(checkStatus)
      .then(parseJSON)
      .then(data => ({ data }))
      .catch(err => ({ err }));
  }
  if (method === 'GET') {
    return fetch(url)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => ({ data }))
      .catch(err => ({ err }));
  }
}
