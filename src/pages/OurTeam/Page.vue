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
                    Team HereForYou
                </h2>

                <v-layout
                    wrap
                    class="px-2 py-4"
                >
                    <p class="subheading">
                        Kami adalah sekelompok mahasiswa yang sedang mengikuti Proyek Pengembangan Sistem Inforasi 2019. Semoga dengan dibangunnya HereForYou ini bisa menginspirasi teman-teman mahasiswa lainnya agar menjadi lebih baik.
                    </p>

                    <p class="subheading">
                        Tujuan dari HereForYou dia ini adalah memudahkan para relawan dan organisasi dalam mencari maupun dalam merencanakan sebuah aktivitas sosial menjadi lebih mudah.
                    </p>
                </v-layout>
                
                <v-layout
                    wrap
                    align-center
                    justify-center
                >
                    <v-flex
                        xs12
                        md4
                        class="pa-2"
                        v-for="(item, index) in teams"
                        :key="`team-${index}`"
                    >
                        <v-card
                            style="width: 100%; min-width: 150px; max-width: 300px;"
                            class="py-4 mx-auto elevation-8"
                        >
                            <v-layout
                                align-center
                                justify-center
                                class="py-2"
                            >       
                                <img 
                                    :src="item.image" 
                                    alt="avatar"
                                    height="220px"
                                >
                            </v-layout>

                            <h2
                                class="mt-2 text-xs-center red--text text--darken-3 font-weight-bold"
                            >
                                {{ item.name }}
                            </h2>
                            
                            <p
                                class="mt-2 mb-0 text-xs-center"
                            >
                                <v-icon
                                    left
                                >
                                    fab fa-instagram
                                </v-icon>
                                {{ item.ig }}
                            </p>
                            
                            <p
                                class="mt-1 mb-0 text-xs-center"
                            >
                                <v-icon
                                    left
                                >
                                    fa-mobile-alt
                                </v-icon>
                                {{ item.phone }}
                            </p>
                            
                            <p
                                class="mt-1 mb-0 text-xs-center"
                            >
                                <v-icon
                                    left
                                >
                                    far fa-envelope
                                </v-icon>
                                {{ item.email }}
                            </p>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            teams: [
                {
                    image: "https://firebasestorage.googleapis.com/v0/b/hereforyou-5044b.appspot.com/o/default%2Fyap_41815120002_com.png?alt=media&token=3f8a8727-3da2-412d-b7e4-5332556a4746",
                    name: "Yudistia Adnan Putri",
                    ig: "@distyoh",
                    phone: "085230626698",
                    email: "ydstia.adnan@gmail.com",
                },
                {
                    image: "https://firebasestorage.googleapis.com/v0/b/hereforyou-5044b.appspot.com/o/default%2Fbda_41815120091_com.png?alt=media&token=9662b748-fe9d-4cee-8fcc-7be81478fee9",
                    name: "Bobby Dwi Adam",
                    ig: "@babebubobby",
                    phone: "089515794530",
                    email: "bobbydwiadam@gmail.com",
                },
                {
                    image: "https://firebasestorage.googleapis.com/v0/b/hereforyou-5044b.appspot.com/o/default%2Fsa_41815120024_com.png?alt=media&token=cb175641-991c-4131-bff3-b50173ad80af",
                    name: "Seli Alfiani",
                    ig: "@sely.alfiy",
                    phone: "085747711930",
                    email: "sely.aisy07@gmail.com",
                }
            ]
        }
    }
}
</script>


<style scoped>
.v-card {
    border-radius: 10px !important;
}
.v-btn {
    text-transform: unset !important;
}
</style>