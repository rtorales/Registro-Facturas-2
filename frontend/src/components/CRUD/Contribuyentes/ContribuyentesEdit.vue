<template>
    <v-card class="mt-6 py-3">
       <form @submit.prevent="submitHandler">
         <div class="px-8">
           <v-row>
           <v-col cols="12">
               <h4 class="page-title">Edit Contribuyentes</h4>
           </v-col>

           <v-col cols="3" class="d-flex align-center">
               <p class="fs-normal greyBold--text mb-0">RazónSocial</p>
           </v-col>
           <v-col cols="9">
               <v-text-field
                 label="RazónSocial"
                 v-model="razon_social"
               ></v-text-field>
           </v-col>

           <v-col cols="3" class="d-flex align-center">
               <p class="fs-normal greyBold--text mb-0">Ruc</p>
           </v-col>
           <v-col cols="9">
               <v-text-field
                 label="Ruc"
                 v-model="ruc"
               ></v-text-field>
           </v-col>

              <v-col cols="12 mt-5">
                <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                >
                    Save
                </v-btn>

                <v-btn @click="formatData" class="ml-2">
                    Reset
                </v-btn>

                <router-link :to="cancelUrl" class="text-decoration-none">
<v-btn
        type="button"
        class="ml-2"
>
    Cancel
</v-btn>
</router-link>
              </v-col>
            </v-row>
         </div>
      </form>
    </v-card>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import dataFormatter from '@/use/dataFormatter.js'
import ImageUploader from '@/components/Uploaders/ImageUploader'
import FileUploader from '@/components/Uploaders/FileUploader'
import Editor from '@tinymce/tinymce-vue'

export default {
    data () {
      return {

        razon_social: '',

        ruc: '',

    }
  },
  computed: {
    ...mapState({
        data: state => state.contribuyentesForm.data,
        loading: state => state.contribuyentesForm.loading,

    }),

    cancelUrl() {
        return '/' + this.$route.fullPath
            .split('/')
            .slice(1)
            .splice(0, 2)
            .join('/')
    },
    dataFormatter() {
        return dataFormatter
    }
   },
    methods: {
    ...mapMutations({
        showSnackbar: 'snackbar/showSnackbar',
    }),
    ...mapActions({
        getData: 'contribuyentesForm/getData',

        edit: 'contribuyentesForm/edit'
    }),
    async submitHandler() {
        const data = this.data

        data.razon_social = this.razon_social

        data.ruc = this.ruc

        try {
            await this.edit({id: this.id, data})
            this.$router.push('/admin/contribuyentes')
         } catch (e) {
            this.showSnackbar(e)
        }
    },

        formatData() {

            this.razon_social = this.data.razon_social

            this.ruc = this.data.ruc

        }
     },
    async beforeMount() {
        try {

            const pathArray = this.$route.fullPath.split('/')
            const id = pathArray[pathArray.length - 2]
            this.id = id
            await this.getData(id)

            this.formatData()
        } catch (e) {
            this.showSnackbar(e)
        }
    },
    watch: {

    },
    components: {ImageUploader, FileUploader, Editor, VDatetimePicker: () => import('vuetify-datetime-picker/src/components/DatetimePicker.vue')}
}
</script>

