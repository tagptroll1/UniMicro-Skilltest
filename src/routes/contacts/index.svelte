<script context="module">
  import { stores, goto } from "@sapper/app";
  import routes from "routes";

  export function preload(page, { currentCompany }) {
    if (currentCompany) {
      this.redirect(301, routes.site.contactsCompanyKey(currentCompany));
    }
  }
</script>

<h1>No company has been selected</h1>
