<template>
    <v-app>
        <v-app-bar :elevation="2">
            <template v-slot:prepend>
                <v-app-bar-nav-icon icon="$vuetify"></v-app-bar-nav-icon>
            </template>
            <v-app-bar-title>School Cafeteria</v-app-bar-title>
            <v-spacer></v-spacer>
            <router-link to="/register">Регистрация</router-link>
            <router-link to="/auth">Авторизация</router-link>
        </v-app-bar>
        <navigation-drawer></navigation-drawer>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script setup>

import NavigationDrawer from "@/components/ui/NavigationDrawer.vue";
</script>

<style scoped>

</style>
