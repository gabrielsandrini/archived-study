<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="primary" class="container-fluid">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/agendamentos">Agendamentos</b-nav-item>
                    <b-nav-item to="/pacientes">Pacientes</b-nav-item>
                    <b-nav-item to="/medicos">Médicos</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav id="nav-logout">
                    <b-button variant="outline-light" @click.prevent="efetuarLogout">Sair</b-button>
                </b-navbar-nav>
            </b-collapse>    
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Nav',
    methods: {
        efetuarLogout() {
            localStorage.removeItem('token');
            this.$router.push('/');
        },
    },
}
</script>

<style>
    #nav-logout {
        margin-left: auto;
    }
</style>