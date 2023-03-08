import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { REGISTER_USER } from "./types";
//useState 개념
let user = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false, // 로그인 상태
    currentUser: null, // 현재 로그인한 사용자 정보
  },

  // reducers: {
  //   registerUser(dataToSubmit) {
  //     const request = axios
  //       .post("/api/auth/sign", dataToSubmit)
  //       .then((response) => response.data);

  //     return {
  //       type: REGISTER_USER,
  //       payload: request,
  //     };
  //   },
  // },
  reducers: {},
});

// 서버 데이터 전송
export const registerUser = (dataToSubmit) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/sign", dataToSubmit);
    dispatch({
      type: REGISTER_USER,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export default configureStore({
  reducer: {
    user: user.reducer,
  },
});
