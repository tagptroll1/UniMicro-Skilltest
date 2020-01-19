<script>
  export let status;
  export let error;

  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  const dev = process.env.NODE_ENV === "development";
  let timer = 5;

  function redirect(next) {
    timer = next;
    if (timer === 0) {
      goto("/");
    }
    setTimeout(() => redirect(next - 1), 1000);
  }

  onMount(() => redirect(timer));
</script>

<style>
  h1,
  p {
    margin: 0 auto;
    text-align: center;
  }

  h1 {
    font-size: 3em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 2em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>
<p>You will be redirected in T minus {timer} seconds</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
