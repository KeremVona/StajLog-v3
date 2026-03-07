import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import logService from "./logService";
import type { LogData } from "../../interfaces/LogInterfaces";

export interface LogState {
  logs: LogData[];
  currentLog: LogData | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export const initialState: LogState = {
  logs: [],
  currentLog: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllLogs = createAsyncThunk<LogData[]>(
  "logs/getAll",
  async (_, thunkAPI) => {
    try {
      return await logService.getAllLogs();
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getLogById = createAsyncThunk<LogData, string>(
  "logs/getById",
  async (id, thunkAPI) => {
    try {
      return await logService.getLogById(id);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const makeLog = createAsyncThunk<LogData, LogData>(
  "logs/makeLog",
  async (newLog, thunkAPI) => {
    try {
      return await logService.makeLog(newLog);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateLog = createAsyncThunk<
  LogData,
  { id: string; logData: LogData }
>("logs/update", async (params, thunkAPI) => {
  try {
    return await logService.updateLog(params);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteLog = createAsyncThunk<string, string>(
  "logs/delete",
  async (id, thunkAPI) => {
    try {
      return await logService.deleteLog(id);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logSlice = createSlice({
  name: "logs",
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
      // Get All Logs
      // ----------------------
      .addCase(getAllLogs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logs = action.payload;
      })
      .addCase(getAllLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // ----------------------
      // Get Log By Id
      // ----------------------
      .addCase(getLogById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getLogById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentLog = action.payload;
      })
      .addCase(getLogById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // ----------------------
      // Make Log
      // ----------------------
      .addCase(makeLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.logs.unshift(action.payload);
      })
      .addCase(makeLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // ----------------------
      // Update Log
      // ----------------------
      .addCase(updateLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.logs = state.logs.map((log) =>
          log.id === action.payload.id ? action.payload : log,
        );
      })
      .addCase(updateLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // ----------------------
      // Delete Log
      // ----------------------
      .addCase(deleteLog.fulfilled, (state, action) => {
        state.logs = state.logs.filter((log) => log.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteLog.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = logSlice.actions;
export default logSlice.reducer;
