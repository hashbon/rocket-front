/* eslint-disable */
import fetch from "isomorphic-unfetch";
import { APP_ENV } from "../app-env";

export const API_DOMAIN =
  APP_ENV.REACT_APP_TYPE === "STAGE" ? APP_ENV.REACT_APP_STAGE_MAIN_API : APP_ENV.REACT_APP_MAIN_API;

export function apiResponseTreatment<T>(response: T): Promise<T> {
  return new Promise((resolve) => {
    resolve(response);
  });
}

export async function invoke(
  method: string,
  name: string,
  params: { [key: string]: string },
  options: { [key: string]: string } = {},
) {
  return new Promise(async (resolve, reject) => {
    const paramsArr = [];

    for (const key in params) {
      paramsArr.push(`${key}=${encodeURIComponent(params[key])}`);
    }

    let headers = options.headers || {};

    const init: {
      method: string;
      headers: { [key: string]: string };
      body?: FormData;
    } = {
      method,
      headers,
    };

    const apiEntry = options.apiEntry || API_DOMAIN;

    let url = `${apiEntry}/${name}`;

    if (method === "GET") {
      url += paramsArr.length > 0 ? `?${paramsArr.join("&")}` : "";
    } else {
      const formData = new FormData();

      for (const name in params) {
        formData.append(name, params[name]);
      }

      init.body = formData;
    }

    fetch(url, init).then(async (resp) => {
      // if (resp.status === 403) {
        // logout
        // window.location.href = "/";
      //   // return;
      // }

        resp.json().then((data) => {
          if (resp.status === 200) {
            if (data.hasOwnProperty("type")) {
              switch (data.type) {
                case "error":
                  //
                  break;
              }
            }
            resolve(data);
          } else {
            reject(data);
          }
        });
      })
      .catch((err) => {
        console.error("Fetch is failed: ", err);
      });
  });
}

export function get(name: string, params = {}, options = {}) {
  return invoke("GET", name, params, options);
}

export function post(name: string, params = {}, options = {}) {
  return invoke("POST", name, params, options);
}

export function put(name: string, params = {}, options = {}) {
  return invoke("PUT", name, params, options);
}

export function patch(name: string, params = {}, options = {}) {
  return invoke("PATCH", name, params, options);
}

export function del(name: string, params = {}, options = {}) {
  return invoke("DELETE", name, params, options);
}
