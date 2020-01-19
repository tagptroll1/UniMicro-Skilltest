<script>
  export let contact;

  import routes from "routes";
  import { fly } from "svelte/transition";

  const { DefaultEmail, DefaultPhone } = contact.Info;

  const email = DefaultEmail ? DefaultEmail.EmailAddress : "";
  const phone = DefaultPhone ? DefaultPhone.Number : "";

  let show = false;
</script>

<style>
  .name {
    text-decoration: none;
    display: block;
    line-height: 1;
  }

  .name::after {
    position: absolute;
    content: "";
    display: block;
    width: 2px;
    height: 100%;

    background-color: rgba(255, 62, 0, 0.6);
    display: block;

    top: 5%;
    left: -1px;
  }

  span {
    font-size: 1rem;
    margin: 0;
    color: rgb(82, 82, 82);
  }

  div {
    line-height: 1;
    display: block;
    font-size: 1rem;
    color: black;
  }

  .email {
    color: darkblue;
  }
</style>

<article>
  <a class="name" href={routes.site.contactId(contact.ID)}>
    {contact.Info.Name}
  </a>
  <span>{contact.Role || ''}</span>
  <button on:click={() => (show = !show)}>{show ? 'Hide' : 'More'}</button>
  {#if show}
    <div transition:fly={{ y: -10, duration: 250 }}>
      <a class="email" href={`mailto: ${email}`}>{email || ''}</a>
      {phone || ''}
    </div>
  {/if}

</article>
