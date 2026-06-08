import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../services/api";
export const getPendingDoctors =
  createAsyncThunk(
    "admin/pendingDoctors",

    async () => {

      const res =
        await api.get(
          "/admin/pending-doctors"
        );

      return res.data;
    }
  );

export const approveDoctor =
  createAsyncThunk(
    "admin/approveDoctor",

    async (id) => {

      const res =
        await api.put(
        `/admin/approve/${id}`
        );

      return {
        id,
        ...res.data,
      };
    }
  );
export const getAdminStats =
  createAsyncThunk(
    "admin/stats",

    async () => {

      const res =
        await api.get(
          "/admin/stats"
        );

      return res.data;
    }
  );
export const getDoctorById =
  createAsyncThunk(
    "admin/getDoctor",

    async (id) => {

      const res =
        await api.get(
          `/admin/doctor/${id}`
        );

      return res.data;
    }
  );
  export const rejectDoctor =
  createAsyncThunk(
    "admin/rejectDoctor",

    async (id) => {

      const res =
        await api.delete(
          `/admin/reject/${id}`
        );

      return {
        id,
        ...res.data,
      };
    }
  );
  export const getApprovedDoctors =
  createAsyncThunk(
    "admin/getApprovedDoctors",

    async (
      _,
      { rejectWithValue }
    ) => {

      try {

        const res =
          await api.get(
            "/admin/approved-doctors"
          );

        return res.data;

      } catch (err) {

        return rejectWithValue(
          err.response?.data
            ?.message ||
          err.message
        );

      }
    }
  );

  export const activateDoctor =
  createAsyncThunk(
    "admin/activateDoctor",

    async (
      id,
      { rejectWithValue }
    ) => {

      try {

        const res =
          await api.patch(
            `/admin/activate/${id}`
          );

        return {
          id,
          ...res.data,
        };

      } catch (err) {

        return rejectWithValue(
          err.response?.data
            ?.message ||
          err.message
        );

      }
    }
  );
  export const deactivateDoctor =
  createAsyncThunk(
    "admin/deactivateDoctor",

    async (
      id,
      { rejectWithValue }
    ) => {

      try {

        const res =
          await api.patch(
            `/admin/deactivate/${id}`
          );

        return {
          id,
          ...res.data,
        };

      } catch (err) {

        return rejectWithValue(
          err.response?.data
            ?.message ||
          err.message
        );

      }
    }
  );
const adminSlice =
  createSlice({
    name: "admin",

    initialState: {
      stats: null,
       pendingDoctors: [],
        approvedDoctors: [],
       selectedDoctor: null,
      loading: false,
      error: null,
    },

    reducers: {},

    extraReducers:
      (builder) => {

        builder

          .addCase(
            getAdminStats.pending,
            (state) => {

              state.loading =
                true;
            }
          )

          .addCase(
            getAdminStats.fulfilled,
            (
              state,
              action
            ) => {

              state.loading =
                false;

              state.stats =
                action.payload;
            }
          )

          .addCase(
            getAdminStats.rejected,
            (
              state,
              action
            ) => {

              state.loading =
                false;

              state.error =
                action.error.message;
            }
          )
          .addCase(
  getPendingDoctors.fulfilled,
  (state, action) => {

    state.pendingDoctors =
      action.payload;
  }
)

.addCase(
  approveDoctor.fulfilled,
  (state, action) => {

    state.pendingDoctors =
      state.pendingDoctors.filter(
        (doctor) =>
          doctor._id !==
          action.payload.id
      );
  }
)
.addCase(
  getDoctorById.fulfilled,
  (state, action) => {

    state.selectedDoctor =
      action.payload;
  }
)
.addCase(
  getApprovedDoctors.fulfilled,
  (state, action) => {

    state.approvedDoctors =
      action.payload;
  }
)

.addCase(
  deactivateDoctor.fulfilled,
  (state, action) => {

    const doctor =
      state.approvedDoctors.find(
        (d) =>
          d._id ===
          action.payload.id
      );

    if (doctor) {

      doctor.isActive =
        false;

    }
  }
)

.addCase(
  activateDoctor.fulfilled,
  (state, action) => {

    const doctor =
      state.approvedDoctors.find(
        (d) =>
          d._id ===
          action.payload.id
      );

    if (doctor) {

      doctor.isActive =
        true;

    }
  }
);
      },
  });

export default
  adminSlice.reducer;