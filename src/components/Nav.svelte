<script>
  export let segment;

  import { stores } from "@sapper/app";
  const { session } = stores();
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

{#if $session.companies}
  <nav>
    <ul>
      <li>
        <a class:selected={segment === 'contacts'} href="contacts">contacts</a>
      </li>
      <li>
        <a href="api/logout">Logout</a>
      </li>
    </ul>
  </nav>
{/if}
