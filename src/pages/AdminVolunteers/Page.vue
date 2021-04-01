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
                    Daftar Relawan
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
                                label="Cari Relawan" 
                                single-line 
                                hide-details 
                            >
                            </v-text-field>
                            <v-btn 
                                icon
                                class="red--text text--darken-3" 
                                active-class="v-btn--active white--text red darken-3" 
                                :disabled="exporting || (showVolunteers.length === 0)" 
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
                            :items="showVolunteers"
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
                                <td>{{ props.item.gender }}</td>
                                <td>{{ props.item.province }}</td>
                                <td>{{ props.item.city }}</td>
                                <td>{{ props.item.address }}</td>
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
                            @click="downloadVolunteersList"
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
        this.$store.dispatch('GetVolunteersList');
    },
    data() {
        return {
            search: '',
            fileName: '',
            fileNameDialog: false,
            exporting: false,
            progressDialog: false,
            search: '',
            headers:[
                { text: 'Tanggal Bergabung', value: 'created_at', sortable: true },
                { text: 'Nama Relawan', value: 'name', sortable: true },
                { text: 'Email', value: 'email', sortable: false },
                { text: 'Jenis Kelamin', value: 'gender', sortable: false },
                { text: 'Provinsi', value: 'province', sortable: false },
                { text: 'Kota/Kabupaten', value: 'city', sortable: false },
                { text: 'Alamat', value: 'address', sortable: false }
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
            showVolunteers: []
        }
    },
    computed: {
        ...mapGetters({
            loading: 'isLoading',
            volunteers: 'volunteers'
        })
    },
    watch: {
        volunteers (value) {
            if (value !== null) {
                this.showVolunteers = [];

                for (let i = 0; i < value.length; i++) {
                    let data = {
                        created_at: value[i].created_at === 'empty' ? '' : value[i].created_at,
                        name: value[i].name === 'empty' ? '' : value[i].name,
                        email: value[i].email === 'empty' ? '' : value[i].email,
                        gender: value[i].gender === 'empty' ? '' : value[i].gender,
                        address: value[i].address === 'empty' ? '' : value[i].address,
                        province: value[i].province === 'empty' ? '' : IndoRegion.provinces.find(item => item.id === value[i].province).name,
                        city: value[i].city === 'empty' ? '' : IndoRegion.regencies.find(item => item.id === value[i].city).name
                    }

                    this.showVolunteers.push(data);
                }
            }
        }
    },
    methods: {
        downloadVolunteersList() {
            this.fileNameDialog = false;

            this.exporting = true;
			this.progressdialog = true;

            let expOrg = [];

            for (let i = 0; i < this.volunteers.length; i++) {
                let data = {
                    No: i + 1,
                    Volunteer_ID: this.volunteers[i].uid !== 'empty' ? this.volunteers[i].uid : '',
                    Volunteer_Name: this.volunteers[i].name !== 'empty' ? this.volunteers[i].name : '',
                    Volunteer_Email: this.volunteers[i].email !== 'empty' ? this.volunteers[i].email : '',
                    Volunteer_Gender: this.volunteers[i].gender !== 'empty' ? this.volunteers[i].gender : '',
                    Volunteer_BornDate: this.volunteers[i].bornDate !== 'empty' ? this.volunteers[i].bornDate : '',
                    Volunteer_Description: this.volunteers[i].description !== 'empty' ? this.volunteers[i].description : ''
                };
                
                //Interest
                if (this.volunteers[i].interests !== 'empty') {
                    for (let j = 0; j < this.volunteers[i].interests.length; j++) {
                        data["Volunteer_Interest_" + (j + 1)] = this.volunteers[i].interests[j];
                    }
                }

                //province & city
                data.Volunteers_Province = "";
                if (this.volunteers[i].province !== 'empty') {
                    data.Volunteers_Province = IndoRegion.provinces.find(item => item.id === this.volunteers[i].province).name;
                }
                data.Volunteers_City = "";
                if (this.volunteers[i].city !== 'empty') {
                    data.Volunteers_City = IndoRegion.regencies.find(item => item.id === this.volunteers[i].city).name;
                }

                data.Volunteer_Address = this.volunteers[i].address !== 'empty' ? this.volunteers[i].address : '';

                //phones
                if (this.volunteers[i].phones !== 'empty') {
                    data.Volunteer_Phones = "";
                    for (let j = 0; j < this.volunteers[i].phones.length; j++) {
                        data.Volunteer_Phones += this.volunteers[i].phones[j].number;
                        if (j < this.volunteers[i].phones.length - 1) {
                            data.Volunteer_Phones += " | ";
                        }
                    }
                }

                data.Volunteer_Created = this.volunteers[i].created_at !== 'empty' ? this.volunteers[i].created_at : '';

                expOrg.push(data);
            }

            let WSfaqs = XLSX.utils.json_to_sheet(expOrg);
            let WBfaqs = XLSX.utils.book_new();
            
            XLSX.utils.book_append_sheet(WBfaqs, WSfaqs, 'volunteers');
            
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
