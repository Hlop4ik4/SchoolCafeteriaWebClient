<template>
    <v-card class="mt-5 pa-5" style="min-width: 900px;">
        <div class="d-flex flex-row">
            <v-spacer></v-spacer>
            <v-dialog max-width="720">
                <template #activator="{props: activatorProps}">
                    <v-btn
                        v-bind="activatorProps"
                        color="green"
                        text="Добавить"
                    ></v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                    <v-card title="Новая сущность">
                        <v-text-field label="DishName" v-model="state.currentItem.dishName"></v-text-field>
                        <v-text-field label="RecipeNumber" v-model="state.currentItem.recipeNumber"></v-text-field>
                        <v-text-field label="CookingTechnology" v-model="state.currentItem.cookingTechnology"></v-text-field>
                        <v-text-field label="Description" v-model="state.currentItem.description"></v-text-field>
                        <v-select
                            item-title="name"
                            item-value="id"
                            v-model="state.currentItem.techMapGoods"
                            chips
                            multiple
                            :items="state.goods"
                        ></v-select>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                text="Добавить"
                                @click="addNew(); isActive.value = false"
                            ></v-btn>
                            <v-btn
                                text="Закрыть"
                                @click="isActive.value = false"
                            ></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </div>
        <v-table>
            <thead>
            <tr>
                <th class="text-left">
                    DishName
                </th>
                <th class="text-left">
                    RecipeNumber
                </th>
                <th class="text-left">
                    CookingTechnology
                </th>
                <th class="text-left">
                    Description
                </th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, idx) in state.data" :key="idx">
                <td>{{item.dishName}}</td>
                <td>{{item.recipeNumber}}</td>
                <td>{{item.cookingTechnology}}</td>
                <td>{{item.description}}</td>
                <td>
                    <div class="d-flex flex-row">
                        <v-dialog max-width="720">
                            <template #activator="{props: activatorProps}">
                                <v-btn
                                    v-bind="activatorProps"
                                    color="green"
                                    class="mr-1"
                                    text="Обновить"
                                    @click="setStateForUpdate(item)"
                                ></v-btn>
                            </template>
                            <template v-slot:default="{ isActive }">
                                <v-card title="Новая сущность">
                                    <v-text-field label="DishName" v-model="state.updateItem.dishName"></v-text-field>
                                    <v-text-field label="RecipeNumber" v-model="state.updateItem.recipeNumber"></v-text-field>
                                    <v-text-field label="CookingTechnology" v-model="state.updateItem.cookingTechnology"></v-text-field>
                                    <v-text-field label="Description" v-model="state.updateItem.description"></v-text-field>
                                    <v-select
                                        item-title="name"
                                        item-value="id"
                                        v-model="state.updateItem.techMapGoods"
                                        chips
                                        multiple
                                        :items="state.goods"
                                    ></v-select>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text="Обновить"
                                            color="purple"
                                            @click="updateThis(item); isActive.value = false"
                                        ></v-btn>
                                        <v-btn
                                            text="Закрыть"
                                            @click="isActive.value = false"
                                        ></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                        <v-btn
                            text="Удалить"
                            color="pink"
                            @click="deleteThis(item)"
                        ></v-btn>
                    </div>
                </td>
            </tr>
            </tbody>
        </v-table>
    </v-card>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import axios from "axios";

let state = reactive({
    data: [],
    currentItem: {
        dishName: "",
        recipeNumber: "",
        cookingTechnology: "",
        description: "",
        techMapGoods: []
    },
    updateItem: {
        id: "",
        dishName: "",
        recipeNumber: "",
        cookingTechnology: "",
        description: "",
        techMapGoods: []
    },
    goods: []
})

onMounted(async () => {
    await getAll();
    await getAllGoods();
})

async function getAll() {
    let res = await axios.get("http://localhost:5155/TechnologicalMaps/Get");
    state.data = res.data;
}

async function getAllGoods() {
    let res = await axios.get("http://localhost:5155/Goods/Get");
    state.goods = res.data;
}

async function addNew() {
    let data = state.currentItem;
    await axios.post("http://localhost:5155/TechnologicalMaps/Create", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })

    await getAll();
}

function setStateForUpdate(item) {
    state.updateItem.id = item.id;
    state.updateItem.dishName = item.dishName;
    state.updateItem.recipeNumber = item.recipeNumber;
    state.updateItem.cookingTechnology = item.cookingTechnology;
    state.updateItem.description = item.description;
    state.updateItem.techMapGoods = item.techMapGoods;
}

async function updateThis() {
    let data = state.updateItem;
    await axios.patch("http://localhost:5155/TechnologicalMaps/Update", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })

    await getAll();
}

async function deleteThis(item) {
    await axios.post("http://localhost:5155/TechnologicalMaps/Delete", JSON.stringify(item), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    await getAll();
}
</script>

<style scoped>

</style>