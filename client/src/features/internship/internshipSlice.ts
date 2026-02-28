import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import internshipService from "./internsipService";
import {
  type InternshipData,
  type MakeInternshipDTO,
  type UpdateInternshipDTO,
} from "../../b/b3";

export interface InternshipState {
  internships: InternshipData[];
  currentInternship: InternshipData | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export const initialState: InternshipState = {
  internships: [],
  currentInternship: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllInternships = createAsyncThunk<InternshipData[]>(
  "internships/getAll",
  async (_, thunkAPI) => {
    try {
      return await internshipService.getAllInternships();
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getInternshipById = createAsyncThunk<InternshipData, string>(
  "internships/getById",
  async (id, thunkAPI) => {
    try {
      return await internshipService.getInternshipById(id);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const makeInternship = createAsyncThunk<
  InternshipData,
  MakeInternshipDTO
>("internships/makeLog", async (newInternship, thunkAPI) => {
  try {
    return await internshipService.makeInternship(newInternship);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateInternship = createAsyncThunk<
  InternshipData,
  { id: string; internshipData: UpdateInternshipDTO }
>("internships/update", async (params, thunkAPI) => {
  try {
    return await internshipService.updateInternship(params);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteInternship = createAsyncThunk<string, string>(
  "internships/delete",
  async (id, thunkAPI) => {
    try {
      return await internshipService.deleteInternship(id);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const internshipSlice = createSlice({
  name: "internships",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ----------------------
      // Get All Internships
      // ----------------------
      .addCase(getAllInternships.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllInternships.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.internships = action.payload;
      })
      .addCase(getAllInternships.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // ----------------------
      // Get internship By Id
      // ----------------------
      .addCase(getInternshipById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getInternshipById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentInternship = action.payload;
      })
      .addCase(getInternshipById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // ----------------------
      // Make Internship
      // ----------------------
      .addCase(makeInternship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeInternship.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.internships.unshift(action.payload);
      })
      .addCase(makeInternship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // ----------------------
      // Update Internship
      // ----------------------

      .addCase(updateInternship.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.internships = state.internships.map((internship) =>
          internship.id === action.payload.id ? action.payload : internship,
        );
      })
      .addCase(updateInternship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // ----------------------
      // Delete Internship
      // ----------------------
      .addCase(deleteInternship.fulfilled, (state, action) => {
        state.internships = state.internships.filter(
          (internship) => internship.id !== action.payload,
        );
        state.isLoading = false;
      })
      .addCase(deleteInternship.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = internshipSlice.actions;
export default internshipSlice.reducer;
