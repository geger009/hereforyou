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
                    Notifikasi
                </h2>

                <v-layout
                    wrap
                    class="pa-3"
                >
                    <v-flex
                        xs12
                        v-if="notifications.length > 0"
                    >
                        <v-list three-line>
                            <v-list-tile
                                v-for="(item, index) in notifications"
                                :key="`notif-${index}`"
                                avatar
                                :class="{
                                    'red': item.status_read === 'unread',
                                    'lighten-4': item.status_read === 'unread'
                                }"
                            >
                                <v-list-tile-avatar>
                                    <img :src="item.profilePicture">
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-sub-title v-html="getMessage(item.from, item.notifType, item.activityName)"></v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-flex>

                    <v-flex
                        xs12
                        v-if="notifications.length === 0"
                    >
                        <p
                            class="red--text text--darken-3 text-xs-center"
                        >
                            Tidak ada notifikasi
                        </p>
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
            notifications: []
        }
    },
    methods: {
        getMessage(_from, _type, _activityName) {
            //TODO: notif table | id | to_uid | from_uid | notif_type | activity_name | status_read | created_at |
            let msg = "";

            switch (_type) {
                case 0:
                    msg = "<span class='text--primary'>" + _from + "</span> mengundang kamu untuk bergabung pada <span class='text--primary'>" + _activityName + "</span>.";
                    break;
                case 1:
                    msg = "Permintaan bergabung untuk aktivitas <span class='text--primary'>" + _activityName + "</span> telah diterima oleh <span class='text--primary'>" + _from + "</span>.";
                    break;
                case 2:
                    msg = "Permintaan bergabung untuk aktivitas <span class='text--primary'>" + _activityName + "</span> ditolak oleh <span class='text--primary'>" + _from + "</span>.";
                    break;
                case 3:
                    msg = "<span class='text--primary'>" + _from + "</span> memberikan apresiasi untuk kamu.";
                    break;
            }

            return msg;
        }
    }
}
</script>
