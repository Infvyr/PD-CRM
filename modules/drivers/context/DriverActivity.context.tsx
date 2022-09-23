import moment from 'moment';
import { createContext } from 'react';

export interface DriverActivity {
	id: number;
	selectedDate: moment.Moment;
}

const DriverActivityContext = createContext<DriverActivity>({
	id: 0,
	selectedDate: moment()
});

if (process.env.NODE_ENV !== 'production') {
	DriverActivityContext.displayName = 'DriverActivityContext';
}

export default DriverActivityContext;
