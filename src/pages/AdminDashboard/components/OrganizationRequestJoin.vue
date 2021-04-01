<template>
    <div>
        <v-layout
            class="pa-3"
        >
            <v-data-table
                :items="showOrganizations"
                class="elevation-8"
                hide-actions
                hide-headers
                style="width: 100%; border-radius: 10px; overflow: hidden;"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.email }}</td>
                    <td>{{ provinces.find(item => item.id === props.item.province).name }}</td>
                    <td>{{ regencies.find(item => item.id === props.item.city).name }}</td>
                    <td>{{ props.item.address }}</td>
                    <td>
                        <v-layout
                            row
                            justify-end
                        >
                            <v-btn
                                round
                                color="warning"
                                text-color="white"
                                @click="setOrganization(props.item)"
                            >
                                Proses
                            </v-btn>
                        </v-layout>
                    </td>
                </template>
            </v-data-table>

            <v-dialog
                v-model="orgDialog" 
                fullscreen
                hide-overlay 
                transition="dialog-bottom-transition"
            >
                <v-card>
                    <v-toolbar dark class="red darken-3">
                        <v-btn icon dark @click="cancelProcessOrg">
                            <v-icon>fa-times</v-icon>
                        </v-btn>
                        <v-toolbar-title>Proses Organisasi</v-toolbar-title>
                    </v-toolbar>

                    <v-layout
                        wrap
                        class="px-4"
                    >
                        <!-- Avatars Sections -->
                        <v-flex
                            xs12
                        >
                            <h1
                                class="font-weight-bold pa-2 my-2 headline"
                            >
                                {{ selectedItem.name }}
                            </h1>
                        </v-flex>

                        <!-- TODO: Section 2 -->
                        <v-flex
                            xs12
                        >
                            <v-layout
                                wrap
                                fill-height
                                align-center
                                justify-center
                            >
                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-textarea
                                        :readonly="true"
                                        label="Email"
                                        v-model="selectedItem.email"
                                        color="red darken-3" 
                                        :no-resize="true"
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex
                            xs12
                        >
                            <v-layout
                                wrap
                                fill-height
                                align-center
                                justify-center
                            >
                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-textarea
                                        :readonly="true"
                                        label="Deskripsi diri"
                                        v-model="selectedItem.description"
                                        color="red darken-3" 
                                        :no-resize="true"
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex
                            xs12
                        >
                            <v-layout
                                wrap
                                fill-height
                                align-center
                                justify-center
                            >
                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                >
                                    <v-text-field
                                        :readonly="true"
                                        label="Provinsi"
                                        v-model="province"
                                        color="red darken-3"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                >
                                    <v-text-field
                                        :readonly="true"
                                        label="Kabupaten/Kota"
                                        v-model="city"
                                        color="red darken-3"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-flex
                                    xs12
                                    class="pa-2"
                                >
                                    <v-text-field 
                                        :readonly="true"
                                        label="Alamat" 
                                        color="red darken-3" 
                                        v-model="selectedItem.address"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex
                            xs12
                        >
                            <v-layout
                                wrap
                                fill-height
                                align-center
                                :justify-center="selectedItem.phones.length === 0"
                            >
                                <v-flex
                                    xs12
                                    sm6
                                    class="pa-2"
                                    v-for="(item, index) in selectedItem.phones"
                                    :key="`phoneNum-${index}`"
                                >
                                    <v-text-field 
                                        :readonly="true"
                                        :prepend-icon="item.type === 0 ? 'fa-phone' : 'fa-mobile-alt'"
                                        :label="item.type === 0 ? 'Telepon' : 'Mobile'"
                                        :mask="item.type === 0 ? '###-#####' : '####-####-#####'"
                                        :placeholder="item.type === 0 ? 'XXX-XXXXX' : 'XXXX-XXXX-XXXXX'"
                                        type="text"
                                        color="red darken-3" 
                                        v-model="item.number"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            round
                            :disabled="loading"
                            :loading="loading"
                            class="red darken-3 white--text"
                            @click="processOrg('reject')"
                        >
                            Tolak
                        </v-btn>
                        <v-btn
                            round
                            :disabled="loading"
                            :loading="loading"
                            class="red darken-3 white--text"
                            @click="processOrg('accept')"
                        >
                            Terima
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import IndoRegion from "@/utils/indonesia-region"

export default {
    mounted() {
        this.$store.dispatch('GetOrganizationsReqList');
    },
    data() {
        return {
            selectedItem: {
                id: '',
                uid: '',
                role: '',
                name: '',
                email: '',
                description: '',
                province: '',
                city: '',
                address: '',
                phones: [],
                status: '',
                created_at: ''
            },
            provinces: IndoRegion.provinces,
            regencies: IndoRegion.regencies,
            province: '',
            city: '',
            orgDialog: false,
            showOrganizations: []
        }
    },
    computed: {
        ...mapGetters({
            loading: 'isLoading',
            organizationsReq: 'organizationsReq'
        })
    },
    watch: {
        organizationsReq (value) {
            if (value !== null) {
                this.showOrganizations = [];

                if (value.find(item => item.status === 'pending')) {
                    const pendingOrg = value.filter(item => item.status === 'pending');
                    this.showOrganizations = [ ... pendingOrg];
                    /* for (let i = 0; i < pendingOrg.length; i++) {
                        this.showOrganizations.push(pendingOrg[i]);
                    } */
                }
            }
        }
    },
    methods: {
        setOrganization(item) {
            this.selectedItem = { ...item };
            this.province = this.provinces.find(data => data.id === this.selectedItem.province).name;
            this.city = this.regencies.find(data => data.id === this.selectedItem.city).name;
            this.orgDialog = true;
        },
        cancelProcessOrg() {
            this.province = '';
            this.city = '';
            this.selectedItem = {
                id: '',
                uid: '',
                role: '',
                name: '',
                email: '',
                description: '',
                province: '',
                city: '',
                address: '',
                phones: [],
                status: '',
                created_at: ''
            };
            this.orgDialog = false;
        },
        processOrg(status) {
            this.selectedItem.status = status;

            this.$store.dispatch('VerifyOrganization', this.selectedItem)
            .then(
                () => {
                    this.province = '';
                    this.city = '';
                    this.selectedItem = {
                        id: '',
                        uid: '',
                        role: '',
                        name: '',
                        email: '',
                        description: '',
                        province: '',
                        city: '',
                        address: '',
                        phones: [],
                        status: '',
                        created_at: ''
                    };
                    this.orgDialog = false;

                    this.$store.dispatch('GetOrganizationsReqList');
                }
            )
            .catch(
                () => {
                    this.province = '';
                    this.city = '';
                    this.selectedItem = {
                        id: '',
                        uid: '',
                        role: '',
                        name: '',
                        email: '',
                        description: '',
                        province: '',
                        city: '',
                        address: '',
                        phones: [],
                        status: '',
                        created_at: ''
                    };
                    this.orgDialog = false;
                }
            )
        }
    }
}
</script>

<style scoped>
.v-btn {
    text-transform: unset !important;
}
</style>
