<template>
  <div>
    <Nav />
    <div class="container-fluid">
      <div class="mt-3 d-flex justify-content-end">
        <b-button
          to="/novo-agendamento"
          variant="secondary"
          class="align-self-center"
        >
          <i class="fas fa-plus"></i> Novo Agendamento
        </b-button>
      </div>
      <div class="my-3">
        <b-table id="table-appoitments" hover :items="items" :fields="fields">
          <template #cell(acoes)="row">
            <b-button @click="deleteAppoitment(row)" variant="danger"
              >Cancelar</b-button
            >
          </template>
        </b-table>
        <div class="d-flex justify-content-end">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="table-appoitments"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";

export default {
  name: "Agendamentos",
  components: {
    Nav,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: [],
      fields: ["id", "paciente", "medico", "data", "horario", "acoes"],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  created() {
    this.$http.get("/appointments").then((result) => {
      result.data.forEach((element) => {
        let data = new Date(element.date);

        let hours =
          data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
        let minutes =
          data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
        let date = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
        let month =
          data.getMonth() + 1 < 10
            ? "0" + (data.getMonth() + 1)
            : data.getMonth() + 1;

        let dataFormatada = date + "/" + month + "/" + data.getFullYear();
        let horarioFormatado = hours + ":" + minutes;

        if (element.user != null && element.doctor != null) {
          this.items.push({
            id: element.id,
            paciente: element.user.name,
            medico: element.doctor.name,
            data: dataFormatada,
            horario: horarioFormatado,
          });
        }
      });
    });
  },
  methods: {
    deleteAppoitment(row) {
      if (
        confirm(
          `Tem certeza que deseja cancelar o agendamento de ${row.item.paciente} do dia ${row.item.data} às ${row.item.horario}?`
        )
      ) {
        this.$http
          .delete(`/appointments/${row.item.id}`)
          .then(() => {
            alert("Agendamento cancelado com sucesso!");
            this.$router.go();
          })
          .catch((error) => {
            let message = JSON.parse(error.request.responseText).message;
            alert(`Não foi possível cancelar o agendamento. ${message}`);
            console.error(error);
          });
      }
    },
  },
};
</script>

<style>
</style>