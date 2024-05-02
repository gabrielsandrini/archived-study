<template>
  <div>
    <Nav />
    <div class="container-fluid">
      <div class="my-3">
        <b-form @submit.prevent="createAppointment">
          <b-form-group label="Paciente" label-for="paciente" class="mb-3">
            <b-form-select
              class="form-select"
              id="paciente"
              v-model="appointment.user_id"
              :options="optionsPatient"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group label="Médico" label-for="medico" class="mb-3">
            <b-form-select
              v-model="appointment.doctor_id"
              class="form-select"
              id="medico"
              :options="optionsDoctor"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group label="Data" label-for="data" class="mb-3">
            <b-form-datepicker
              v-model="appointment.date"
              id="data"
              required
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group label="Horário" label-for="horario" class="mb-3">
            <b-form-timepicker v-model="horario" locale="pt-BR" required></b-form-timepicker>
          </b-form-group>
          <div class="d-flex justify-content-end">
            <b-button variant="secondary" class="mx-3" to="/agendamentos">
              Cancelar
            </b-button>
            <b-button variant="success" type="submit">
              Salvar Agendamento
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
  name: "NovoAgendamento",
  components: {
    Nav,
  },
  data() {
    return {
      appointment: {
        date: "",
        user_id: 0,
        doctor_id: 0,
      },
      horario: "",
      optionsPatient: [],
      optionsDoctor: [],
    };
  },
  methods: {
    createAppointment() {
      this.appointment.date = this.appointment.date + "T" + this.horario;
      this.$http
        .post("/appointments", this.appointment)
        .then(() => {
          alert("Agendamento realizado com sucesso!");
          this.$router.push("/agendamentos");
        })
        .catch((error) => {
          let message = JSON.parse(error.request.responseText).message;
          alert(`Erro ao realizar agendamento. ${message}`);
          console.log(error);
        });
    },
  },
  created() {
    let self = this;

    this.$http
      .get("/doctors")
      .then((response) => response.data)
      .then(
        function (doctors) {
          let optionsDoctor = [];
          doctors.forEach((doctor) => {
            optionsDoctor.push({
              value: doctor.id,
              text: doctor.name,
            });
          });
          self.optionsDoctor = optionsDoctor;
        },
        (err) => console.log(err)
      );

      this.$http
      .get("/users")
      .then((response) => response.data)
      .then(
        function (patients) {
          let optionsPatient = [];
          patients.forEach((patient) => {
            optionsPatient.push({
              value: patient.id,
              text: patient.name,
            });
          });
          self.optionsPatient = optionsPatient;
        },
        (err) => console.log(err)
      );
  },
};
</script>

<style>
</style>