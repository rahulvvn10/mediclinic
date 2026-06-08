import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* GET SLOTS */
export const getSlots = createAsyncThunk(
  "appointment/getSlots",
  async ({ doctorId, date }) => {
    const res = await api.get(
      `/appointments/slots?doctorId=${doctorId}&date=${date}`
    );
    return res.data;
  }
);

/* BOOK APPOINTMENT */
export const bookAppointment = createAsyncThunk(
  "appointment/book",
  async ({ doctorId, date, time }) => {
    const res = await api.post("/appointments/book", {
      doctorId,
      date,
      time,
    });
    return res.data;
  }
);

/* GET PATIENT APPOINTMENTS */
export const getMyAppointments = createAsyncThunk(
  "appointment/my",
  async () => {
    const res = await api.get("/appointments/myappointments");
    return res.data;
  }
);

/* GET DOCTOR APPOINTMENTS */
export const getDoctorAppointments = createAsyncThunk(
  "appointment/doctor",
  async (date) => {
    const res = await api.get(`/appointments/doctor?date=${date}`);
    return res.data;
  }
);
export const getAvailability = createAsyncThunk(
  "doctor/getAvailability",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/doctor/me");

      return res.data.availability;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
        "Failed to fetch availability"
      );
    }
  }
);
export const updateAppointmentStatus = createAsyncThunk(
  "appointment/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/appointments/${id}`, { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);
export const cancelAppointment =
  createAsyncThunk(
    "appointment/cancel",

    async (
      id,
      { rejectWithValue }
    ) => {
      try {

        const res =
          await api.patch(
            `/appointments/${id}`,
            {
              status:
                "cancelled",
            }
          );

        return res.data;

      } catch (err) {
        return rejectWithValue(
          err.response?.data
            ?.message ||
            "Cancellation failed"
        );
      }
    }
  );
  export const addPrescription =
  createAsyncThunk(
    "appointment/addPrescription",

    async (
      { id, data },
      { rejectWithValue }
    ) => {
      try {

        const res =
          await api.patch(
            `/appointments/${id}/prescription`,
            data
          );

        return res.data;

      } catch (err) {
        return rejectWithValue(
          err.response?.data
            ?.message ||
            "Failed to add prescription"
        );
      }
    }
  );

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    slots: [],
    appointments: [],
    doctorAppointments: null,
 upcoming: [],
  history: [],
    loadingSlots: false,
    bookingLoading: false,
    loadingAppointments: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* SLOTS */
      .addCase(getSlots.pending, (state) => {
        state.loadingSlots = true;
      })
      .addCase(getSlots.fulfilled, (state, action) => {
        state.loadingSlots = false;
        state.slots = action.payload;
      })
      .addCase(getSlots.rejected, (state) => {
        state.loadingSlots = false;
      })

      /* BOOK */
      .addCase(bookAppointment.pending, (state) => {
        state.bookingLoading = true;
      })
      .addCase(bookAppointment.fulfilled, (state) => {
        state.bookingLoading = false;
      })
      .addCase(bookAppointment.rejected, (state) => {
        state.bookingLoading = false;
      })

      /* PATIENT */
      .addCase(getMyAppointments.pending, (state) => {
        state.loadingAppointments = true;
      })
      .addCase(
  getMyAppointments.fulfilled,
  (state, action) => {

    state.loadingAppointments =
      false;

    state.upcoming =
      action.payload.upcoming;

    state.history =
      action.payload.history;
  }
)
      .addCase(getMyAppointments.rejected, (state,action) => {
        state.loadingAppointments = false;
        state.error=action.payload;
      })

      /* DOCTOR */
      .addCase(getDoctorAppointments.fulfilled, (state, action) => {
        state.doctorAppointments = action.payload;
      })
      .addCase(getAvailability.pending, (state) => {
  state.loading = true;
})

.addCase(getAvailability.fulfilled, (state, action) => {
  state.loading = false;
  state.availability = action.payload;
})

.addCase(getAvailability.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
.addCase(
  cancelAppointment.fulfilled,
  (state, action) => {

    const updated =
      action.payload
        .appointment;

    state.appointments =
      state.appointments.map(
        (a) =>
          a._id ===
          updated._id
            ? updated
            : a
      );
  }
)
.addCase(
  addPrescription.fulfilled,
  (state, action) => {

    const updated =
      action.payload
        .appointment;

    /* UPDATE UPCOMING */

    state.upcoming =
      state.upcoming.filter(
        (a) =>
          a._id !==
          updated._id
      );

    /* UPDATE HISTORY */

    state.history = [
      updated,
      ...state.history,
    ];
  }
);
  },
})


export default appointmentSlice.reducer;