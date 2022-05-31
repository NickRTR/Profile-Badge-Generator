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
    let backgroundColor;
    let iconColor = "FFFFFF";

    let url;

    function getBanner() {
        findColor();
        if (iconColor.startsWith("#")) {
            iconColor = iconColor.substring(1);
        }
        url = `https://img.shields.io/badge/${title}-${backgroundColor}?style=for-the-badge&logo=${title}&logoColor=${iconColor}`;
    }

    function findColor() {
        icons.forEach(icon => {
            if (icon.title.toLowerCase() === title.toLowerCase()) {
                backgroundColor = icon.hex;
            }
        });
    }
</script>

<main>
    <form>
        <input type="text" placeholder="title" bind:value={title}>
        <input type="color" placeholder="icon color" bind:value={iconColor} >
        <button type="submit" on:click|preventDefault={getBanner}>Search</button>
    </form>

    {#if url}
        <img src={url} alt={title} title={title}>
    {/if}
</main>