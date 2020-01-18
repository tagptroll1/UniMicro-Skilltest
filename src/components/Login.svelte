<script>
  import { goto, stores } from "@sapper/app";
  import { post } from "api";
  import routes from "routes";

  const { session } = stores();
  let valid;

  function handleInput({ target }) {
    valid = target.reportValidity();
  }

  async function handleSubmit({ target }) {
    if (!target.checkValidity()) return;

    const response = await post({
      path: routes.sapper.login,
      body: {
        username: target.username.value,
        password: target.password.value
      }
    });

    if (response.ok) {
      $session.companies = response.message;
      $session.loggedIn = true;
      await goto(routes.site.contacts);
    }
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
