import { AppAction } from './app';
import { GlobalTimeAction } from './globalTime';
import { LogsActions } from './logs';
import { MetricsActions } from './metrics';
import { TraceActions } from './trace';
import { PermissionActions } from './permission';

type AppActions =
	| AppAction
	| GlobalTimeAction
	| MetricsActions
	| TraceActions
	| LogsActions
	| PermissionActions;

export default AppActions;
