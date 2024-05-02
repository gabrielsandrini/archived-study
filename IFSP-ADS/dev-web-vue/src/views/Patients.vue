<template>
  <div>
    <Nav />
    <div class="container-fluid overflow-auto">
      <div class="mt-3 d-flex justify-content-end">
        <b-button
          to="/novo-paciente"
          variant="secondary"
          class="align-self-center"
        >
          <i class="fas fa-plus"></i> Novo Paciente
        </b-button>
      </div>
      <div class="my-3">
        <b-table id="table-patients" hover :items="items" :fields="fields">
          <template #cell(acoes)="row">
            <b-button @click="editPatient(row)" class="mx-1" variant="warning"
              >Editar</b-button
            >
            <b-button @click="deletePatient(row)" variant="danger"
              >Excluir</b-button
            >
          </template>
        </b-table>
        <div class="d-flex justify-content-end">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="table-patients"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";

export default {
  name: "Pacientes",
  components: {
    Nav,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: [],
      fields: ["id", "nome", "email", "acoes"],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  created() {
    this.$http.get("/users").then((result) => {
      result.data.forEach((element) => {
        this.items.push({
          id: element.id,
          nome: element.name,
          email: element.email,
        });
      });
    });
  },
  methods: {
    editPatient(row) {
      this.$router.push(`/editar-paciente/${row.item.id}`);
    },

    deletePatient(row) {
      if (
        confirm(`Tem certeza que deseja deletar o paciente ${row.item.nome}?`)
      ) {
        this.$http
          .delete(`/users/${row.item.id}`)
          .then(() => {
            alert("Paciente excluído com sucesso!");
            this.$router.go();
          })
          .catch((error) => {
            alert("Não foi possível excluir o paciente.");
            console.error(error);
          });
      }
    },
  },
};
</script>

<style>
</style>