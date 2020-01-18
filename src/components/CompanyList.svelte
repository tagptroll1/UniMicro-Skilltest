<script>
  export let companies;
</script>

<style>
  label {
    display: block;
    font-size: 0.7em;
    color: rgba(82, 82, 82, 0.9);
  }
</style>

{#if companies}
  <label for="company">Select company</label>
  <select name="company" on:change>
    {#each companies as company}
      <option value={company.Key}>{company.Name}</option>
    {/each}
  </select>
{/if}
