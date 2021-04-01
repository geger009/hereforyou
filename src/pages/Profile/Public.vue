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
                <v-layout
                    wrap
                    class="px-4"
                >
                    <!-- Avatars Sections -->
                    <avatar-section
                        :id="id"
                        :name="name"
                        :profilePicture="profilePicture"
                        :appreciation="appreciation"
                        :activity="activities.length"
                    />

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
                                    label="Deskripsi diri"
                                    v-model="description"
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
                                    label="Ketertarikan Utama" 
                                    v-model="interest_1"
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
                                    label="Ketertarikan Tambahan"
                                    v-model="interest_2"
                                    color="red darken-3"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    
                    <v-flex
                        xs12
                        v-if="role === 'organization'"
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
                                <v-text-field
                                    :readonly="true"
                                    label="Website"
                                    v-model="website"
                                    color="red darken-3" 
                                ></v-text-field>
                            </v-flex>
                            <v-flex
                                xs12
                                class="pa-2"
                            >
                                <v-text-field
                                    :readonly="true"
                                    label="Nama Admin"
                                    v-model="adminName"
                                    color="red darken-3" 
                                ></v-text-field>
                            </v-flex>
                            <v-flex
                                xs12
                                class="pa-2"
                            >
                                <v-text-field
                                    :readonly="true"
                                    label="Email Admin"
                                    v-model="adminEmail"
                                    color="red darken-3" 
                                ></v-text-field>
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
                                    v-model="address"
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
                            :justify-center="phones !== 'empty' && phones.length === 0"
                        >
                            <v-flex
                                xs12
                                sm6
                                class="pa-2"
                                v-for="(item, index) in phones"
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

                    <!-- TODO: Section Testimonies/Comments -->
                    <!-- <v-flex
                        xs12
                        v-if="userRole === 'organization'"
                    >
                    </v-flex> -->
                </v-layout>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AvatarSection from './components/public/AvatarSection'
import IndoRegion from "@/utils/indonesia-region"
import InterestsList from "@/utils/interests"

export default {
    mounted() {
        this.$store.dispatch('GetVolunteersList');
    },
    components: {
        AvatarSection: AvatarSection
    },
    data() {
        return{
            id: '',
            name: '',
            role: '',
            profilePicture: '',
            appreciation: 0,
            activities: [],
            description: '',
            interest_1: '',
            interest_2: '',
            website: '',
            adminName: '',
            adminEmail: '',
            province: '',
            city: '',
            address: '',
            phones: [],
        }
    },
    computed: {
        ...mapGetters({
            userRole: 'userRole',
            volunteers: 'volunteers'
        })
    },
    watch: {
        volunteers (value) {
            if (value === null) return;

            let data = value.find(item => item.id == this.$route.params.profile_id);
            
            this.id = data.id;
            this.name = data.name;
            this.role = data.role;
            this.profilePicture = data.profilePicture;
            this.appreciation = data.appreciation;
            this.activities = data.activities === 'empty' ? [] : data.activities;
            this.description = data.description;
            this.phones = data.phones === 'empty' ? [] : data.phones;

            if (IndoRegion.provinces.find(item => item.id === data.province)) {
                this.province = IndoRegion.provinces.find(item => item.id === data.province).name;
            } else {
                this.province = "-";
            }
            
            if (IndoRegion.regencies.find(item => item.id === data.city)) {
                this.city = IndoRegion.regencies.find(item => item.id === data.city).name;
            } else {
                this.city = "-";
            }

            this.address = data.address;

            if (this.role === 'organization') {
                this.website = data.website;
                this.adminName = data.adminName;
                this.adminEmail = data.adminEmail
            }

            if (data.interests === 'empty') return;

            if (data.interests.length > 0) {
                this.interest_1 = "-";
                this.interest_2 = "-";

                for (let i = 0; i < data.interests.length; i++) {
                    if (i === 0) {
                        if (InterestsList.find(item => item.id === data.interests[i])) {
                            this.interest_1 = InterestsList.find(item => item.id === data.interests[i]).text;
                        }
                    } else if (i === 1) {
                        if (InterestsList.find(item => item.id === data.interests[i])) {
                            this.interest_2 = InterestsList.find(item => item.id === data.interests[i]).text;
                        }
                    }
                }
            } else {
                this.interest_1 = "-";
                this.interest_2 = "-";
            }
        }
    }
}
</script>

<style scoped>
.v-card {
    border-radius: 10px;
}
.v-btn {
    text-transform: unset !important;
}
</style>
