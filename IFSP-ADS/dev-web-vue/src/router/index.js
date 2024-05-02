import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Appoitments from "../views/Appoitments.vue";
import Doctors from "../views/Doctors.vue";
import Patients from "../views/Patients.vue";
import NewAppoitment from "../views/NewAppoitment.vue";
import NewPatient from "../views/NewPatient.vue";
import NewDoctor from "../views/NewDoctor.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      publica: true
    }
  },
  {
    path: "/agendamentos",
    name: "Agendamentos",
    component: Appoitments,
  },
  {
    path: "/medicos",
    name: "Médicos",
    component: Doctors,
  },
  {
    path: "/pacientes",
    name: "Pacientes",
    component: Patients,
  },
  {
    path: "/novo-agendamento",
    name: "NovoAgendamento",
    component: NewAppoitment
  },
  {
    path: "/novo-paciente",
    name: "NovoPaciente",
    component: NewPatient
  },
  {
    path: "/novo-medico",
    name: "NovoMedico",
    component: NewDoctor
  },
  {
    path: "/editar-paciente/:id",
    name: "EditarPaciente",
    component: NewPatient,
  },
  {
    path: "/editar-medico/:id",
    name: "EditarMedico",
    component: NewDoctor,
  },
  {
    path: "*",
    component: Appoitments,
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((routeTo, routeFrom, next) => {
  if (!routeTo.meta.publica && !localStorage.getItem('token')) {
    return next({ path: '/' });
  }
  next();
})

export default router;