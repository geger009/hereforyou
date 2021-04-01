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
                    Daftar Donasi
                </h2>

                <v-layout
                    row
                    wrap
                    class="pa-3"
                >
                    <v-flex
                        xs12
                    >
                        <v-toolbar dense flat color="transparent" class="px-0">
                            <v-spacer></v-spacer>
                            <v-text-field class="mr-2 mb-2" color="red darken-3" v-model="search" append-icon="fa-search" label="Cari" single-line hide-details ></v-text-field>
                        </v-toolbar>
                    </v-flex>

                    <v-flex
                        xs12
                    >
                        <v-data-table
                            :headers="headers"
                            :items="donations"
                            class="elevation-8"
                            :loading="loading"
                            :rows-per-page-items="rowrules"
                            style="width: 100%; border-radius: 10px; overflow: hidden;"
                        >
                            <template v-slot:items="props">
                                <td>{{ props.item.donateDate }}</td>
                                <td>{{ props.item.name }}</td>
                                <td>{{ props.item.donate }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            search: '',
            headers:[
                { text: 'Tanggal Donasi', value: 'donateDate', sortable: true },
                { text: 'Nama Donatur', value: 'name', sortable: true },
                { text: 'Nilai', value: 'donate', sortable: true }
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
            donations: []
        }
    },
    computed: {
        ...mapGetters({
            loading: 'isLoading'
        })
    }
}
</script>
