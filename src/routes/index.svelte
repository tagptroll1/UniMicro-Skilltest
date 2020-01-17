<script>
  import Login from "@components/Login.svelte";
</script>

<style>
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

<h1>Great success!</h1>

<div>
  <Login />
</div>
