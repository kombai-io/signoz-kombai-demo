import { Dispatch } from 'redux';
import { ComponentTypes } from 'utils/permission';
import { ROLES } from 'types/roles';
import ROUTES from 'constants/routes';
import {
	UPDATE_COMPONENT_PERMISSION,
	UPDATE_ROUTE_PERMISSION,
	RESET_PERMISSIONS,
	UpdateComponentPermissionAction,
	UpdateRoutePermissionAction,
	ResetPermissionsAction,
} from 'types/actions/permission';

export const updateComponentPermission = (
	componentType: ComponentTypes,
	roles: ROLES[],
) => (dispatch: Dispatch<UpdateComponentPermissionAction>): void => {
	dispatch({
		type: UPDATE_COMPONENT_PERMISSION,
		payload: {
			componentType,
			roles,
		},
	});
};

export const updateRoutePermission = (
	route: keyof typeof ROUTES,
	roles: ROLES[],
) => (dispatch: Dispatch<UpdateRoutePermissionAction>): void => {
	dispatch({
		type: UPDATE_ROUTE_PERMISSION,
		payload: {
			route,
			roles,
		},
	});
};

export const resetPermissions = () => (
	dispatch: Dispatch<ResetPermissionsAction>,
): void => {
	dispatch({
		type: RESET_PERMISSIONS,
	});
};