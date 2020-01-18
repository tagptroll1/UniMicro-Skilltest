<script context="module">
  import * as api from "api";
  import routes from "routes";

  export async function preload({ query }, { loggedIn }) {
    const path = routes.sapper.contactId(query.contactId);
    const contactResponse = await api.get({ path }, this.fetch);

    if (!contactResponse.ok) {
      this.error(404, "Not found");
    }

    return { contact: contactResponse.message };
  }
</script>

<script>
  export let contact;
</script>

{JSON.stringify(contact)}
