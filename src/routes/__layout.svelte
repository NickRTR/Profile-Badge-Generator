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
    <slot></slot>
</body>

<style>
    :root {
        /* Position toast at bottom */
        --toastContainerTop: auto;
        --toastContainerRight: auto;
        --toastContainerBottom: 5rem;
        --toastContainerLeft: calc(50vw - 8rem);
    }
</style>