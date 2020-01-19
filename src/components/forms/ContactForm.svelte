<script>
  export let returnTo;

  export let Name = null;
  export let Role = null;
  export let Comment = null;

  export let AddressLine1 = null;
  export let AddressLine2 = null;
  export let AddressLine3 = null;
  export let PostalCode = null;
  export let City = null;
  export let Country = null;

  export let Email = null;

  export let Phonenumber = null;
</script>

<style>
  form {
    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    margin: 10px 40px 0;
  }

  label,
  input {
    display: block;
  }

  input[type="submit"] {
    margin-top: 10px;
  }

  section {
    margin: 25px;
  }

  .buttons,
  a {
    margin: 25px;
    display: block;
    width: 100%;
    text-align: center;
  }

  .buttons * {
    margin: 5px auto;
  }
</style>

<form on:submit|preventDefault>

  <section class="general">
    <h2>General</h2>
    <label for="Name">Name</label>
    <input class="Name" type="text" name="Name" value={Name} />

    <label for="Role">Role</label>
    <input class="Role" type="text" name="Role" value={Role} />

    <label for="EmailAddress">E-Mail:</label>
    <input type="text" name="EmailAddress" class="Email" value={Email} />

    <label for="PhoneNumber">Phonenumber:</label>
    <input
      type="text"
      name="PhoneNumber"
      class="PhoneNumber"
      value={Phonenumber} />

    <label for="Comment">Comment:</label>
    <input type="text" name="Comment" class="Comment" value={Comment} />

  </section>

  <section class="address">
    <h2>Address</h2>
    <label for="AddressLine1">AddressLine1</label>
    <input
      class="AddressLine"
      type="text"
      name="AddressLine1"
      value={AddressLine1} />

    <label for="AddressLine2">AddressLine2</label>
    <input
      class="AddressLine"
      type="text"
      name="AddressLine2"
      value={AddressLine2} />

    <label for="AddressLine3">AddressLine3</label>
    <input
      class="AddressLine"
      type="text"
      name="AddressLine3"
      value={AddressLine3} />

    <label for="PostalCode">Postal code</label>
    <input
      class="PostalCode"
      type="text"
      name="PostalCode"
      value={PostalCode} />

    <label for="City">City</label>
    <input class="City" type="text" name="City" value={City} />

    <label for="Country">Country</label>
    <input class="Country" type="text" name="Country" value={Country} />
  </section>

  <div class="buttons">
    <input type="submit" value="Save" />

    {#if returnTo}
      <a href={returnTo}>Cancel</a>
    {/if}

  </div>

</form>
