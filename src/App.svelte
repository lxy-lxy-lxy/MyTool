<script>
    import Layout from "../Layout/Layout.svelte";
    import Login from "./pages/Login.svelte";
    import {verifyLoginTime} from "../utility/utils.js";

    let hasLogin = verifyLoginTime()

    function handleMessage() {
        hasLogin = verifyLoginTime();
    }
</script>

<main>
    {#if hasLogin}
        <Layout on:message={handleMessage}/>
    {:else}
        <Login on:message={handleMessage}/>
    {/if}
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 20px;
        background: #fafafa;
    }

    :global(a) {
        text-decoration: none;
        color: #551a8b;
    }

    main {
        margin: 0 auto;
        font-family: "Montserrat", sans-serif;
    }
</style>