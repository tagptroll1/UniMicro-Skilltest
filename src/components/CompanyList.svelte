<script>
  import ChevronDownIcon from "@components/ChevronDownIcon.svelte";
  import { stores } from "@sapper/app";
  const { session } = stores();

  export let companies;
</script>

<style>
  div {
    position: relative;
  }

  select {
    background-color: var(--main-color);
    border-radius: 3px;

    width: max-content;
    border: thin solid var(--white);
    color: var(--white);

    display: inline-block;
    line-height: 1.5em;

    appearance: none;
    -moz-appearance: none;

    margin-bottom: 20px;
    margin-top: 1.5em;
    padding-right: 20px;
  }

  option {
    background-color: var(--white);
    color: black;
  }

  div :global(svg) {
    position: absolute;
    top: 1.4em;
    right: 5px;

    fill: white;
    stroke: white;
  }
</style>

{#if companies}
  <div>
    <select name="company" on:change>
      {#if !$session.currentCompany}
        <option selected disabled>- - Select a company - -</option>
      {/if}
      {#each companies as company}
        <option
          selected={company.Key == $session.currentCompany}
          value={company.Key}>
          {company.Name}
        </option>
      {/each}
    </select>
    <ChevronDownIcon />

  </div>
{/if}
