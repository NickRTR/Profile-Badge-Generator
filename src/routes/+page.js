export async function load({ fetch }) {
	const res = await fetch(
		"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json"
	);
	const data = await res.json();

	return {
		icons: data.icons
	};
}
