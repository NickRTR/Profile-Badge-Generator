import { getColorDependingOnContrast, getAccentColor } from "$lib/helper";

export async function get({ params }) {
    const iconName = params.title;
    const preserveIconColor = params.preserve;

    try {
        let backgroundColor = await getAccentColor(iconName);
        let iconColor = getColorDependingOnContrast(backgroundColor);
        if (preserveIconColor === "true") {
            iconColor = await getAccentColor(iconName);
            backgroundColor = getColorDependingOnContrast(iconColor);
        }
        return {
            status: 200,
            body: JSON.stringify(`https://img.shields.io/badge/${iconName}-${backgroundColor}?style=for-the-badge&logo=${iconName}&logoColor=${iconColor}`)
        }
    } catch (e) {
        return {
            status: 404,
        }
    }
}