// Reformat category name to map to icon map
function toCamelCase(originalName) {
	if (!originalName) {
		return "";
	}

	const words = originalName
		.toLowerCase()
		.split(" ")
		.filter((word) => word.length > 0);

	if (words.length === 0) {
		return "";
	}

	let reformatted = words[0];

	for (let i = 1; i < words.length; i++) {
		const word = words[i];
		reformatted += word.charAt(0).toUpperCase() + word.slice(1);
	}

	return reformatted;
}

export default toCamelCase;
