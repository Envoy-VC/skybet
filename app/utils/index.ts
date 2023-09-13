export const formatTimestamp = (timestamp: number) => {
	const date = new Date(timestamp * 1000);
	const now = Date.now();
	const diff = Math.round((date.getTime() - now) / 1000);
	if (diff < 60) {
		return diff === 1 ? `Ends in ${diff} second` : `Ends in ${diff} seconds`;
	} else if (diff < 60 * 60) {
		return diff === 1
			? `Ends in ${Math.round(diff / 60)} minute`
			: `Ends in ${Math.round(diff / 60)} minutes`;
	} else if (diff < 24 * 60 * 60) {
		return diff === 1
			? `Ends in ${Math.round(diff / 3600)} hour`
			: `Ends in ${Math.round(diff / 3600)} hours`;
	} else if (diff < 7 * 24 * 60 * 60) {
		return diff === 1
			? `Ends in ${Math.round(diff / (24 * 60 * 60))} day`
			: `Ends in ${Math.round(diff / (24 * 60 * 60))} days`;
	} else if (diff < 30 * 7 * 24 * 60 * 60) {
		return diff === 1
			? `Ends in ${Math.round(diff / (7 * 24 * 60 * 60))} week`
			: `Ends in ${Math.round(diff / (7 * 24 * 60 * 60))} weeks`;
	} else {
		return 'Ended';
	}
};
