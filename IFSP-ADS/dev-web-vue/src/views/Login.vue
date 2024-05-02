<template>
  <div class="container h-100">
    <div class="d-flex justify-content-center align-items-center h-100">
      <b-card no-body>
        <b-card-body>
          <b-form @submit.prevent="doLogin">
            <b-alert :show="showAlert" variant="danger">{{ mensagemErro }}</b-alert>
            <b-form-group label="E-mail" label-for="email" class="mb-3">
              <b-input
                id="email"
                type="email"
                v-model="login.email"
                required
              ></b-input>
            </b-form-group>
            <b-form-group label="Senha" label-for="senha" class="mb-3">
              <b-input
                id="senha"
                type="password"
                v-model="login.password"
                required
              ></b-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Entrar</b-button>
          </b-form>
        </b-card-body>
        <b-card-footer>
          <a class="card-link" href="#">Esqueceu sua senha?</a>
        </b-card-footer>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "teste@admin.com",
        password: "123456",
      },
      mensagemErro: "",
      showAlert: false
    };
  },
  methods: {
    doLogin() {
      this.$http
        .post("/login", this.login)
        .then((response) => {
          this.showAlert = false;
          localStorage.setItem('token', response.data.token);
          this.$router.push("/agendamentos");
        })
        .catch((error) => {
          if (error.request.status === 401) {
            this.mensagemErro = "Login e/ou senha inválidos.";
            this.showAlert = true;
          }
          console.error(error);
        });
    },
  },
};
</script>

<style>
.card {
  width: 18rem;
}
</style>