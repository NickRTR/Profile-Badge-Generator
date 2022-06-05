<script context="module">
    export async function load({ fetch }) {
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
    import { copy, getColorDependingOnContrast } from "$lib/helper";

    export let icons;

    let title = "";
    let preserveIconColor = false;

    // undefinded to hide banner until "getBanner" is called
    let url;
    let iconNotFound = false;
    let searchSuggestions = [];

    function getSearchSuggestions() {
        searchSuggestions = [];
        if (title !== "") {
            for (let i = 0; i < icons.length; i++) {
                // filter the icons to fitting ones and limit max suggestions to 10
                if (icons[i].title.toLowerCase().startsWith(title.toLowerCase()) && searchSuggestions.length < 10) {
                    searchSuggestions = [...searchSuggestions, icons[i].title];
                }
            }
        }
    }

    function getBanner(iconName) {
        url = undefined; // remove old banner
        title = iconName; // update title if suggestion was pressed
        try {
            let backgroundColor = getAccentColor(iconName);
            let iconColor = getColorDependingOnContrast(backgroundColor);
            if (preserveIconColor) {
                iconColor = getAccentColor(iconName);
                backgroundColor = getColorDependingOnContrast(iconColor);
            }
            url = `https://img.shields.io/badge/${iconName}-${backgroundColor}?style=for-the-badge&logo=${iconName}&logoColor=${iconColor}`;
        } catch (e) {
            iconNotFound = true;
            console.error(e);
        }
    }

    function getAccentColor(iconName) {
        // loop through all available icons
        for (let i = 0; i < icons.length; i++) {
            // find the right icon and return it's color value
            if (icons[i].title.toLowerCase() === iconName.toLowerCase()) {
                return icons[i].hex.toString();
            }
        }
    }
</script>

<main>
    <h1>Profile Badge Generator</h1>

    <form>
        <div class="search">
            <p class="inputLabel">Search for a brand</p>
            <input type="text" placeholder="title" name="title" bind:value={title} on:input={getSearchSuggestions}>
            <div class="suggestions">
                {#each searchSuggestions as suggestion}
                    <div class="suggestion"><button type="submit" on:click|preventDefault={() => {getBanner(suggestion)}}>{suggestion}</button></div>
                {/each}
            </div>
        </div>
        <div class="preserveIcon">
            <label for="preserveIconColor">preserve icon color?</label>
            <input type="checkbox" name="preserveIconColor" bind:value={preserveIconColor}>
        </div>
        <button type="submit" on:click|preventDefault={() => {getBanner(title)}}>Create Banner</button>
    </form>

    {#if url}
        <img src={url} alt={title} title={title}>
        <button type="button" title="copy banner url" on:click|preventDefault={() => {copy(url)}}>Copy URL</button>
    {/if}
    {#if iconNotFound}
        <p class="error">Icon not found!</p>
        <a href="https://github.com/simple-icons/simple-icons/issues/new?labels=new+icon&template=icon_request.yml&title=Request%3A+" target="_blank">Request icon on SimpleIcons</a>
    {/if}
</main>

<style>
    .search {
        display: block;
    }

    .inputLabel {
        margin: 0;
        margin-bottom: .4rem;
        text-align: left;
    }

    .search input {
        border-radius: .75rem;
        border: none;
        outline: none;
        padding: .25rem .5rem;
        border: 3px solid var(--text);
        font-size: 1rem;
        margin-bottom: .5rem;
    }
</style>