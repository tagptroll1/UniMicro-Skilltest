<script>
  import { stores } from "@sapper/app";
  const { session } = stores();

  export let companies;
</script>

<style>
  label {
    display: block;
    font-size: 0.7em;
    color: rgba(82, 82, 82, 0.9);
  }

  select {
    margin-bottom: 20px;
  }
</style>

{#if companies}
  <label for="company">Select company</label>
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
{/if}
