import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../services/api";

/* GET PATIENT PROFILE */

export const getPatientProfile =
  createAsyncThunk(
    "patient/getProfile",

    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await api.get(
            "/patient/profile"
          );

        return res.data;

      } catch (err) {
        return rejectWithValue(
          err.response?.data
            ?.message ||
            "Failed to fetch profile"
        );
      }
    }
  );

/* UPDATE PATIENT PROFILE */

export const updatePatientProfile =
  createAsyncThunk(
    "patient/updateProfile",

    async (
      form,
      { rejectWithValue }
    ) => {
      try {
        const res =
          await api.put(
            "/patient/profile",
            form
          );

        return res.data;

      } catch (err) {
        return rejectWithValue(
          err.response?.data
            ?.message ||
            "Profile update failed"
        );
      }
    }
  );

const patientSlice =
  createSlice({
    name: "patient",

    initialState: {
      profile: null,

      loading: false,

      error: null,
    },

    reducers: {},

    extraReducers: (
      builder
    ) => {
      builder

        /* GET PROFILE */

        .addCase(
          getPatientProfile.pending,
          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          getPatientProfile.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.profile =
              action.payload;
          }
        )

        .addCase(
          getPatientProfile.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload;
          }
        )

        /* UPDATE PROFILE */

        .addCase(
          updatePatientProfile.pending,
          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          updatePatientProfile.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.profile =
              action.payload;
          }
        )

        .addCase(
          updatePatientProfile.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload;
          }
        );
    },
  });

export default patientSlice.reducer;