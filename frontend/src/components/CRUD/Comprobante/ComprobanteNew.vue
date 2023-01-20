        <template>
            <v-card class="mt-6 py-3">
            <form @submit.prevent="submitHandler">
            <div class="px-8">
                <v-row>
                    <v-col cols="12">
                        <h4 class="page-title">New  Comprobante</h4>
                    </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">Contribuyente</p>
    </v-col>
    <v-col cols="9">
        <v-autocomplete
                v-model="contribuyente"
        :items="optionsContribuyente.map(item => item.label)"
        :search-input.sync="searchModelContribuyente"
        label="Contribuyente"
        >
    </v-autocomplete>
    </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">Tipo Registro</p>
    </v-col>
    <v-col cols="9">
        <v-radio-group v-model="tipoRegistro" row>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="VENTAS"
            value="VENTAS"
            ></v-radio>
            </v-col>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="COMPRAS"
            value="COMPRAS"
            ></v-radio>
            </v-col>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="INGRESOS"
            value="INGRESOS"
            ></v-radio>
            </v-col>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="EGRESOS"
            value="EGRESOS"
            ></v-radio>
            </v-col>

        </v-radio-group>
    </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">Tipo Identificacion</p>
    </v-col>
    <v-col cols="9">
        <v-radio-group v-model="tipoIdentificacion" row>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="RUC"
            value="RUC"
            ></v-radio>
            </v-col>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="CÉDULA DE IDENTIDAD"
            value="CÉDULA DE IDENTIDAD"
            ></v-radio>
            </v-col>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="PASAPORTE"
            value="PASAPORTE"
            ></v-radio>
            </v-col>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="CÉDULA EXTRANJERO"
            value="CÉDULA EXTRANJERO"
            ></v-radio>
            </v-col>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="SIN NOMBRE"
            value="SIN NOMBRE"
            ></v-radio>
            </v-col>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="DIPLOMÁTICO"
            value="DIPLOMÁTICO"
            ></v-radio>
            </v-col>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="IDENTIFICACIÓN TRIBUTARIA"
            value="IDENTIFICACIÓN TRIBUTARIA"
            ></v-radio>
            </v-col>

        </v-radio-group>
    </v-col>

                        <v-col cols="3" class="d-flex align-center">
                            <p class="fs-normal greyBold--text mb-0">Numero Identificación</p>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field
                                label="Numero Identificación"
                                v-model="numeroIdentificacion"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="3" class="d-flex align-center">
                            <p class="fs-normal greyBold--text mb-0">Razon Social</p>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field
                                label="Razon Social"
                                v-model="razonSocial"
                            ></v-text-field>
                        </v-col>

            <v-col cols="3" class="d-flex align-center">
                <p class="fs-normal greyBold--text mb-0">Fecha</p>
            </v-col>
            <v-col cols="9">
            <v-menu
                v-model="dateFecha"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="fecha"
                    label="Fecha"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
    <v-date-picker
            v-model="fecha"
    @input="dateFecha = false"
    ></v-date-picker>
    </v-menu>
    </v-col>

                        <v-col cols="3" class="d-flex align-center">
                            <p class="fs-normal greyBold--text mb-0">Numero Comprobante</p>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field
                                label="Numero Comprobante"
                                v-model="numeroComprobante"
                            ></v-text-field>
                        </v-col>

                <v-col cols="3" class="d-flex align-center">
                    <p class="fs-normal greyBold--text mb-0">Monto Gravado al 10%  (IVA incluido) </p>
                </v-col>
                <v-col cols="9">
                    <v-text-field
                        type="number"
                        label="Monto Gravado al 10%  (IVA incluido) "
                        v-model.number="gravado10"
                    ></v-text-field>
                </v-col>

                <v-col cols="3" class="d-flex align-center">
                    <p class="fs-normal greyBold--text mb-0">Monto Gravado 5% (IVA Incluido)</p>
                </v-col>
                <v-col cols="9">
                    <v-text-field
                        type="number"
                        label="Monto Gravado 5% (IVA Incluido)"
                        v-model.number="gravado5"
                    ></v-text-field>
                </v-col>

                <v-col cols="3" class="d-flex align-center">
                    <p class="fs-normal greyBold--text mb-0">Monto Exento</p>
                </v-col>
                <v-col cols="9">
                    <v-text-field
                        type="number"
                        label="Monto Exento"
                        v-model.number="exento"
                    ></v-text-field>
                </v-col>

                <v-col cols="3" class="d-flex align-center">
                    <p class="fs-normal greyBold--text mb-0">Monto Total</p>
                </v-col>
                <v-col cols="9">
                    <v-text-field
                        type="number"
                        label="Monto Total"
                        v-model.number="total"
                    ></v-text-field>
                </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">Condición</p>
    </v-col>
    <v-col cols="9">
        <v-radio-group v-model="condicion" row>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="CONTADO"
            value="CONTADO"
            ></v-radio>
            </v-col>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="CRÉDITO"
            value="CRÉDITO"
            ></v-radio>
            </v-col>

        </v-radio-group>
    </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">Moneda Extranjera</p>
    </v-col>
    <v-col cols="9">
    <v-checkbox
        label="Moneda Extranjera"
        v-model="monedaExtranjera"
        hide-details
    ></v-checkbox>
    </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">Imputa IVA</p>
    </v-col>
    <v-col cols="9">
    <v-checkbox
        label="Imputa IVA"
        v-model="imputaIVA"
        hide-details
    ></v-checkbox>
    </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">Imputa IRE</p>
    </v-col>
    <v-col cols="9">
    <v-checkbox
        label="Imputa IRE"
        v-model="imputaIRE"
        hide-details
    ></v-checkbox>
    </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">Imputa IRP-RSP</p>
    </v-col>
    <v-col cols="9">
    <v-checkbox
        label="Imputa IRP-RSP"
        v-model="imputaIRPRSP"
        hide-details
    ></v-checkbox>
    </v-col>

    <ImageUploader
            label="Anexo"
            id="4DACE-C329-964F-C887"
            url="comprobante/anexo"
            :images="anexo"
            @change="anexoAdd"
            @del="anexoDel"
            />

    <FileUploader
        label="Documento"
        id="3619A-01DC-2F59-E4C1"
        url="comprobante/documento"
        :files="documento"
        @change="documentoAdd"
        @del="documentoDel"
    />

        </v-row>
            <v-btn
                type="submit"
                color="primary"
                :loading="loading"
            >
                Save
            </v-btn>

            <v-btn @click="resetData" class="ml-2">
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
            id: null,

                contribuyente: '',
                searchModelContribuyente: '',

                tipoRegistro: 'VENTAS',

                tipoIdentificacion: 'RUC',

                numeroIdentificacion: '',

                razonSocial: '',

                fecha: '',
                dateFecha: '',

                numeroComprobante: '',

                gravado10: 0,

                gravado5: 0,

                exento: 0,

                total: 0,

                condicion: 'CONTADO',

                monedaExtranjera: false,

                imputaIVA: false,

                imputaIRE: false,

                imputaIRPRSP: false,

                anexo: [],

                documento: [],

            }
    },
    computed: {
        ...mapState({
            data: state => state.comprobanteForm.data,
            loading: state => state.comprobanteForm.loading,

                    optionsContribuyente: state => state.comprobanteForm.searchResultContribuyente,

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
        },
    },
    methods: {
        ...mapMutations({
            showSnackbar: 'snackbar/showSnackbar',
        }),
        ...mapActions({

                    searchContribuyente: 'comprobanteForm/searchContribuyente',

            newHandler: 'comprobanteForm/newHandler'
        }),
        async submitHandler() {
            const data = {

                contribuyente: this.contribuyente,

                tipoRegistro: this.tipoRegistro,

                tipoIdentificacion: this.tipoIdentificacion,

                numeroIdentificacion: this.numeroIdentificacion,

                razonSocial: this.razonSocial,

                fecha: this.fecha,

                numeroComprobante: this.numeroComprobante,

                gravado10: this.gravado10,

                gravado5: this.gravado5,

                exento: this.exento,

                total: this.total,

                condicion: this.condicion,

                monedaExtranjera: this.monedaExtranjera,

                imputaIVA: this.imputaIVA,

                imputaIRE: this.imputaIRE,

                imputaIRPRSP: this.imputaIRPRSP,

                anexo: this.anexo,

                documento: this.documento,

            }

                const contribuyenteEl = this.optionsContribuyente.filter(i => i.label === this.contribuyente)
                data.contribuyente = contribuyenteEl.length ? contribuyenteEl[0].id : null

        try {
                await this.newHandler({data})
                this.$router.push('/admin/comprobante')
            } catch (e) {
            console.log(e)
                this.showSnackbar(e)
            }
        },

        anexoAdd(val) {
            this.anexo.push(val)
        },
        anexoDel(id) {
            this.anexo = this.anexo.filter(img => img.id !== id)
        },

        documentoAdd(val) {
            this.documento.push(val)
        },
        documentoDel(id) {
            this.documento = this.documento.filter(file => file.id !== id)
        },

            resetData() {

                    this.contribuyente = ''

                    this.tipoRegistro = 'VENTAS';

                    this.tipoIdentificacion = 'RUC';

                    this.numeroIdentificacion =  ''

                    this.razonSocial =  ''

                    this.fecha = ''

                    this.numeroComprobante =  ''

                    this.gravado10 = 0

                    this.gravado5 = 0

                    this.exento = 0

                    this.total = 0

                    this.condicion = 'CONTADO';

                    this.monedaExtranjera = false

                    this.imputaIVA = false

                    this.imputaIRE = false

                    this.imputaIRPRSP = false

                    this.anexo = []

                    this.documento = []

            },
        },
        async beforeMount() {

                await this.searchContribuyente()

    },
    watch: {

        async searchModelContribuyente() {
            await this.searchContribuyente(this.searchModelContribuyente)
        },

    },
    components: {ImageUploader, FileUploader, Editor, VDatetimePicker: () => import('vuetify-datetime-picker/src/components/DatetimePicker.vue') }
}
</script>

