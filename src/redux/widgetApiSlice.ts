// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
interface WidgetState {
    widgets: any[];
    widgetDetails: Record<number, any>; // Stores details for each widget by ID
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }

const initialState: WidgetState = {
  widgets: [],
  widgetDetails: {},
  status: "idle",
  error: null,
};

// API URLs
const LIST_URL = xyz_builder_widget_env.restApi.list.url;
const ADD_URL = xyz_builder_widget_env.restApi.create.url;
const CHANGE_ACTIVE_URL  = xyz_builder_widget_env.restApi.changeActive.url;
const DETAILS_URL = xyz_builder_widget_env.restApi.details.url;
const STORE_URL = xyz_builder_widget_env.restApi.store.url;

/** 
 * 🔹 Async thunk to **store a new widget**  
 */
export const storeWidget = createAsyncThunk(
  "widgets/storeWidget",
  async ({ widgetId, widgetData }: { widgetId: number; widgetData: any }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${STORE_URL}/${widgetId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(widgetData),
      });

      if (!response.ok) throw new Error("Failed to store widget");

      const storedWidget = await response.json();
      return storedWidget.data; // Assuming API response contains `data`
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


/** 
 * 🔹 Async thunk to **fetch widget data** 
 */
export const fetchWidgets = createAsyncThunk("widgets/fetchWidgets", async () => {
  const response = await fetch(LIST_URL);
  const data = await response.json();
  return data.data; // Extract only the `data` array
});


/**
 * 🔹 Fetch Widget Details (for a single widget)
 */
export const fetchWidgetDetails = createAsyncThunk(
    "widgets/fetchWidgetDetails",
    async (widgetId: number, { rejectWithValue }) => {
      try {
        const response = await fetch(`${DETAILS_URL}/${widgetId}`);
        if (!response.ok) throw new Error("Failed to fetch widget details");
  
        const data = await response.json();
        return { widgetId, details: data.data };
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

/** 
 * 🔹 Async thunk to **add a new widget**  
 * Dispatch this action when submitting the form
 */
export const addWidget = createAsyncThunk(
  "widgets/addWidget",
  async (widgetData: { title: string; icon: string; description: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(ADD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(widgetData),
      });

      if (!response.ok) throw new Error("Failed to create widget");

      const newWidget = await response.json();
      return newWidget.data; // Assuming API response contains `data`
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
/**
 * 🔹 Toggle Widget Status (Activate/Deactivate)
 */
export const toggleWidgetStatus = createAsyncThunk(
    "widgets/toggleWidgetStatus",
    async ({ widgetId, isActive }: { widgetId: number; isActive: boolean }, { rejectWithValue }) => {
        console.log("isActive",isActive,widgetId)
      try {
        const response = await fetch(`${CHANGE_ACTIVE_URL}/${widgetId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive }),
        });
  
        if (!response.ok) throw new Error("Failed to change status");
  
        return { widgetId, isActive };
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

// Create the slice
const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWidgets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWidgets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.widgets = action.payload;
      })
      .addCase(fetchWidgets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch widgets";
      })
      
      .addCase(fetchWidgetDetails.fulfilled, (state, action) => {
        const { widgetId, details } = action.payload;
        state.widgetDetails[widgetId] = details;
      })

      .addCase(addWidget.fulfilled, (state, action) => {
        state.widgets.push(action.payload);
      })

      .addCase(toggleWidgetStatus.fulfilled, (state, action) => {
        const { widgetId, isActive } = action.payload;
        const widget = state.widgets.find((w) => w.id === widgetId);
        if (widget) widget.isActive = isActive;
      })
      .addCase(storeWidget.fulfilled, (state, action) => {
        state.widgets.push(action.payload);
      })
      .addCase(storeWidget.rejected, (state, action) => {
        state.error = action.payload as string;
      })
  },
});

// Export the async actions and reducer
export default widgetSlice.reducer;
