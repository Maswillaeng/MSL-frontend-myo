import { createSlice } from "@reduxjs/toolkit";
//useState 개념
let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  //   state 수정 함수 만들기
  reducers: {
    changeName(user) {
      user.name = "park";
    },
    changeAge(state, action) {
      // payload 꼭 써야함
      state.age += action.payload;
    },
  },
});
export let { changeName, changeAge } = user.actions;
export default user;
