import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getDoctors = createAsyncThunk(
  "doctor/getDoctors",
  async (params = {}, thunkAPI) => {
    try {
      const query = new URLSearchParams(params).toString();

      const url = query
        ? `/doctors?${query}`
        : "/doctors";

      const res = await api.get(url);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);
export const getDoctorById = createAsyncThunk(
  "doctor/getDoctorById",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/doctors/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);
export const setAvailability = createAsyncThunk(
  "doctor/setAvailability",
  async (form, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/appointments/availability",
        form
      );

      return res.data;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to update availability"
      );
    }
  }
);
export const getDoctorProfile = createAsyncThunk(
  "doctor/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        "/doctor/me"
      );

      return res.data;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to fetch profile"
      );
    }
  }
);

/* UPDATE PROFILE */
export const updateDoctorProfile = createAsyncThunk(
  "doctor/updateProfile",
  async (form, { rejectWithValue }) => {
    try {
      const res = await api.put(
        "/doctor/profile",
        {
          ...form,

          clinicDetails: {
            clinicName:
              form.clinicName,

            address:
              form.address,

            city: form.city,

            contactNumber:
              form.contactNumber,
          },
        }
      );

      return res.data;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to update profile"
      );
    }
  }
);
const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [],
    doctor: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(getDoctorById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(getDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(setAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(setAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availability =
          action.payload.doctor.availability;
      })

      .addCase(setAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDoctorProfile.pending, (state) => {
  state.loading = true;
})

.addCase(
  getDoctorProfile.fulfilled,
  (state, action) => {
    state.loading = false;
    state.profile = action.payload;
  }
)

.addCase(
  getDoctorProfile.rejected,
  (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }
)

/* UPDATE PROFILE */
.addCase(updateDoctorProfile.pending, (state) => {
  state.loading = true;
})

.addCase(
  updateDoctorProfile.fulfilled,
  (state, action) => {
    state.loading = false;
    state.profile = action.payload;
  }
)

.addCase(
  updateDoctorProfile.rejected,
  (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }
);
  },
});

export default doctorSlice.reducer;