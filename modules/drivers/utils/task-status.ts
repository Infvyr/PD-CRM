import { DriverTask, TaskStatus, TaskType } from '@proovia-crm/crm-api-types';

export const countTaskTypeStatus = (itemsArr: DriverTask[]) => {
	const completedTasks: DriverTask[] = [];
	const failedTasks: DriverTask[] = [];
	const deliveryTasks: DriverTask[] = [];
	const collectionTasks: DriverTask[] = [];

	for (let item of itemsArr) {
		if (
			item.status === TaskStatus.COMPLETED ||
			item.status === TaskStatus.COMPLETE
		) {
			completedTasks.push(item);
		}
		if (item.status === TaskStatus.FAILED) {
			failedTasks.push(item);
		}
		if (item.type === TaskType.DELIVERY) {
			deliveryTasks.push(item);
		}
		if (item.type === TaskType.COLLECTION) {
			collectionTasks.push(item);
		}
	}

	return [
		completedTasks.length,
		failedTasks.length,
		deliveryTasks.length,
		collectionTasks.length
	];
};
