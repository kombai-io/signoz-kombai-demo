import {
	applyMiddleware,
	compose,
	legacy_createStore as createStore,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import AppActions from 'types/actions';

import reducers, { AppState } from './reducers';

const persistConfig = {
	key: 'signoz-permission',
	storage,
	whitelist: ['permission'], // Only persist permission state
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers =
	(window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
	persistedReducer,
	composeEnhancers(
		applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
	),
);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

if (window !== undefined) {
	window.store = store;
}

export default store;
