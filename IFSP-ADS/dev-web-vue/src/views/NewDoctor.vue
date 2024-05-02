<template>
  <div>
    <Nav />
    <div class="container-fluid">
      <div class="my-3">
        <b-form @submit.prevent="createDoctor">
          <b-form-group
            label="Nome Completo"
            label-for="nomeCompleto"
            class="mb-3"
          >
            <b-input
              id="nomeCompleto"
              type="text"
              required
              v-model="doctor.name"
            ></b-input>
          </b-form-group>
          <div class="row">
            <b-form-group label="RG" label-for="rg" class="mb-3 col-4">
              <b-input
                id="rg"
                type="text"
                required
                v-model="doctor.rg"
              ></b-input>
            </b-form-group>
            <b-form-group label="CPF" label-for="cpf" class="mb-3 col-4">
              <b-input
                id="cpf"
                type="text"
                required
                v-model="doctor.cpf"
              ></b-input>
            </b-form-group>
            <b-form-group label="CRM" label-for="crm" class="mb-3 col-4">
              <b-input
                id="crm"
                type="text"
                required
                v-model="doctor.crm"
              ></b-input>
            </b-form-group>
          </div>
          <div class="row">
            <b-form-group
              label="Telefone"
              label-for="telefone"
              class="mb-3 col-6"
            >
              <b-input
                id="telefone"
                type="text"
                required
                v-model="doctor.phone"
              ></b-input>
            </b-form-group>
            <b-form-group label="E-mail" label-for="email" class="mb-3 col-6">
              <b-input
                id="email"
                type="email"
                required
                v-model="doctor.email"
              ></b-input>
            </b-form-group>
          </div>
          <div class="row">
            <b-form-group
              label="Endereço"
              label-for="endereco"
              class="mb-3 col-6"
            >
              <b-input
                id="endereco"
                type="text"
                required
                v-model="doctor.street"
              ></b-input>
            </b-form-group>
            <b-form-group label="Número" label-for="numero" class="mb-3 col-6">
              <b-input
                id="numero"
                type="text"
                required
                v-model="doctor.house_number"
              ></b-input>
            </b-form-group>
          </div>
          <div class="row">
            <b-form-group
              label="Complemento"
              label-for="complemento"
              class="mb-3 col-6"
            >
              <b-input
                id="complemento"
                type="text"
                v-model="doctor.complement"
              ></b-input>
            </b-form-group>
            <b-form-group label="Cidade" label-for="cidade" class="mb-3 col-6">
              <b-input
                id="cidade"
                type="text"
                required
                v-model="doctor.city"
              ></b-input>
            </b-form-group>
          </div>
          <div class="d-flex justify-content-end">
            <b-button variant="secondary" class="mx-3" to="/medicos">
              Cancelar
            </b-button>
            <b-button variant="success" type="submit"> Salvar Médico </b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";

export default {
  name: "NovoMedico",
  components: {
    Nav,
  },
  data() {
    return {
      doctor: {
        name: "",
        rg: "",
        cpf: "",
        crm: "",
        city: "",
        street: "",
        house_number: "",
        complement: "",
        phone: "",
        email: "",
        password: "123456",
        is_doctor: true,
        is_admin: false,
      },
      id: this.$route.params.id,
    };
  },
  created() {
    if (this.id) {
      this.$http
        .get(`/user/${this.id}`)
        .then((doctor) => {
          this.doctor = doctor.data;
        });
    }
  },
  methods: {
    createDoctor() {
      if (this.id) {
        this.doctor = Object.assign(this.doctor, { password: "" });
        console.log(this.doctor);
        this.$http
          .put(`/users/${this.id}`, this.doctor)
          .then(() => {
            alert("Médico atualizado com sucesso!");
            this.$router.push("/medicos");
          })
          .catch((error) => {
            alert(
              "Não foi possível realizar a alteração no cadastro do médico."
            );
            console.error(error);
          });
      } else {
        this.$http
          .post("/users/", this.doctor)
          .then(() => {
            alert("Médico cadastrado com sucesso!");
            this.$router.push("/medicos");
          })
          .catch((error) => {
            alert("Não foi possível realizar o cadastro do médico.");
            console.error(error);
          });
      }
    },
  },
};
</script>

<style>
</style>