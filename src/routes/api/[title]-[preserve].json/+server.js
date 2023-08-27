import { getColorDependingOnContrast, getAccentColor } from "$lib/helper";

export async function GET({ params }) {
	const iconName = params.title;
	const preserveIconColor = params.preserve;

	const icons = await fetchIcons();

	try {
		let backgroundColor = await getAccentColor(iconName, icons);
		let iconColor = getColorDependingOnContrast(backgroundColor);
		if (preserveIconColor === "true") {
			iconColor = await getAccentColor(iconName, icons);
			backgroundColor = getColorDependingOnContrast(iconColor);
		}
		return new Response(
			JSON.stringify(
				`https://img.shields.io/badge/${iconName}-${backgroundColor}?style=for-the-badge&logo=${iconName}&logoColor=${iconColor}`
			)
		);
	} catch (e) {
		return new Response(undefined, { status: 404 });
	}
}

// fetch all available icons from simpleicons.com
async function fetchIcons() {
	const res = await fetch(
		"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json"
	);
	const data = await res.json();
	return data.icons;
}
