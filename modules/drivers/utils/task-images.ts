import { ImageType, VanImage } from '@proovia-crm/crm-api-types';

export const getTaskImages = (imgArray: VanImage[]) => {
	const itemImages: VanImage[] = [];
	const itemInVanImages: VanImage[] = [];
	const cancelTaskImages: VanImage[] = [];
	const podImages: VanImage[] = [];
	const warehouseImages: VanImage[] = [];
	const vanImages: VanImage[] = [];

	for (let images of imgArray) {
		if (images.type === ImageType.ITEM) {
			itemImages.push(images);
		}
		if (images.type === ImageType.ITEM_IN_VAN) {
			itemInVanImages.push(images);
		}
		if (images.type === ImageType.CANCEL_TASK) {
			cancelTaskImages.push(images);
		}
		if (images.type === ImageType.POD) {
			podImages.push(images);
		}
		if (images.type === ImageType.ITEM_IN_WAREHOUSE) {
			warehouseImages.push(images);
		}
		if (images.type === ImageType.VAN) {
			vanImages.push(images);
		}
	}

	return [
		itemImages,
		itemInVanImages,
		cancelTaskImages,
		podImages,
		warehouseImages,
		vanImages
	];
};
