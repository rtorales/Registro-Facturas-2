<template>
  <v-card class="mt-6 py-3">
    <form @submit.prevent="submitHandler">
      <div class="px-8">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">New Users</h4>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">First Name</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="First Name" v-model="firstName"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Last Name</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="Last Name" v-model="lastName"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Phone Number</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="Phone Number"
              v-model="phoneNumber"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">E-Mail</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="E-Mail" v-model="email"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Role</p>
          </v-col>
          <v-col cols="9">
            <v-radio-group v-model="role" row>
              <v-col cols="12" sm="4" md="4">
                <v-radio label="admin" value="admin"></v-radio>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-radio label="user" value="user"></v-radio>
              </v-col>
            </v-radio-group>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Disabled</p>
          </v-col>
          <v-col cols="9">
            <v-checkbox
              label="Disabled"
              v-model="disabled"
              hide-details
            ></v-checkbox>
          </v-col>

          <ImageUploader
            label="Avatar"
            id="1F23C-1E71-DB57-783D"
            url="users/avatar"
            :images="avatar"
            @change="avatarAdd"
            @del="avatarDel"
          />

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Contribuyente</p>
          </v-col>
          <v-col cols="9">
            <v-autocomplete
              v-model="Contribuyente"
              :items="optionsContribuyente.map((item) => item.label)"
              label="Contribuyente"
              :search-input.sync="searchModelContribuyente"
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary" :loading="loading"> Save </v-btn>

        <v-btn @click="resetData" class="ml-2"> Reset </v-btn>

        <router-link :to="cancelUrl" class="text-decoration-none">
          <v-btn type="button" class="ml-2"> Cancel </v-btn>
        </router-link>
      </div>
    </form>
  </v-card>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import dataFormatter from '@/use/dataFormatter.js';
  import ImageUploader from '@/components/Uploaders/ImageUploader';
  import FileUploader from '@/components/Uploaders/FileUploader';
  import Editor from '@tinymce/tinymce-vue';

  export default {
    data() {
      return {
        id: null,

        firstName: '',

        lastName: '',

        phoneNumber: '',

        email: '',

        role: 'admin',

        disabled: false,

        avatar: [],

        Contribuyente: [],
        searchModelContribuyente: '',
      };
    },
    computed: {
      ...mapState({
        data: (state) => state.usersForm.data,
        loading: (state) => state.usersForm.loading,

        optionsContribuyente: (state) =>
          state.usersForm.searchResultContribuyente,
      }),

      cancelUrl() {
        return (
          '/' + this.$route.fullPath.split('/').slice(1).splice(0, 2).join('/')
        );
      },
      dataFormatter() {
        return dataFormatter;
      },
    },
    methods: {
      ...mapMutations({
        showSnackbar: 'snackbar/showSnackbar',
      }),
      ...mapActions({
        searchContribuyente: 'usersForm/searchContribuyente',

        newHandler: 'usersForm/newHandler',
      }),
      async submitHandler() {
        const data = {
          firstName: this.firstName,

          lastName: this.lastName,

          phoneNumber: this.phoneNumber,

          email: this.email,

          role: this.role,

          disabled: this.disabled,

          avatar: this.avatar,

          Contribuyente: this.Contribuyente,
        };

        data.Contribuyente = this.Contribuyente.length
          ? this.Contribuyente.map((item) => {
              const el = this.optionsContribuyente.filter(
                (i) => i.label === item,
              );
              if (el.length) return el[0].id;
              else return null;
            })
          : [];

        try {
          await this.newHandler({ data });
          this.$router.push('/admin/users');
        } catch (e) {
          console.log(e);
          this.showSnackbar(e);
        }
      },

      avatarAdd(val) {
        this.avatar.push(val);
      },
      avatarDel(id) {
        this.avatar = this.avatar.filter((img) => img.id !== id);
      },

      resetData() {
        this.firstName = '';

        this.lastName = '';

        this.phoneNumber = '';

        this.email = '';

        this.role = 'admin';

        this.disabled = false;

        this.avatar = [];

        this.Contribuyente = [];
      },
    },
    async beforeMount() {
      await this.searchContribuyente();
    },
    watch: {
      async searchModelContribuyente() {
        await this.searchContribuyente(this.searchModelContribuyente);
      },
    },
    components: {
      ImageUploader,
      FileUploader,
      Editor,
      VDatetimePicker: () =>
        import('vuetify-datetime-picker/src/components/DatetimePicker.vue'),
    },
  };
</script>
