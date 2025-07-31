import './ReactI18';
import 'styles.scss';

import AppRoutes from 'AppRoutes';
import { AxiosError } from 'axios';
import { ThemeProvider } from 'hooks/useDarkMode';
import { AppProvider } from 'providers/App/App';
import TimezoneProvider from 'providers/Timezone';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'store';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry(failureCount, error): boolean {
				if (
					// in case of manually throwing errors please make sure to send error.response.status
					error instanceof AxiosError &&
					error.response?.status &&
					(error.response?.status >= 400 || error.response?.status <= 499)
				) {
					return false;
				}
				return failureCount < 2;
			},
		},
	},
});

const container = document.getElementById('root');

if (container) {
	const root = createRoot(container);

	root.render(
		<HelmetProvider>
			<ThemeProvider>
				<TimezoneProvider>
					<QueryClientProvider client={queryClient}>
						<Provider store={store}>
							<PersistGate loading={null} persistor={persistor}>
								<AppProvider>
									<AppRoutes />
								</AppProvider>
							</PersistGate>
						</Provider>
					</QueryClientProvider>
				</TimezoneProvider>
			</ThemeProvider>
		</HelmetProvider>,
	);
}