<svelte:options immutable/>

<script>
    import { afterUpdate } from 'svelte';
    import flash from './flash.js';

    export let todo;

    let div;

    afterUpdate(() => {
        flash(div);
    });
</script>

<style>
    div {
        cursor: pointer;
        line-height: 1.5;
    }
</style>

<div bind:this={div} on:click on:keyup>
    {todo.done ? '👍': ''} {todo.text}
</div>