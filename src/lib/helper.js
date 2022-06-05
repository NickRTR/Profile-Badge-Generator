import { toast } from "@zerodevx/svelte-toast";

export function copy(text) {
    navigator.clipboard.writeText(text);
    toast.push("Copied URL to clipboard!");
}

// colors

export function getIconColorDependingOnBackground(bgColor) {
    // sets the icon color either black or white, depending on the banner's background
    let rgbColor = hexToRGB(bgColor); // convert hex color to an rgb color
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