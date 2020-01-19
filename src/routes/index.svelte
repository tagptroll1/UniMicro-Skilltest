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
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  div {
    position: relative;
    min-width: 400px;
    max-width: 600px;
    width: 40%;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0 0 21px -3px #000;
  }

  @media (max-width: 400px) {
    div {
      min-width: unset;
      max-width: unset;
      width: 100%;
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    min-height: 100%;

    z-index: -1;
    object-fit: cover;
    object-position: 50% 50%;
  }

  div {
    display: flex;
    justify-content: center;
  }
</style>

<svelte:head>
  <title>Skill Test Unimicro</title>
</svelte:head>

<img src="background_1.jpg" alt="frozenlake backgroundimage" />

<main>
  <div>
    <Login />
  </div>
</main>
