<script context="module">
  import * as api from "api";
  import routes from "routes";

  export async function preload({ params }, { loggedIn }) {
    const path = routes.sapper.contactId(params.contactId);
    const { message, ok, status } = await api.get({ path }, this.fetch);

    if (!ok) {
      this.error(status, message);
    }

    return { contact: message };
  }
</script>

<script>
  export let contact;

  import EditIcon from "@components/EditIcon.svelte";
  import { stores } from "@sapper/app";
  const { session } = stores();

  const {
    ID,
    Info: { Name, DefaultEmail, DefaultPhone },
    Comment,
    Role
  } = contact;

  $session.customerName = Name;
</script>

<style>
  article {
    margin: 20px 20px 0;
  }

  h1 {
    width: max-content;
  }

  h1 span {
    display: block;
    color: rgb(138, 138, 138);
    font-size: 1rem;
  }

  ul {
    max-width: 500px;
    padding: 0;
  }

  li {
    list-style: none;
    margin: 5px 0;
  }

  li span {
    padding-left: 10px;
  }
</style>

<article>
  <form action="">
    <h1>
      <input class="Name" type="text" name="Name" placeholder={Name || ''} />

      <span>
        <input class="Role" type="text" name="Role" placeholder={Role || ''} />
      </span>
    </h1>
    <ul>

      <li>
        <label for="Email">E-Mail:</label>
        <span>
          <input
            type="text"
            name="Email"
            class="Email"
            placeholder={DefaultEmail.EmailAddress || ''} />
        </span>
      </li>
      <li>
        <label for="Phonenumber">Phonenumber:</label>
        <span>
          <input
            type="text"
            name="Phonenumber"
            class="Phonenumber"
            placeholder={DefaultPhone.Number || ''} />
        </span>
      </li>
      <li>
        <label for="Comment">Comment:</label>
        <span>
          <input
            type="text"
            name="Comment"
            class="Comment"
            placeholder={Comment || ''} />
        </span>
      </li>
    </ul>

    <input type="submit" value="Save" />
  </form>

</article>
