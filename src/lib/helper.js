import toast from "svelte-french-toast";

export function copy(text) {
	navigator.clipboard.writeText(text);
	toast.success("Copied URL to clipboard!");
}

export function copyMarkdownImage(url, title) {
	// if title has space (example: Godot Engine) copy as html image
	if (url.indexOf(" ") >= 0) {
		navigator.clipboard.writeText(`<img src="${url}" alt="${title}">`);
	} else {
		navigator.clipboard.writeText(`![${title}](${url})`);
	}
	toast.success("Copied Markdown image to clipboard!");
}

export function getSearchSuggestions(title, icons) {
	let searchSuggestions = [];
	if (title === "") return searchSuggestions;
	searchSuggestions = icons.filter((icon) => {
		const lowerCaseTitle = icon.title.toLowerCase();
		const lowerCaseSearchTerm = title.toLowerCase();
		return lowerCaseTitle.startsWith(lowerCaseSearchTerm);
	});
	if (searchSuggestions.length > 0) {
		return searchSuggestions.slice(0, 10).map((icon) => icon.title);
	}
	searchSuggestions = icons.filter((icon) => {
		const lowerCaseTitle = icon.title.toLowerCase();
		const lowerCaseSearchTerm = title.toLowerCase();
		return (
			lowerCaseTitle.includes(lowerCaseSearchTerm) ||
			removeAccents(lowerCaseTitle).includes(removeAccents(lowerCaseSearchTerm))
		);
	});
	return searchSuggestions.slice(0, 10).map((icon) => icon.title);
}

function removeAccents(input) {
	return input
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

export async function getAccentColor(iconName, icons) {
	const matchedIcon = icons.find((icon) => icon.title.toLowerCase() === iconName.toLowerCase());
	return matchedIcon.hex;
}

export function getColorDependingOnContrast(color) {
	// sets the icon color either black or white, depending on the banner's background color
	const rgbColor = hexToRGB(color);
	const luminance = rgbColor.r * 0.299 + rgbColor.g * 0.587 + rgbColor.b * 0.114;
	return luminance > 150 ? "000000" : "FFFFFF";
}

function hexToRGB(color) {
	// divide Hex color into r, g and b
	var dividedHexColor = color.match(/.{1,2}/g);

	// parse r, g and b to int on base 16
	return {
		r: parseInt(dividedHexColor[0], 16),
		g: parseInt(dividedHexColor[1], 16),
		b: parseInt(dividedHexColor[2], 16)
	};
}
