import { hostConfig } from "../config";
import cookie from "react-cookies";

const responseHandler = (response) => {
  if (response.status === 401) {
    cookie.remove("adminToken");
    localStorage.clear();
    window.location.href = "/";
  } else if (response.status === 200) {
    return response;
  } else if (response.status === 201) {
    return response;
  } else if (response.status === 400) {
    return response;
  } else if (response.status === 409) {
    return { error: response?.message || "Email is already Exist" };
  } else {
    return false;
  }
};

const errorHandler = () => {
  return false;
};

const getListByApi = (requestUrl, params) => {
  let getParams = "";

  const token = cookie.load("adminToken");

  if (params && params.pageLimit !== undefined)
    getParams += `&pageLimit=${params.pageLimit}`;

  if (params && params.page !== undefined) getParams += `&page=${params.page}`;
  if (params && params.skip !== undefined) getParams += `&skip=${params.skip}`;

  if (params && params.limit !== undefined)
    getParams += `&limit=${params.limit}`;

  if (params && params.lastKey !== null && params.lastKey !== undefined)
    getParams += `&lastKey=${params.lastKey}`;

  if (params && params.next !== undefined) getParams += `&next=${params.next}`;

  if (params && params.search && params.search.trim() !== "")
    getParams += `&search=${params.search.trim()}`;

  // Remove leading "&" if exists and add only one "?"
  const finalUrl = `${hostConfig.API_URL}${requestUrl}${
    getParams ? "?" + getParams.slice(1) : ""
  }`;

  console.log(finalUrl, "   ");

  if (token) {
  return fetch(finalUrl, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => responseHandler(response))
    .then((result) => result.json())
    .catch((error) => {
      console.log(error, "453");

      errorHandler(error);
    });
};
};

const viewDataByApi = (requestUrl, dataId, isEvent, params) => {
  const token = cookie.load("adminToken");
  //check all the params

  let getParams = "?";

  if (params && params.approval !== null && params.approval !== undefined)
    getParams += `&approval=${params.approval}`;
  if (params && params.createdBy !== null && params.createdBy !== undefined)
    getParams += `&createdBy=${params.createdBy}`;
  if (params && params.modeType !== null && params.modeType !== undefined)
    getParams += `&modeType=${params.modeType}`;
  if (params && params.status !== null && params.status !== undefined)
    getParams += `&status=${params.status}`;
  if (params && params.eventType !== null && params.eventType !== undefined)
    getParams += `&eventType=${params.eventType}`;

  return fetch(
    `${
      isEvent === "isEvent"
        ? hostConfig.EVENT_API_URL
        : isEvent === "partner"
        ? hostConfig.PARTNER_API_URL
        : hostConfig.API_URL
    }${requestUrl}/${dataId}${getParams}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((response) => {
      return responseHandler(response);
    })
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      errorHandler(error);
    });
};

const postDataApi = (requestUrl, params) => {
  const token = cookie.load("adminToken");

  return fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      return responseHandler(response);
    })
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      errorHandler(error);
    });
};

const putDataApi = (requestUrl, params, id) => {
  const token = cookie.load("adminToken");
  let getParams = "?";

  return fetch(`${hostConfig.API_URL}${requestUrl}/${id}${getParams}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      return responseHandler(response);
    })
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      errorHandler(error);
    });
};

const deleteDataApi = (requestUrl, id) => {
  const token = cookie.load("adminToken");

  return fetch(
    `${hostConfig.API_URL}${requestUrl}/${id}`,

    {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((response) => {
      return responseHandler(response);
    })
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      errorHandler(error);
    });
};

export { getListByApi, viewDataByApi, postDataApi, putDataApi, deleteDataApi };
