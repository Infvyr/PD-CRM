import { useZohoOrders } from './useZohoOrders';
import { useDrivers } from '../../drivers/hooks/useDrivers';
import { ZohoTaskType } from '@proovia-crm/crm-api-types';

export function useClaimInfoByZohoOrder(zohoOrderId: string) {
	const { data: drivers, error: errorDrivers } = useDrivers();
	const { data: order, error: errorZohoOrders } = useZohoOrders({
		orderId: zohoOrderId
	});
	const collectionTask = order?.tasks?.find(
		(task) => task.type === ZohoTaskType.COLLECTION
	);
	const deliveryTask = order?.tasks?.find(
		(task) => task.type === ZohoTaskType.DELIVERY
	);

	const orderDrivers = drivers?.data.filter((driver) =>
		[collectionTask?.driverId, deliveryTask?.driverId].includes(
			driver.zohoDriverId
		)
	);

	const collectionDriver = orderDrivers?.find(
		(driver) => driver.zohoDriverId === collectionTask?.driverId
	);
	const deliveryDriver = orderDrivers?.find(
		(driver) => driver.zohoDriverId === deliveryTask?.driverId
	);

	const paymentType = deliveryTask?.paymentType;

	const loading =
		!!zohoOrderId &&
		((!drivers && !errorDrivers) || (!order && !errorZohoOrders));

	return {
		drivers,
		order,
		collectionTask,
		deliveryTask,
		collectionDriver,
		deliveryDriver,
		paymentType,
		loading
	};
}
