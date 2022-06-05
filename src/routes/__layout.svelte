<script>
    import { SvelteToast } from '@zerodevx/svelte-toast'

    const defaultToastOptions = {
        theme: {
			'--toastBackground': '#3A4750',
    		'--toastBarBackground': '#F6C90E'
		}
    }
</script>

<body>
    <SvelteToast options={defaultToastOptions} />
    <slot></slot>
</body>