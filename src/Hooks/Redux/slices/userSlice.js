import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../Services/ApiService.js";
import { APIEndPoints } from "../../../Services/UrlConstants.js";

// Async action to login user
export const loginUser = createAsyncThunk("user/login", async (loginFormData, { rejectWithValue }) => {
  try {
    const response = await api.post(APIEndPoints.login,loginFormData,{withCredentials:true});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const registerUser = createAsyncThunk("user/register", async (registerformData, { rejectWithValue }) => {
  try {
    const response = await api.post(APIEndPoints.register,registerformData,{withCredentials:true});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

// Async action to check auth
export const checkAuth = createAsyncThunk("user/checkAuth", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post(APIEndPoints.getUserProfile,credentials,{withCredentials:true});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "User not authenticated");
  }
});

// Async action to refresh token
export const refreshToken = createAsyncThunk("user/refreshToken", async (credentials, { dispatch, rejectWithValue }) => {
  try {
    await api.post(APIEndPoints.refreshToken,credentials,{withCredentials:true});
    return await dispatch(checkAuth()).unwrap(); // Call checkAuth() after refreshing token
  } catch (error) {
    return rejectWithValue("Kindly log in.");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated:false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(refreshToken.fulfilled, (state,action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;