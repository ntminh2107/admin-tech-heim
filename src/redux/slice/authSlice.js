import { getCurrentUserAPI, loginAPI } from "../../services/loginAPI";
import { createAppSlice } from "../appSlice";

const initialState = {
  currentUser: null,
  token: null,
  address: null,
  loading: true,
  addressList: [],
  isLoggedIn: false,
  deleteAddressMsg: "",
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    logoutAction: create.reducer(() => {
      localStorage.removeItem("token");
      return initialState;
    }),
    loginThunk: create.asyncThunk(async ({ email, password }, { dispatch }) => {
      const res = await loginAPI({ email, password });
      if (res.status === 202) {
        localStorage.setItem("token", res.data);
        dispatch(getCurrentUserThunk());
      }
      return res;
    }),
    getCurrentUserThunk: create.asyncThunk(
      async () => {
        const res = await getCurrentUserAPI();
        if (res.status === 401) {
          localStorage.removeItem("token");
        }
        return res;
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: false,
          };
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload;
          return {
            ...state,
            loading: false,
            status: status,
            currentUser: data,
          };
        },
        rejected: (state) => {
          return {
            ...state,
            loading: false,
          };
        },
      }
    ),
  }),
});

export const { logoutAction, loginThunk, getCurrentUserThunk } =
  authSlice.actions;
export default authSlice.reducer;
