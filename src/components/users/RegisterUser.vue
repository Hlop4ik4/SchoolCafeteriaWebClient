<template>
    <v-card style="width: 900px">
        <v-text-field label="Логин" v-model="state.user.login"></v-text-field>
        <v-text-field label="Пароль" v-model="state.user.password"></v-text-field>
        <v-text-field label="Пароль (повторно)" v-model="state.user.password2"></v-text-field>
    </v-card>
</template>

<script setup>
    import {reactive} from "vue";

    let state = reactive({
        user: {
            login: "",
            password: ""
        },
        password2: ""
    })

    function createUser() {

    }
</script>

<style scoped>

</style>