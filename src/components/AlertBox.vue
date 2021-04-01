<template>
    <v-alert 
        :color="color" 
        dismissible 
        @input="onClose" 
        :value="true"
    >
        {{ text }}
    </v-alert>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: 'error'
        }
    },
    methods: {
        onClose() {
            this.$emit('dismissed');
        }
    }
}
</script>
