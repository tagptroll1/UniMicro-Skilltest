<script>
  export let contact;

  import routes from "routes";

  $: DefaultEmail = contact.Info ? contact.Info.DefaultEmail : null;
  $: DefaultPhone = contact.Info ? contact.Info.DefaultPhone : null;
  $: email = DefaultEmail ? DefaultEmail.EmailAddress : "";
  $: phone = DefaultPhone ? DefaultPhone.Number : "";
</script>

<style>
  .name {
    text-decoration: none;
    display: block;
    line-height: 1;
  }

  span {
    font-size: 1rem;
    color: rgb(85, 38, 0);
  }

  div span {
    color: rgb(33, 33, 33);
  }

  div {
    margin-top: 5px;
    font-size: 1rem;
  }

  .email {
    color: darkblue;
  }
</style>

<article>
  <a class="name" href={routes.site.contactId(contact.ID)}>
    {contact.Info.Name}
  </a>
  {#if phone || email}
    <div>
      <a class="email" href={`mailto: ${email}`}>{email || ''}</a>
      <span>{phone || ''}</span>
    </div>
  {/if}
  <span>{contact.Role || ''}</span>

</article>
