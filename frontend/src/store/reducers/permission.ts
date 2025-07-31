import {
	defaultComponentPermission,
	defaultRoutePermission,
	ComponentTypes,
} from 'utils/permission';
import { ROLES } from 'types/roles';
import ROUTES from 'constants/routes';
import {
	PermissionActions,
	UPDATE_COMPONENT_PERMISSION,
	UPDATE_ROUTE_PERMISSION,
	RESET_PERMISSIONS,
} from 'types/actions/permission';

export interface PermissionState {
	componentPermission: Record<ComponentTypes, ROLES[]>;
	routePermission: Record<keyof typeof ROUTES, ROLES[]>;
}

const initialState: PermissionState = {
	componentPermission: defaultComponentPermission,
	routePermission: defaultRoutePermission,
};

const permissionReducer = (
	state = initialState,
	action: PermissionActions,
): PermissionState => {
	switch (action.type) {
		case UPDATE_COMPONENT_PERMISSION:
			return {
				...state,
				componentPermission: {
					...state.componentPermission,
					[action.payload.componentType]: action.payload.roles,
				},
			};

		case UPDATE_ROUTE_PERMISSION:
			return {
				...state,
				routePermission: {
					...state.routePermission,
					[action.payload.route]: action.payload.roles,
				},
			};

		case RESET_PERMISSIONS:
			return initialState;

		default:
			return state;
	}
};

export default permissionReducer;