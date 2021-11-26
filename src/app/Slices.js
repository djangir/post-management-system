import { createSlice } from "@reduxjs/toolkit";

export const data = {
    value: ['value 1', 'value 2', 'value 3'],
    pendingData: ['value 4', 'value 5', 'value 6'],
    completeData: ['value 7', 'value 8', 'value 9']
};

// index , number of item, Value
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
        updateValue(state, action) {
            state.value.splice(action.payload[0], 1, action.payload[1]);
        },

        // pending data
        pendingData(state, action) {
            state.pendingData.unshift(action.payload);
        },
        removePendingData(state, action) {
            state.pendingData.splice(action.payload, 1);
        },
        updatePendingData(state, action) {
            state.pendingData.splice(action.payload[0], 1, action.payload[1]);
        },

        // Complete Data
        completeData(state, action) {
            state.completeData.unshift(action.payload);
        },
        removeCompleteData(state, action) {
            state.completeData.splice(action.payload, 1);
        }
        ,
        updateCompleteData(state, action) {
            state.completeData.splice(action.payload[0], 1, action.payload[1]);
        },

        // Delete Data Functions
        deleteAllData(state, action) {
            state.value = [];
            state.pendingData = [];
            state.completeData = [];
        },

        // delete 1 by 1
        deleteValue(state, action) {
            state.value = [];
        },
        deletePendingData(state, action) {
            state.pendingData = [];
        },
        deleteCompleteData(state, action) {
            state.completeData = [];
        },
    }
});

export default slice.reducer;
export const { addValue, removeValue, pendingData, removePendingData, completeData, removeCompleteData, updateCompleteData, updatePendingData, updateValue, deleteAllData, deleteValue, deletePendingData, deleteCompleteData } = slice.actions;