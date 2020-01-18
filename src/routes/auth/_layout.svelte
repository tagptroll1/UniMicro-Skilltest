<script context="module">
  export function preload(page, { companies }) {
    if (!companies) this.redirect(401, "/");
  }
</script>

<script>
  import Nav from "@components/Nav.svelte";

  export let segment;
</script>

<style>
  header {
    margin-bottom: 10px;
  }

  main {
    margin: 0 10px;
  }
</style>

<header>
  <Nav {segment} />
</header>

<main>
  <slot />
</main>
