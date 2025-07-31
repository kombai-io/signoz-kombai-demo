// Store-dependent permission helpers
// This file is separate to avoid circular dependencies
import store from 'store';
import ROUTES from 'constants/routes';
import { ROLES } from 'types/roles';
import { ComponentTypes, defaultComponentPermission, defaultRoutePermission } from './index';

/**
 * Get current component permissions from Redux store
 * This replaces the static componentPermission export
 */
export const getComponentPermission = (): Record<ComponentTypes, ROLES[]> => {
	try {
		const state = store.getState();
		return state.permission?.componentPermission || defaultComponentPermission;
	} catch (error) {
		// Fallback to default permissions if store is not available
		return defaultComponentPermission;
	}
};

/**
 * Get current route permissions from Redux store
 * This replaces the static routePermission export
 */
export const getRoutePermission = (): Record<keyof typeof ROUTES, ROLES[]> => {
	try {
		const state = store.getState();
		return state.permission?.routePermission || defaultRoutePermission;
	} catch (error) {
		// Fallback to default permissions if store is not available
		return defaultRoutePermission;
	}
};

/**
 * Dynamic getters that always return current permissions from Redux store
 * These maintain the same interface as the original static exports
 */
export const componentPermission = new Proxy(
	{} as Record<ComponentTypes, ROLES[]>,
	{
		get(target, prop: string | symbol) {
			const permissions = getComponentPermission();
			return permissions[prop as ComponentTypes];
		},
		ownKeys() {
			return Object.keys(getComponentPermission());
		},
		has(target, prop: string | symbol) {
			const permissions = getComponentPermission();
			return prop in permissions;
		},
		getOwnPropertyDescriptor(target, prop: string | symbol) {
			const permissions = getComponentPermission();
			if (prop in permissions) {
				return {
					enumerable: true,
					configurable: true,
					value: permissions[prop as ComponentTypes],
				};
			}
			return undefined;
		},
	},
);

export const routePermission = new Proxy(
	{} as Record<keyof typeof ROUTES, ROLES[]>,
	{
		get(target, prop: string | symbol) {
			const permissions = getRoutePermission();
			return permissions[prop as keyof typeof ROUTES];
		},
		ownKeys() {
			return Object.keys(getRoutePermission());
		},
		has(target, prop: string | symbol) {
			const permissions = getRoutePermission();
			return prop in permissions;
		},
		getOwnPropertyDescriptor(target, prop: string | symbol) {
			const permissions = getRoutePermission();
			if (prop in permissions) {
				return {
					enumerable: true,
					configurable: true,
					value: permissions[prop as keyof typeof ROUTES],
				};
			}
			return undefined;
		},
	},
);