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

    let title = "Svelte";
    let color;
    let url;

    function getBanner() {
        findColor();
        url = `https://img.shields.io/badge/${title}-${color}?style=for-the-badge&logo=${title}&logoColor=fff`;
    }

    function findColor() {
        icons.forEach(icon => {
            if (icon.title.toLowerCase() === title.toLowerCase()) {
                color = icon.hex;
            }
        });
    }
</script>

<main>
    <form>
        <input type="text" placeholder="title" bind:value={title} on:input={findColor(title)}>
        <button type="submit" on:click|preventDefault={getBanner}>Search</button>
    </form>
    {#if url}
        <img src={url} alt={title} title={title}>
    {/if}
</main>