export const addZeroes = (num) => {
	// https://stackoverflow.com/questions/24038971/add-00-tofixed-only-if-number-has-less-than-two-decimal-places
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

	// return Number.parseFloat(num).toFixed(2) * 1;
	return Number(num).toFixed(2);
};
