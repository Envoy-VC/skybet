export const formatTimestamp = (timestamp: number) => {
	const date = new Date(timestamp * 1000);
	const now = Date.now();
	const diff = Math.round((date.getTime() - now) / 1000);
	if (diff < 60) {
		return diff === 1 ? `${diff} second` : `${diff} seconds`;
	} else if (diff < 60 * 60) {
		return diff === 1
			? `${Math.round(diff / 60)} minute`
			: `${Math.round(diff / 60)} minutes`;
	} else if (diff < 24 * 60 * 60) {
		return diff === 1
			? `${Math.round(diff / 3600)} hour`
			: `${Math.round(diff / 3600)} hours`;
	} else if (diff < 7 * 24 * 60 * 60) {
		return diff === 1
			? `${Math.round(diff / (24 * 60 * 60))} day`
			: `${Math.round(diff / (24 * 60 * 60))} days`;
	} else {
		return diff === 1
			? `${Math.round(diff / (7 * 24 * 60 * 60))} week`
			: `${Math.round(diff / (7 * 24 * 60 * 60))} weeks`;
	}
};
