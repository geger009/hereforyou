<template>
    <v-footer
        height="auto"
    >
        <v-layout
            wrap
            class="pt-4 px-5 red darken-3 white--text"
            :class="{
                'pb-3': $vuetify.breakpoint.mdAndUp
            }"
        >
            <!-- <v-flex
                xs12
                sm6
                md2
                class="py-1"
            >
                <p
                    class="subheading font-weight-bold"
                >
                    Relawan
                </p>
                <p
                    class="mb-1"
                >
                    Item pertama
                </p>
                <p
                    class="mb-1"
                >
                    Item kedua
                </p>
                <p
                    class="mb-1"
                >
                    Item ketiga
                </p>
                <p
                    class="mb-1"
                >
                    Item keempat
                </p>
            </v-flex>
            <v-flex
                xs12
                sm6
                md2
                class="py-1"
            >
                <p
                    class="subheading font-weight-bold"
                >
                    Organisasi
                </p>
                <p
                    class="mb-1"
                >
                    Item pertama
                </p>
                <p
                    class="mb-1"
                >
                    Item kedua
                </p>
                <p
                    class="mb-1"
                >
                    Item ketiga
                </p>
                <p
                    class="mb-1"
                >
                    Item keempat
                </p>
            </v-flex>
            <v-flex
                xs12
                sm6
                md2
                class="py-1"
            >
                <p
                    class="subheading font-weight-bold"
                >
                    Donasi
                </p>
                <p
                    class="mb-1"
                >
                    Item pertama
                </p>
                <p
                    class="mb-1"
                >
                    Item kedua
                </p>
                <p
                    class="mb-1"
                >
                    Item ketiga
                </p>
                <p
                    class="mb-1"
                >
                    Item keempat
                </p>
            </v-flex>
            <v-flex
                xs12
                sm6
                md2
                class="py-1"
            >
                <p
                    class="subheading font-weight-bold"
                >
                    Tentang
                </p>
                <p
                    class="mb-1"
                >
                    Item pertama
                </p>
                <p
                    class="mb-1"
                >
                    Item kedua
                </p>
                <p
                    class="mb-1"
                >
                    Item ketiga
                </p>
                <p
                    class="mb-1"
                >
                    Item keempat
                </p>
            </v-flex> -->
            
            <v-flex
                xs12
                class="pt-2"
            >
                <v-divider
                    class="py-1"
                    v-if=$vuetify.breakpoint.smAndDown
                />
                <p
                    class='text-xs-center'
                    :class="{
                        'text-xs-right': $vuetify.breakpoint.mdAndUp
                    }"
                >
                    &copy;2019 — <strong>HereForYou</strong>
                </p>
            </v-flex>
        </v-layout>
        <!-- <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-xs-center"
        >
            <v-card-text>
                <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-3 white--text"
                icon
                >
                    <v-icon size="24px">{{ icon }}</v-icon>
                </v-btn>
            </v-card-text>

            <v-card-text class="white--text pt-0">
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
                &copy;2019 — <strong>HereForYou</strong>
            </v-card-text>
        </v-card> -->
    </v-footer>
</template>

<script>
    export default {
        data: () => ({
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-linkedin',
                'fab fa-instagram'
            ]
        })
    }
</script>
