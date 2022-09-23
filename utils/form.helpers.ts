const isFormComplete = (currentValue: unknown) => currentValue !== undefined;

export const hasRequiredFields = (array: undefined[] | unknown[]) =>
	!array?.every(isFormComplete);
