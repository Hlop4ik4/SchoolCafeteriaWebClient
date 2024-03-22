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
                        <v-text-field label="Название блюда" v-model="state.techMapCurrentItem.dishName"></v-text-field>
                        <v-text-field label="Номер рецепта" v-model="state.techMapCurrentItem.recipeNumber"></v-text-field>
                        <v-text-field label="Технология приготовления" v-model="state.techMapCurrentItem.cookingTechnology"></v-text-field>
                        <v-text-field label="Описание" v-model="state.techMapCurrentItem.description"></v-text-field>
                        <v-select
                            item-title="name"
                            item-value="id"
                            v-model="state.techMapCurrentItem.techMapGoods"
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
                    Название блюда
                </th>
                <th class="text-left">
                    Номер рецепта
                </th>
                <th class="text-left">
                    Технология приготовления
                </th>
                <th class="text-left">
                    Описание
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
                                    <v-text-field label="Название блюда" v-model="state.techMapUpdateItem.dishName"></v-text-field>
                                    <v-text-field label="Номер рецепта" v-model="state.techMapUpdateItem.recipeNumber"></v-text-field>
                                    <v-text-field label="Технология приготовления" v-model="state.techMapUpdateItem.cookingTechnology"></v-text-field>
                                    <v-text-field label="Описание" v-model="state.techMapUpdateItem.description"></v-text-field>
                                    <v-select
                                        item-title="name"
                                        item-value="id"
                                        v-model="state.techMapUpdateItem.techMapGoods"
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
                            class="mr-1"
                            @click="deleteThis(item)"
                        ></v-btn>
                        <v-btn
                            text="Состав"
                            color="blue"
                            @click="showTechMapCompositionDialog(item)"
                        ></v-btn>
                    </div>
                </td>
            </tr>
            </tbody>
        </v-table>
        <v-dialog 
            v-model="state.isTechMapCompositionModalActive"
            max-width="720"
        >
            <template v-slot:default="{ isActive }">
                <v-card title="Новая сущность">
                    <v-text-field label="Название блюда" v-model="state.techMapCompositionCurrentItem.techMapDishName" disabled></v-text-field>
                    <v-text-field label="Протеин" v-model="state.techMapCompositionCurrentItem.protein" disabled></v-text-field>
                    <v-text-field label="fat" v-model="state.techMapCompositionCurrentItem.fat" disabled></v-text-field>
                    <v-text-field label="Carb" v-model="state.techMapCompositionCurrentItem.carb" disabled></v-text-field>
                    <v-text-field label="b1" v-model="state.techMapCompositionCurrentItem.b1" disabled></v-text-field>
                    <v-text-field label="c" v-model="state.techMapCompositionCurrentItem.c" disabled></v-text-field>
                    <v-text-field label="a" v-model="state.techMapCompositionCurrentItem.a" disabled></v-text-field>
                    <v-text-field label="e" v-model="state.techMapCompositionCurrentItem.e" disabled></v-text-field>
                    <v-text-field label="ca" v-model="state.techMapCompositionCurrentItem.ca" disabled></v-text-field>
                    <v-text-field label="p" v-model="state.techMapCompositionCurrentItem.p" disabled></v-text-field>
                    <v-text-field label="mg" v-model="state.techMapCompositionCurrentItem.mg" disabled></v-text-field>
                    <v-text-field label="fe" v-model="state.techMapCompositionCurrentItem.fe" disabled></v-text-field>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            text="Закрыть"
                            @click="isActive.value = false"
                        ></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-card>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import axios from "axios";

let state = reactive({
    data: [],
    techMapCurrentItem: {
        dishName: "",
        recipeNumber: "",
        cookingTechnology: "",
        description: "",
        techMapGoods: []
    },
    techMapUpdateItem: {
        id: "",
        dishName: "",
        recipeNumber: "",
        cookingTechnology: "",
        description: "",
        techMapGoods: []
    },
    techMapCompositionCurrentItem: {
        techMapDishName: "",
        protein: "",
        fat: "",
        carb: "",
        b1: "",
        c: "",
        a: "",
        e: "",
        ca: "",
        p: "",
        mg: "",
        fe: "",
    },
    isTechMapCompositionModalActive: false,
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
    let data = state.techMapCurrentItem;
    await axios.post("http://localhost:5155/TechnologicalMaps/Create", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })

    await getAll();

    state.techMapCurrentItem = {
        dishName: "",
        recipeNumber: "",
        cookingTechnology: "",
        description: "",
        techMapGoods: []
    }
}

function setStateForUpdate(item) {
    state.techMapUpdateItem.id = item.id;
    state.techMapUpdateItem.dishName = item.dishName;
    state.techMapUpdateItem.recipeNumber = item.recipeNumber;
    state.techMapUpdateItem.cookingTechnology = item.cookingTechnology;
    state.techMapUpdateItem.description = item.description;
    state.techMapUpdateItem.techMapGoods = item.techMapGoods;
}

async function updateThis() {
    let data = state.techMapUpdateItem;
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

async function showTechMapCompositionDialog(techMapItem) {
    let res = await axios.get("http://localhost:5155/TechMapComposition/Get/" + techMapItem.id);

    state.techMapCompositionCurrentItem.techMapDishName = techMapItem.dishName;
    state.techMapCompositionCurrentItem.protein = res.data.protein;
    state.techMapCompositionCurrentItem.fat = res.data.fat;
    state.techMapCompositionCurrentItem.carb = res.data.carb;
    state.techMapCompositionCurrentItem.b1 = res.data.b1;
    state.techMapCompositionCurrentItem.c = res.data.c;
    state.techMapCompositionCurrentItem.a = res.data.a;
    state.techMapCompositionCurrentItem.e = res.data.e;
    state.techMapCompositionCurrentItem.ca = res.data.ca;
    state.techMapCompositionCurrentItem.p = res.data.p;
    state.techMapCompositionCurrentItem.mg = res.data.mg;
    state.techMapCompositionCurrentItem.fe = res.data.fe;

    state.isTechMapCompositionModalActive = true;
}
</script>

<style scoped>

</style>