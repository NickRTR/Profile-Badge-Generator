<script context="module">
    export async function load({ fetch }) {
        const res = await fetch("https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json");
        const data = await res.json();
        
        return {
            props: {
                data: data
            }
        }
    }
</script>

<script>
    import { icons } from "$lib/stores";
    import { SvelteToast } from "@zerodevx/svelte-toast"
    import { onMount } from "svelte";

    export let data;
    
    onMount(() => {
        icons.set(data.icons);
    })

    const defaultToastOptions = {
        theme: {
			"--toastBackground": "white",
    		"--toastBarBackground": "#FFBC42",
            "--toastColor": "black",
            "--toastBorderRadius": ".75rem",
		},
    }
</script>

<svelte:head>
    <title>Profile Banner Generator</title>
</svelte:head>

<body>
    <SvelteToast options={defaultToastOptions} />
    <main><slot></slot></main>
</body>

<style>
    * {
        margin: 0;
        /* text-align: center; */
        color: var(--text);
        font-family: monospace;
        font-size: 1rem;
        font-weight: 600;
    }

    body {
        margin-inline: .25rem;
        height: 100%;
        background-attachment: fixed;
        background-color: #21D4FD;
        background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
    }

    :global(button, input) {
        font-family: inherit;
    }

    :global(:root) {
        --accent: #FFBC42;
        --text: white;
    }

    :root {
        /* Position toast at bottom */
        --toastContainerTop: auto;
        --toastContainerRight: auto;
        --toastContainerBottom: 1rem;
        --toastContainerLeft: calc(50vw - 8rem);
    }
</style>