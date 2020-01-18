<script>
  import CompanyList from "@components/CompanyList.svelte";
  import routes from "routes";
  import * as api from "api";
  import { goto, stores } from "@sapper/app";

  const { session } = stores();
  $: companies = $session.companies;

  let selectedCompany;

  function handleChange({ target }) {
    const { value } = target;

    goto(routes.site.contactsCompanyKey(value));
  }
</script>

<CompanyList on:change={handleChange} {companies} />

<slot />
