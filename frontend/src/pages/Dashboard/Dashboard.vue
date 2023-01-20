<template>
  <div>
    <div class="dashboard-page">
      <h1 class="page-title mt-2">Welcome,
        {{ currentUser && currentUser.firstName
            ? currentUser.firstName
            : 'User' }}
      </h1>
      <v-container fluid>
          <v-row class="mt-8 mb-3">

            <v-col lg=3 sm=6 md=4 cols=12>
              <a href="#/admin/users" class="text-decoration-none">
              <v-card class="">
                <v-card-title class="d-flex flex-nowrap pa-5 pb-3">
                  <p class="text-truncate">Users</p>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="pa-5 pt-0">

                  <v-row class="d-flex">
                    <v-col cols="9" class="d-flex align-center">
                      <v-icon color="primary" class="mr-3">mdi-information</v-icon>
                      <p class="text-h5 text-truncate mb-0">Users:</p>
                    </v-col>
                    <v-col cols="3"><span class="text-h3" v-text="users"></span></v-col>
                  </v-row>

                </v-card-text>
              </v-card>
              </a>
            </v-col>

            <v-col lg=3 sm=6 md=4 cols=12>
              <a href="#/admin/contribuyentes" class="text-decoration-none">
              <v-card class="">
                <v-card-title class="d-flex flex-nowrap pa-5 pb-3">
                  <p class="text-truncate">Contribuyentes</p>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="pa-5 pt-0">

                  <v-row class="d-flex">
                    <v-col cols="9" class="d-flex align-center">
                      <v-icon color="primary" class="mr-3">mdi-information</v-icon>
                      <p class="text-h5 text-truncate mb-0">Contribuyentes:</p>
                    </v-col>
                    <v-col cols="3"><span class="text-h3" v-text="contribuyentes"></span></v-col>
                  </v-row>

                </v-card-text>
              </v-card>
              </a>
            </v-col>

            <v-col lg=3 sm=6 md=4 cols=12>
              <a href="#/admin/comprobante" class="text-decoration-none">
              <v-card class="">
                <v-card-title class="d-flex flex-nowrap pa-5 pb-3">
                  <p class="text-truncate">Comprobante</p>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="pa-5 pt-0">

                  <v-row class="d-flex">
                    <v-col cols="9" class="d-flex align-center">
                      <v-icon color="primary" class="mr-3">mdi-information</v-icon>
                      <p class="text-h5 text-truncate mb-0">Comprobante:</p>
                    </v-col>
                    <v-col cols="3"><span class="text-h3" v-text="comprobante"></span></v-col>
                  </v-row>

                </v-card-text>
              </v-card>
              </a>
            </v-col>

          </v-row>
        </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'

export default {
    data() {
      return {
       users: 0, contribuyentes: 0, comprobante: 0,
      };
    },
    created() {
      const fetchData = async () => {
         const { data: { count: users } } = await axios.get('/users/count');
         const { data: { count: contribuyentes } } = await axios.get('/contribuyentes/count');
         const { data: { count: comprobante } } = await axios.get('/comprobante/count');

         this.users = users; this.contribuyentes = contribuyentes; this.comprobante = comprobante;
      };
      fetchData();
    },
  computed: {
    ...mapState({
      currentUser: state => state.auth.currentUser
    })
  }
}
</script>
