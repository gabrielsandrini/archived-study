<template>
  <div>
    <Nav />
    <div class="container-fluid">
      <div class="my-3">
        <b-form @submit.prevent="createPatient">
          <b-form-group
            label="Nome Completo"
            label-for="nomeCompleto"
            class="mb-3"
          >
            <b-input
              id="nomeCompleto"
              type="text"
              required
              v-model="patient.name"
            ></b-input>
          </b-form-group>
          <div class="row">
            <b-form-group label="RG" label-for="rg" class="mb-3 col-6">
              <b-input
                id="rg"
                type="text"
                required
                v-model="patient.rg"
              ></b-input>
            </b-form-group>
            <b-form-group label="CPF" label-for="cpf" class="mb-3 col-6">
              <b-input
                id="cpf"
                type="text"
                required
                v-model="patient.cpf"
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
                v-model="patient.phone"
              ></b-input>
            </b-form-group>
            <b-form-group label="E-mail" label-for="email" class="mb-3 col-6">
              <b-input
                id="email"
                type="email"
                required
                v-model="patient.email"
              ></b-input>
            </b-form-group>
          </div>
          <b-form-group
            label="Prontuário Médico"
            label-for="prontuarioMedico"
            class="mb-3"
          >
            <b-input
              id="prontuarioMedico"
              type="text"
              required
              v-model="patient.medical_records_id"
            ></b-input>
          </b-form-group>
          <div class="d-flex justify-content-end">
            <b-button variant="secondary" class="mx-3" to="/pacientes">
              Cancelar
            </b-button>
            <b-button variant="success" type="submit">
              Salvar Paciente
            </b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";

export default {
  name: "NovoPaciente",
  components: {
    Nav,
  },
  data() {
    return {
      patient: {
        name: "",
        rg: "",
        cpf: "",
        phone: "",
        email: "",
        medical_records_id: "",
        password: "123456",
        is_admin: false,
        id_doctor: false,
      },
      id: this.$route.params.id,
    };
  },
  created() {
    if (this.id) {
      this.$http
        .get(`/user/${this.id}`)
        .then((patient) => (this.patient = patient.data));
    }
  },
  methods: {
    createPatient() {
      if (this.id) {
        this.$http
          .put(`/users/${this.id}`, this.patient)
          .then(() => {
            alert("Paciente atualizado com sucesso!");
            this.$router.push("/pacientes");
          })
          .catch((error) => {
            alert(
              "Não foi possível realizar a alteração no cadastro do paciente."
            );
            console.error(error);
          });
      } else {
        this.$http
          .post("/users/", this.patient)
          .then(() => {
            alert("Paciente cadastrado com sucesso!");
            this.$router.push("/pacientes");
          })
          .catch((error) => {
            alert("Não foi possível realizar o cadastro do paciente!");
            console.error(error);
          });
      }
    },
  },
};
</script>

<style>
</style>