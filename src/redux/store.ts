import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApe'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import projectReducer from './features/projectSlice'
const persistConfig = {
  key: 'addTechnology',
  storage,
}
const persistedReducer = persistReducer(persistConfig,projectReducer)
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    addTechnology:persistedReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)