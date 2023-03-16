import axios from "axios";

const TIME_OUT = 300 * 1000;

const statusError = {
  status: false,
  json: {
    error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"],
  },
};

const requestPromise = (url, option) => {
  return axios(url, option);
};

const timeoutPromise = () => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), TIME_OUT)
  );
};

const getPromise = async (url, option) => {
  return await Promise.race([requestPromise(url, option), timeoutPromise()]);
};
// login

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post("/api/auth/login", credentials, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    const status = response.status;
    const code = response.status;
    const json = response.data;
    return {
      status,
      code,
      json,
    };
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const code = error.response.status;
      const json = error.response.data;
      return {
        status,
        code,
        json,
      };
    } else {
      return statusError;
    }
  }
};
// logout

export const requestToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      "/login-url",
      {
        refresh_token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );

    const { status, data, statusText } = response;

    if (parseInt(status / 100) === 2) {
      return {
        status,
        code: statusText,
        json: data,
      };
    } else {
      return statusError;
    }
  } catch (error) {
    console.error(error);
    return statusError;
  }
};
