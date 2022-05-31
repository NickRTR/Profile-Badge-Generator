<script>
    // use simple-icons package to get the hex code

    let title = "Svelte";
    let backgroundColor = "000";
    let color = "fff";


    $: url = `https://img.shields.io/badge/${title}-${backgroundColor}?style=for-the-badge&logo=${title}&logoColor=${color}`;
</script>

<main>
    <form>
        <input type="text" placeholder="title" bind:value={title}>
    </form>
    <img src={url} alt={title} title={title}>
</main>