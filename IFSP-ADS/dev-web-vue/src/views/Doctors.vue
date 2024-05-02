<template>
  <div>
    <Nav />
    <div class="container-fluid overflow-auto">
      <div class="mt-3 d-flex justify-content-end">
        <b-button
          to="/novo-medico"
          variant="secondary"
          class="align-self-center"
        >
          <i class="fas fa-plus"></i> Novo Médico
        </b-button>
      </div>
      <div class="my-3">
        <b-table id="table-doctors" hover :items="items" :fields="fields">
          <template #cell(acoes)="row">
            <b-button @click="editDoctor(row)" class="mx-1" variant="warning"
              >Editar</b-button
            >
            <b-button @click="deleteDoctor(row)" variant="danger"
              >Excluir</b-button
            >
          </template>
        </b-table>
        <div class="d-flex justify-content-end">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="table-doctors"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";

export default {
  name: "Medicos",
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
  created() {
    this.$http.get("/doctors").then((result) => {
      result.data.forEach((element) => {
        this.items.push({
          id: element.id,
          nome: element.name,
          email: element.email,
        });
      });
    });
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    editDoctor(row) {
      this.$router.push(`/editar-medico/${row.item.id}`);
    },

    deleteDoctor(row) {
      if (
        confirm(
          `Tem certeza que deseja deletar o médico ${row.item.nome}?`
        )
      ) {
        this.$http
          .delete(`/users/${row.item.id}`)
          .then(() => {
            alert("Médico excluído com sucesso!");
            this.$router.go();
          })
          .catch((error) => {
            alert("Não foi possível excluir o médico.");
            console.error(error);
          });
      }
    },
  },
};
</script>

<style>
</style>