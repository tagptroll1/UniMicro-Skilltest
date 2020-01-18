<script>
  import { goto, stores } from "@sapper/app";
  import { post } from "api";
  import routes from "routes";

  const { session } = stores();
  let valid;
  let forbidden = false;
  let error = false;

  function handleInput({ target }) {
    valid = target.reportValidity();
  }

  async function handleSubmit({ target }) {
    if (!target.checkValidity()) return;

    const response = await post({
      path: routes.sapper.login,
      body: {
        Username: target.username.value,
        Password: target.password.value
      }
    });

    if (response.ok) {
      $session.companies = response.message;
      $session.loggedIn = true;
      return await goto(routes.site.contacts);
    } else if (response.status === 401) {
      forbidden = true;
    } else {
      error = true;
    }
    target.reset();
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 200px;
  }

  p {
    text-align: center;
    color: red;
    font-size: 0.8rem;
  }
</style>

<form on:submit|preventDefault={handleSubmit} on:input={handleInput}>
  <label for="username">Username</label>
  <input id="username" name="username" type="text" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required />

  <input type="submit" disabled={valid ? null : 'disabled'} value="Login" />
  {#if forbidden}
    <p>Username or password is incorrect</p>
  {:else if error}
    <p>Something went wrong</p>
  {/if}
</form>
