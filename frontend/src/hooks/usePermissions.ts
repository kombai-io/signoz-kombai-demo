import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducers';
import { ComponentTypes, defaultComponentPermission, defaultRoutePermission } from 'utils/permission';
import { ROLES } from 'types/roles';
import ROUTES from 'constants/routes';
import {
	updateComponentPermission,
	updateRoutePermission,
	resetPermissions,
} from 'store/actions/permission';

export const usePermissions = () => {
	const dispatch = useDispatch();
	const permissionState = useSelector((state: AppState) => state.permission);
	
	// Use default permissions as fallback
	const componentPermission = permissionState?.componentPermission || defaultComponentPermission;
	const routePermission = permissionState?.routePermission || defaultRoutePermission;

	const updateComponentPermissions = (
		componentType: ComponentTypes,
		roles: ROLES[],
	) => {
		dispatch(updateComponentPermission(componentType, roles));
	};

	const updateRoutePermissions = (
		route: keyof typeof ROUTES,
		roles: ROLES[],
	) => {
		dispatch(updateRoutePermission(route, roles));
	};

	const resetAllPermissions = () => {
		dispatch(resetPermissions());
	};

	return {
		componentPermission,
		routePermission,
		updateComponentPermissions,
		updateRoutePermissions,
		resetAllPermissions,
	};
};