import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './Slices';
import { data } from './Slices';

export const store = configureStore({
    reducer: sliceReducer,
    preloadedState: data
});