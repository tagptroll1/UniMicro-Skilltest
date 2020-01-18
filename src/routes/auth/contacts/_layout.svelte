<script context="module">
  export function preload(page, { companies }) {
    return { companies };
  }
</script>

<script>
  export let companies;

  import CompanyList from "@components/CompanyList.svelte";
  import routes from "routes";
  import { goto } from "@sapper/app";

  function handleChange({ target }) {
    const { value } = target;

    goto(routes.site.contactsCompanyKey(value));
  }
</script>

<CompanyList on:change={handleChange} {companies} />

<slot />
