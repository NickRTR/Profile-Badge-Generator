import { getColorDependingOnContrast, getAccentColor } from "$lib/helper";

export function get({ params }) {
    const iconName = params.title;
    const preserveIconColor = params.preserve;

    try {
        let backgroundColor = getAccentColor(iconName);
        let iconColor = getColorDependingOnContrast(backgroundColor);
        if (preserveIconColor) {
            iconColor = getAccentColor(iconName);
            backgroundColor = getColorDependingOnContrast(iconColor);
        }
        return {
            status: 200,
            body: JSON.stringify(`https://img.shields.io/badge/${iconName}-${backgroundColor}?style=for-the-badge&logo=${iconName}&logoColor=${iconColor}`)
        }
    } catch (e) {
        return {
            status: 404,
            error: JSON.stringify(e)
        }
    }
}