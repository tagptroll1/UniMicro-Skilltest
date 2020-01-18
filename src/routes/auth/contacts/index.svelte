<script context="module">
  import routes from "routes";

  export function preload(page, { currentCompany }) {
    if (currentCompany) {
      this.redirect(302, routes.site.contactsCompanyKey(currentCompany));
    }
  }
</script>

<h1>No company has been selected</h1>
