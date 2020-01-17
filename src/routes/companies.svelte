<script context="module">
  export function preload(page, session) {
    if (!session || !session.loggedIn) {
      return this.redirect(301, "/");
    }
  }
</script>

<script>
  import { stores } from "@sapper/app";
  const { session } = stores();
</script>

<style>
  section {
    margin: 20px auto;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  a {
    display: inline-block;
    text-decoration: none;
  }

  h2 {
    text-align: center;
    margin: 0 auto;

    font-size: 2.4em;
    font-weight: 700;
  }

  span {
    display: block;
    font-style: none;
    font-size: 0.6em;
    color: grey;
  }

  div {
    width: 300px;
    height: 200px;

    border: 1px solid black;
  }
</style>

<h1>Companies</h1>
{#each $session.companies as company}
  <section>
    <a href={`/contacts/${company.Key}`}>

      <div>
        <h2>
          {company.Name}
          <span>{company.IsTest ? 'Test' : ''}</span>
        </h2>
      </div>
    </a>
  </section>
{/each}
