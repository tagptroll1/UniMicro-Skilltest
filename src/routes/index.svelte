<script context="module">
  import routes from "routes";

  export function preload(page, { companies }) {
    if (companies) {
      this.redirect(302, routes.site.contacts);
    }
  }
</script>

<script>
  import Login from "@components/Login.svelte";
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  h1 {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  div {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Skill Test Unimicro</title>
</svelte:head>

<main>
  <h1>Great success!</h1>

  <div>
    <Login />
  </div>
</main>
