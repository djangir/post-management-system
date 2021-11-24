import { createSlice } from "@reduxjs/toolkit";

export const data = {
    value: ['value1'],
    pendingData: ['value2'],
    completeData: ['value3']
};

export const slice = createSlice({
    name: 'updateData',
    data,
    reducers: {
        addValue(state, action) {
            state.value.unshift(action.payload);
        },
        removeValue(state, action) {
            state.value.splice(action.payload, 1);
        },

        // pending data
        pendingData(state, action) {
            state.pendingData.unshift(action.payload);
        },
        removePendingData(state, action) {
            state.pendingData.splice(action.payload, 1);
        },

        // Complete Data
        completeData(state, action) {
            state.completeData.unshift(action.payload);
        },
        removeCompleteData(state, action) {
            state.completeData.splice(action.payload, 1);
        }
    }
});

export default slice.reducer;
export const { addValue, removeValue, pendingData, removePendingData, completeData, removeCompleteData } = slice.actions;