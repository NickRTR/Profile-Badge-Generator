import { toast } from "@zerodevx/svelte-toast";
import { icons } from "$lib/stores";

let allIcons = [];

icons.subscribe(value => {
    allIcons = value
});

export function copy(text) {
    navigator.clipboard.writeText(text);
    toast.push("Copied URL to clipboard!");
}

export function copyMarkdownImage(url, title) {
    // if title has space (example: Godot Engine) copy as html image
    if (url.indexOf(' ') >= 0) {
        navigator.clipboard.writeText(`<img src="${url}" alt="${title}">`);
    } else {
        navigator.clipboard.writeText(`![${title}](${url})`);
    }
    toast.push("Copied Markdown image to clipboard!");
}

// input

export function getSearchSuggestions(title) {
    let searchSuggestions = [];
    if (title !== "") {
        for (let i in allIcons) {
            // filter the icons to fitting ones and limit max suggestions to 10
            if (allIcons[i].title.toLowerCase().startsWith(title.toLowerCase()) && searchSuggestions.length < 10) {
                searchSuggestions = [...searchSuggestions, allIcons[i].title];
            }
        }
    }
    return searchSuggestions;
}

// colors

export async function getAccentColor(iconName) {
    const allIcons = await fetchIcons();

    // loop through all available icons
    for (let i in allIcons) {
        // find the right icon and return it's color value
        if (allIcons[i].title.toLowerCase() === iconName.toLowerCase()) {
            return allIcons[i].hex.toString();
        }
    }
}

export function getColorDependingOnContrast(color) {   
    // sets the icon color either black or white, depending on the banner's background
    let rgbColor = hexToRGB(color); // convert hex color to an rgb color
    if ((rgbColor.r * 0.299 + rgbColor.g * 0.587 + rgbColor.b * 0.114) > 150) {
        return "000000";
    } else {
        return "FFFFFF";
    }
}

function hexToRGB(color) {
    // divide Hex color into r, g and b
    var dividedHexColor = color.match(/.{1,2}/g);  dividedHexColor
    
    // parse r, g and b to int on base 16
    return { 
        r: parseInt(dividedHexColor[0], 16),
        g: parseInt(dividedHexColor[1], 16),
        b: parseInt(dividedHexColor[2], 16),
    }
}

// fetch icons
async function fetchIcons() {
    const res = await fetch("https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json");
    const data = await res.json();
    return data.icons;
}
