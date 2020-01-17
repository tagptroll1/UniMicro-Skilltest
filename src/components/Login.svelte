<script>
  let valid;

  function handleInput({ target }) {
    valid = target.reportValidity();
  }

  async function handleSubmit({ target }) {
    if (!target.checkValidity()) return;

    console.log(target.username, target.password);
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 200px;
  }
</style>

<form on:submit|preventDefault={handleSubmit} on:input={handleInput}>
  <label for="username">Username</label>
  <input id="username" name="username" type="text" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required />

  <input type="submit" disabled={valid ? null : 'disabled'} value="Login" />
</form>
