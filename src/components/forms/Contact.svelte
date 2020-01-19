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
  h2 {
    margin-top: 20px;
  }

  label,
  input {
    display: block;
  }

  input[type="submit"] {
    margin-top: 10px;
  }
</style>

<form on:submit|preventDefault>
  <label for="Name">Name</label>
  <input class="Name" type="text" name="Name" placeholder="Name" value={Name} />

  <label for="Role">Role</label>
  <input class="Role" type="text" name="Role" placeholder="Role" value={Role} />

  <h2>Address</h2>
  <label for="AddressLine1">AddressLine1</label>
  <input
    class="AddressLine"
    type="text"
    name="AddressLine1"
    placeholder="AddressLine1"
    value={AddressLine1} />

  <label for="AddressLine2">AddressLine2</label>
  <input
    class="AddressLine"
    type="text"
    name="AddressLine2"
    placeholder="AddressLine2"
    value={AddressLine2} />

  <label for="AddressLine3">AddressLine3</label>
  <input
    class="AddressLine"
    type="text"
    name="AddressLine3"
    placeholder="AddressLine3"
    value={AddressLine3} />

  <label for="PostalCode">Postal code</label>
  <input
    class="PostalCode"
    type="text"
    name="PostalCode"
    placeholder="PostalCode"
    value={PostalCode} />

  <label for="City">City</label>
  <input class="City" type="text" name="City" placeholder="City" value={City} />

  <label for="Country">Country</label>
  <input
    class="Country"
    type="text"
    name="Country"
    placeholder="Country"
    value={Country} />

  <h2>E-mail</h2>
  <label for="EmailAddress">E-Mail:</label>
  <input
    type="text"
    name="EmailAddress"
    class="Email"
    placeholder="E-mail address"
    value={Email} />

  <h2>Phonenumber</h2>
  <label for="PhoneNumber">Phonenumber:</label>
  <input
    type="text"
    name="PhoneNumber"
    class="PhoneNumber"
    placeholder="Phonenumber"
    value={Phonenumber} />

  <label for="Comment">Comment:</label>
  <input
    type="text"
    name="Comment"
    class="Comment"
    placeholder="Comment (optional)"
    value={Comment} />

  <input type="submit" value="Save" />

  {#if returnTo}
    <a href={returnTo}>Cancel</a>
  {/if}
</form>
