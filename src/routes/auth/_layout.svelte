<script context="module">
  export function preload(page, { companies }) {
    if (!companies) this.redirect(401, "/");
    return { companies };
  }
</script>

<script>
  import Nav from "@components/Nav.svelte";

  export let companies;
  export let segment;
</script>

<style>
  main {
    margin: 0 auto;
    padding: 20px 0;
    max-width: 80%;
    height: 100%;
    min-height: 88vh;

    background-color: var(--background-color);
  }

  footer {
    width: 100%;
    height: 120px;
    padding-top: 10px;

    background-color: var(--footer-color);

    color: white;

    text-align: center;

    box-shadow: 0 -1px 3px 2px rgba(20, 20, 20, 0.3);
  }

  footer span {
    display: block;
  }

  p {
    margin: 0;
    font-size: 2rem;
  }

  span {
    font-size: 1rem;
    color: rgb(49, 49, 49);
  }

  @media (max-width: 600px) {
    main {
      min-width: unset;
      max-width: unset;
      width: 100%;
    }
  }
</style>

<header>
  <Nav {segment} {companies} />
</header>

<main>
  <slot />
</main>

<footer>
  <p>
    Thomas Petersson
    <span>
      +47 472 35 406
      <br />
      Thomas@petersson.priv.no
    </span>
  </p>
</footer>
