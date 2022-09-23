import { isString } from 'lodash';
import moment from 'moment';

export const momentFormatDateTime = (date: string, momentFormat: string) => {
	if (!isString(date)) return;
	return moment(date).format(momentFormat);
};
