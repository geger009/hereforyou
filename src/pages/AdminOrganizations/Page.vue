<template>
    <v-container
        fluid
        class="px-0 py-5 mx-0"
        style="min-height: 100vh;"
    >
        <v-layout
            align-center
            column
            justify-center
            class="py-5"
        >
            <v-card
                flat
                style="width: 100%; min-width: 300px; max-width: 960px;"
                class="mx-auto transparent"
            >
                <h2 class="display-1 red--text text--darken-3 py-2 ml-1">
                    Daftar Organisasi
                </h2>

                <v-layout
                    row
                    wrap
                    class="pa-3"
                >
                    <v-flex
                        xs12
                        class="mb-3"
                    >
                        <v-toolbar dense flat color="transparent" class="px-0">
                            <v-spacer></v-spacer>
                            <v-text-field 
                                class="mr-2 mb-2" 
                                color="red darken-3" 
                                v-model="search" 
                                append-icon="fa-search" 
                                label="Cari Organisasi" 
                                single-line 
                                hide-details 
                            >
                            </v-text-field>
                            <v-btn 
                                icon
                                class="red--text text--darken-3" 
                                active-class="v-btn--active white--text red darken-3" 
                                :disabled="exporting || (showOrganizations.length === 0)" 
                                @click="fileNameDialog = true"
                            >
                                <v-icon>fa-file-download</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-flex>

                    <v-flex
                        xs12
                    >
                        <v-data-table
                            :headers="headers"
                            :items="showOrganizations"
                            class="elevation-8"
                            :loading="loading"
                            :search="search"
                            :rows-per-page-items="rowrules"
                            style="width: 100%; border-radius: 10px; overflow: hidden;"
                        >
                            <template v-slot:items="props">
                                <td>{{ props.item.created_at }}</td>
                                <td>{{ props.item.name }}</td>
                                <td>{{ props.item.email }}</td>
                                <td>{{ props.item.province }}</td>
                                <td>{{ props.item.city }}</td>
                                <td>{{ props.item.address }}</td>
                                <td>{{ props.item.website }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-card>

            <v-dialog 
                v-model="fileNameDialog" 
                max-width="450px" 
                persistent
            >
				<v-card
                    class="v-card__Dlg pa-3"
                >
					<v-text-field 
                        autofocus
                        label="Nama File" 
                        type="text"
                        color="red darken-3" 
                        v-model="fileName"
                    >
                    </v-text-field>
                    
				    <v-card-actions class="px-3">
                        <v-btn
                            round
                            class="red darken-3 white--text"
                            @click="fileNameDialog = false"
                        >
                            Batal
                        </v-btn>
                        <v-spacer/>
                        <v-btn
                            round
                            :disabled="fileName === '' || fileName === ' '"
                            class="amber darken-3 white--text"
                            @click="downloadOrganizationsList"
                        >
                            Unduh
                        </v-btn>
				    </v-card-actions>
				</v-card>
            </v-dialog>

            <v-dialog 
                v-model="progressDialog" 
                max-width="450px" 
                persistent
            >
				<v-card
                    class="v-card__Dlg"
                >
					<v-card-title>
						<span class="headline">Mohon tunggu...</span>
					</v-card-title>
				    <v-card-actions class="px-3">
                        <v-progress-linear 
                            color="red"
                            indeterminate
                        ></v-progress-linear>
				    </v-card-actions>
				</v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import IndoRegion from "@/utils/indonesia-region"
import XLSX from 'xlsx'
import Blob from 'blob'
import FileSaver from 'file-saver'

export default {
    mounted() {
        this.$store.dispatch('GetOrganizationsList');
    },
    data() {
        return {
            search: '',
            fileName: '',
            fileNameDialog: false,
            exporting: false,
            progressDialog: false,
            headers:[
                { text: 'Tanggal Bergabung', value: 'created_at', sortable: true },
                { text: 'Nama Organisasi', value: 'name', sortable: true },
                { text: 'Email', value: 'email', sortable: false },
                { text: 'Provinsi', value: 'province', sortable: true },
                { text: 'Kota/Kabupaten', value: 'city', sortable: true },
                { text: 'Alamat', value: 'address', sortable: false },
                { text: 'Website', value: 'website', sortable: false},
            ],
            rowrules: [
				100,
                500,
                1000,
				{ 
					"text": "$vuetify.dataIterator.rowsPerPageAll",
					"value": -1
				}
            ],
            showOrganizations: []
        }
    },
    computed: {
        ...mapGetters({
            loading: 'isLoading',
            organizations: 'organizations'
        })
    },
    watch: {
        organizations (value) {
            if (value !== null) {
                this.showOrganizations = [];

                for (let i = 0; i < value.length; i++) {
                    let data = {
                        created_at: value[i].created_at === 'empty' ? '' : value[i].created_at,
                        name: value[i].name === 'empty' ? '' : value[i].name,
                        email: value[i].email === 'empty' ? '' : value[i].email,
                        website: value[i].website === 'empty' ? '' : value[i].website,
                        address: value[i].address === 'empty' ? '' : value[i].address,
                        province: value[i].province === 'empty' ? '' : IndoRegion.provinces.find(item => item.id === value[i].province).name,
                        city: value[i].city === 'empty' ? '' : IndoRegion.regencies.find(item => item.id === value[i].city).name
                    }

                    this.showOrganizations.push(data);
                }
            }
        }
    },
    methods: {
        downloadOrganizationsList() {
            this.fileNameDialog = false;

            this.exporting = true;
			this.progressdialog = true;

            let expOrg = [];

            for (let i = 0; i < this.organizations.length; i++) {
                let data = {
                    No: i + 1,
                    Organization_ID: this.organizations[i].uid !== 'empty' ? this.organizations[i].uid : '',
                    Organization_Name: this.organizations[i].name !== 'empty' ? this.organizations[i].name : '',
                    Organization_Email: this.organizations[i].email !== 'empty' ? this.organizations[i].email : '',
                    Organization_BornDate: this.organizations[i].bornDate !== 'empty' ? this.organizations[i].bornDate : '',
                    Organization_Description: this.organizations[i].description !== 'empty' ? this.organizations[i].description : ''
                };
                
                //Interest
                if (this.organizations[i].interests !== 'empty') {
                    for (let j = 0; j < this.organizations[i].interests.length; j++) {
                        data["Organization_Interest_" + (j + 1)] = this.organizations[i].interests[j];
                    }
                }

                //province & city
                data.Organizations_Province = "";
                if (this.organizations[i].province !== 'empty') {
                    data.Organizations_Province = IndoRegion.provinces.find(item => item.id === this.organizations[i].province).name;
                }
                data.Organizations_City = "";
                if (this.organizations[i].city !== 'empty') {
                    data.Organizations_City = IndoRegion.regencies.find(item => item.id === this.organizations[i].city).name;
                }

                data.Organization_Address = this.organizations[i].address !== 'empty' ? this.organizations[i].address : '';

                //phones
                if (this.organizations[i].phones !== 'empty') {
                    data.Organization_Phones = "";
                    for (let j = 0; j < this.organizations[i].phones.length; j++) {
                        data.Organization_Phones += this.organizations[i].phones[j].number;
                        if (j < this.organizations[i].phones.length - 1) {
                            data.Organization_Phones += " | ";
                        }
                    }
                }

                data.Organization_Website = this.organizations[i].website !== 'empty' ? this.organizations[i].website : '';
                data.Organization_Admin_Name = this.organizations[i].adminName !== 'empty' ? this.organizations[i].adminName : '';
                data.Organization_Admin_Email = this.organizations[i].adminEmail !== 'empty' ? this.organizations[i].adminEmail : '';
                data.Organization_Created = this.organizations[i].created_at !== 'empty' ? this.organizations[i].created_at : '';

                expOrg.push(data);
            }

            let WSfaqs = XLSX.utils.json_to_sheet(expOrg);
            let WBfaqs = XLSX.utils.book_new();
            
            XLSX.utils.book_append_sheet(WBfaqs, WSfaqs, 'Organizations');
            
            let wopts = { bookType:'xlsx', bookSST:false, type:'array' };
            let WBout = XLSX.write(WBfaqs, wopts);

            let currentDate = new Date();
            let strDate = currentDate.toString();

            FileSaver.saveAs(new Blob([WBout], {type:"application/octet-stream"}), this.fileName.slice(0, 24).replace(/\s/g, "_") + ".xlsx");
            
            this.fileName = '';
            this.exporting = false;
			this.progressdialog = false;
        }
    }
}
</script>

<style scoped>
.v-card__Dlg {
    border-radius: 10px !important;
}
.v-btn {
    text-transform: unset !important;
}
</style>
