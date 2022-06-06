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
    import { selectTextOnFocus } from "$lib/selectText.js";
    import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
    import Toggle from "svelte-toggle";

    export let icons;

    let title = "";
    let preserveIconColor = false;

    // undefinded to hide badge until "getBanner" is called
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
        if (iconName === "") return // escape if input is empty

        url = undefined; // remove old badge
        title = iconName; // update title if suggestion was pressed
        try {
            let backgroundColor = getAccentColor(iconName);
            let iconColor = getColorDependingOnContrast(backgroundColor);
            if (preserveIconColor) {
                iconColor = getAccentColor(iconName);
                backgroundColor = getColorDependingOnContrast(iconColor);
            }
            url = `https://img.shields.io/badge/${iconName}-${backgroundColor}?style=for-the-badge&logo=${iconName}&logoColor=${iconColor}`;
            searchSuggestions = [];
            iconNotFound = false;
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

    async function download() {
        const badge = await fetch(url);
        const imageURL = URL.createObjectURL(await badge.blob());

        const link = document.createElement("a");
        link.href = imageURL;
        link.download = title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>

<main>
    <h1>Profile Badge Generator</h1>

    <form>
        <div class="search">
            <p class="inputLabel">Search for a brand</p>
            <input type="text" placeholder="title" name="title" bind:value={title} on:input={getSearchSuggestions} use:selectTextOnFocus>
            <div class="suggestions">
                {#each searchSuggestions as suggestion, i (suggestion)}
                    <div animate:flip in:fade out:fly={{x:100}} class="suggestion"><button type="button" on:click|preventDefault={() => {getBanner(suggestion)}}>{suggestion}</button></div>
                {/each}
            </div>
        </div>
        <div class="preserveIcon"><Toggle style bind:toggled={preserveIconColor} on:toggle={() => {getBanner(title)}} label="Preserve icon color?" /></div>
        <button type="submit" on:click|preventDefault={() => {getBanner(title)}}>Create Badge</button>
    </form>

    
    <section class="result">
        {#if url}
            <img src={url} alt={title} title={title} on:click={() => {copy(url)}}>
            <div class="buttons">
                <div class="copy"><button type="button" title="Copy URL" on:click={() => {copy(url)}}>Copy URL</button></div>
                <div class="download"><button type="button" title="Download Badge" on:click={download}>Download Badge</button></div>
            </div>
        {/if}
        {#if iconNotFound}
            <p class="error">Icon not found!</p>
            <a href="https://github.com/simple-icons/simple-icons/issues/new?labels=new+icon&template=icon_request.yml&title=Request%3A+" title="Request icon" target="_blank">Request icon on SimpleIcons</a>
        {/if}
    </section>
</main>

<style>
    /* input */
    button {
        border-radius: .6rem;
        outline: none;
        border: 3px solid var(--text);
        background-color: var(--text);
        cursor: pointer;
        transition: all linear .1s; 
        padding-block: .2rem;
        font-weight: 600;
        color: black;
    }

    input {
        border-radius: .75rem;
        border: none;
        outline: none;
        border: 3px solid var(--text);
        font-size: 1rem;
        transition: all linear .2s;
    }

    .inputLabel {
        margin: 0;
        text-align: left;
    }
    
    .search input {
        margin-block: .4rem;
        padding: .3rem .5rem;
    }

    .suggestions {
        margin-bottom: .5rem;
    }

    .suggestions button {
        margin-block: .2rem;
    }

    .preserveIcon {
        margin-bottom: 1rem;
    }

    :global(label) {
        font-size: 1rem !important;
    }

    button[type=submit] {
        font-size: 1rem;
    }

    button:hover, button:focus, input:hover, input:focus {
        border: 3px solid var(--accent);
    }

    /* result */
    section.result {
        margin-top: 1.5rem;
        padding-top: .5rem;
        border-top: 5px solid var(--accent);
    }

    section.result img {
        margin-block: 1rem;
        height: 3rem;
        border-radius: 1rem;
        box-shadow: 0 0 2rem var(--accent);
    }

    .buttons {
        display: flex;
    }

    .buttons button {
        margin-right: .5rem;
    }

    a {
        color: var(--text);
    }
</style>