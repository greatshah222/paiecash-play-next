export const removeHexColorSymbol = (color) => {
	if (color?.includes("#")) {
		// if hex color we have to remove # based on rmp docs
		/* The above parameters accept either HEX color code (example: 'FF0000') or rgba color code (example: 'rgba(0, 255, 0, 0.8)') for transparency support.
           ; */
		return color.split("#")[1];
	}
	return color;
};
