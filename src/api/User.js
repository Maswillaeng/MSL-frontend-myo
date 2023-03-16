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

export const loginUser = async (credentials) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(credentials),
  };

  const data = await getPromise("/api/auth/login", option).catch(() => {
    return statusError;
  });

  if (parseInt(Number(data.status) / 100) === 2) {
    const status = data.status;
    const code = data.status;
    const json = data.data;

    return {
      status,
      code,
      json,
    };
  } else {
    return statusError;
  }
};
