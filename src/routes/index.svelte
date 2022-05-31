<script context="module">
    export async function load() {
        const res = await fetch("https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json");
        const data = await res.json();

        return {
            props: {
                icons: data.icons
            }
        }
    }
</script>

<script>
    export let icons;

    let title = "";
    let inputColor = "#FFFFFF";

    // undefinded to hide banner until "getBanner" is called
    let url;

    function getBanner() {
        let backgroundColor = getBackgroundColor()
        let iconColor = getIconColorDependingOnBackground(backgroundColor);

        url = `https://img.shields.io/badge/${title}-${backgroundColor}?style=for-the-badge&logo=${title}&logoColor=${iconColor}`;
    }

    function getBackgroundColor() {
        // loop through all available icons
        for (let i = 0; i < icons.length; i++) {
            // find the right icon and return it's color value
            if (icons[i].title.toLowerCase() === title.toLowerCase()) {
                return icons[i].hex.toString();
            }
        }
    }

    function getIconColorDependingOnBackground(bgColor) {
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
</script>

<main>
    <form>
        <input type="text" placeholder="title" bind:value={title}>
        <input type="color" placeholder="icon color" bind:value={inputColor} >
        <button type="submit" on:click|preventDefault={getBanner}>Create Banner</button>
    </form>

    {#if url}
        <img src={url} alt={title} title={title}>
    {/if}
</main>