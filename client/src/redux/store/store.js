import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/userSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { combineReducers } from "redux"
import { version } from "react";

const rootReducer = combineReducers({
    user: userSlice.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);