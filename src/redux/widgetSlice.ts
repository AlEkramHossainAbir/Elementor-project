import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
interface WidgetState {
  widgets: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WidgetState = {
  widgets: [],
  status: "idle",
  error: null,
};

// API URLs
const LIST_URL = xyz_builder_widget_env.restApi.list.url;
const ADD_URL = xyz_builder_widget_env.restApi.create.url;
const CHANGE_ACTIVE_URL  = xyz_builder_widget_env.restApi.changeActive.url;

/** 
 * 🔹 Async thunk to **fetch widget data** 
 */
export const fetchWidgets = createAsyncThunk("widgets/fetchWidgets", async () => {
  const response = await fetch(LIST_URL);
  const data = await response.json();
  return data.data; // Extract only the `data` array
});

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
      
      .addCase(addWidget.fulfilled, (state, action) => {
        state.widgets.push(action.payload);
      })
      
      .addCase(toggleWidgetStatus.fulfilled, (state, action) => {
        const { widgetId, isActive } = action.payload;
        const widget = state.widgets.find((w) => w.id === widgetId);
        if (widget) widget.isActive = isActive;
      });
  },
});

// Export the async actions and reducer
export default widgetSlice.reducer;
