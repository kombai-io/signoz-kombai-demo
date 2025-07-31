import { ComponentTypes } from 'utils/permission';
import { ROLES } from 'types/roles';
import ROUTES from 'constants/routes';

export const UPDATE_COMPONENT_PERMISSION = 'UPDATE_COMPONENT_PERMISSION';
export const UPDATE_ROUTE_PERMISSION = 'UPDATE_ROUTE_PERMISSION';
export const RESET_PERMISSIONS = 'RESET_PERMISSIONS';

export interface UpdateComponentPermissionAction {
	type: typeof UPDATE_COMPONENT_PERMISSION;
	payload: {
		componentType: ComponentTypes;
		roles: ROLES[];
	};
}

export interface UpdateRoutePermissionAction {
	type: typeof UPDATE_ROUTE_PERMISSION;
	payload: {
		route: keyof typeof ROUTES;
		roles: ROLES[];
	};
}

export interface ResetPermissionsAction {
	type: typeof RESET_PERMISSIONS;
}

export type PermissionActions =
	| UpdateComponentPermissionAction
	| UpdateRoutePermissionAction
	| ResetPermissionsAction;
