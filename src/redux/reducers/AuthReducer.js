//상수 선언 : 액션의 유형을 나타냄
const SET_TOKEN = "set_token";
//객체 초기 상태
const AuthInitialState = {
  token: null,
};
// setToken 함수 내보내기
export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});
//
export const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
