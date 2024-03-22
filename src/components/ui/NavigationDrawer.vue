<template>
    <v-navigation-drawer v-model="props.open" location="left">
        <v-list nav>
            <v-list-item to="/goods" title="Продукты"></v-list-item>
            <v-list-item to="/tech-map" title="Технологические карты"></v-list-item>
            <v-list-item to="/dish" title="Блюда"></v-list-item>
            <v-list-item to="/order" title="Заказы"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
const props = defineProps({
    open: {
        type: Boolean,
        default: true
    }
})
</script>

<style scoped>

</style>