<script>
    import { SvelteToast } from '@zerodevx/svelte-toast'

    const defaultToastOptions = {
        theme: {
			'--toastBackground': '#3A4750',
    		'--toastBarBackground': '#F6C90E'
		},
    }
</script>

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
        --accent: red;
        --text: white;
    }

    :root {
        /* Position toast at bottom */
        --toastContainerTop: auto;
        --toastContainerRight: auto;
        --toastContainerBottom: 5rem;
        --toastContainerLeft: calc(50vw - 8rem);
    }
</style>