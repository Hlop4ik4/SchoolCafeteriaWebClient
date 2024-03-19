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
                        <v-select 
                            item-title="name"
                            item-value="id"
                            v-model="state.currentItem.goodsId"
                            :items="state.goods"
                        ></v-select>
                        <v-text-field label="Протеин" v-model="state.currentItem.protein"></v-text-field>
                        <v-text-field label="fat" v-model="state.currentItem.fat"></v-text-field>
                        <v-text-field label="Carb" v-model="state.currentItem.carb"></v-text-field>
                        <v-text-field label="b1" v-model="state.currentItem.b1"></v-text-field>
                        <v-text-field label="c" v-model="state.currentItem.c"></v-text-field>
                        <v-text-field label="a" v-model="state.currentItem.a"></v-text-field>
                        <v-text-field label="e" v-model="state.currentItem.e"></v-text-field>
                        <v-text-field label="ca" v-model="state.currentItem.ca"></v-text-field>
                        <v-text-field label="p" v-model="state.currentItem.p"></v-text-field>
                        <v-text-field label="mg" v-model="state.currentItem.mg"></v-text-field>
                        <v-text-field label="fe" v-model="state.currentItem.fe"></v-text-field>

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
                    id Goods
                </th>
                <th class="text-left">
                    Protein
                </th>
                <th class="text-left">
                    Fat
                </th>
                <th class="text-left">
                    Carb
                </th>
                <th class="text-left">
                    B1
                </th>
                <th class="text-left">
                    C
                </th>
                <th class="text-left">
                    A
                </th>
                <th class="text-left">
                    E
                </th>
                <th class="text-left">
                    Ca
                </th>
                <th class="text-left">
                    P
                </th>
                <th class="text-left">
                    Mg
                </th>
                <th class="text-left">
                    Fe
                </th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, idx) in state.data" :key="idx">
                <td>{{item.goodsId}}</td>
                <td>{{item.protein}}</td>
                <td>{{item.fat}}</td>
                <td>{{item.carb}}</td>
                <td>{{item.b1}}</td>
                <td>{{item.c}}</td>
                <td>{{item.a}}</td>
                <td>{{item.e}}</td>
                <td>{{item.ca}}</td>
                <td>{{item.p}}</td>
                <td>{{item.mg}}</td>
                <td>{{item.fe}}</td>
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
                                    <v-select 
                                        item-title="name"
                                        item-value="id"
                                        v-model="state.updateItem.goodsId"
                                        :items="state.goods"
                                    ></v-select>
                                    <v-text-field label="Протеин" v-model="state.updateItem.protein"></v-text-field>
                                    <v-text-field label="fat" v-model="state.updateItem.fat"></v-text-field>
                                    <v-text-field label="Carb" v-model="state.updateItem.carb"></v-text-field>
                                    <v-text-field label="b1" v-model="state.updateItem.b1"></v-text-field>
                                    <v-text-field label="c" v-model="state.updateItem.c"></v-text-field>
                                    <v-text-field label="a" v-model="state.updateItem.a"></v-text-field>
                                    <v-text-field label="e" v-model="state.updateItem.e"></v-text-field>
                                    <v-text-field label="ca" v-model="state.updateItem.ca"></v-text-field>
                                    <v-text-field label="p" v-model="state.updateItem.p"></v-text-field>
                                    <v-text-field label="mg" v-model="state.updateItem.mg"></v-text-field>
                                    <v-text-field label="fe" v-model="state.updateItem.fe"></v-text-field>

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
        goodsId: "",
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
    updateItem: {
        id: "",
        goodsId: "",
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
    goods: []
})

onMounted(() => {
    getAll();
    getAllGoods();
})

function getAll() {
    axios.get("http://localhost:5155/GoodsComposition/Get")
        .then(res => {
            state.data = res.data;
        })
}

function getAllGoods() {
    axios.get("http://localhost:5155/Goods/Get")
        .then(res => {
            state.goods = res.data;
        })
}

function addNew() {
    let data = state.currentItem;
    axios.post("http://localhost:5155/GoodsComposition/Create", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => console.log(res))
    getAll();
}

function setStateForUpdate(item) {
    state.updateItem.id = item.id;
    state.updateItem.goodsId = item.goodsId;
    state.updateItem.protein = item.protein;
    state.updateItem.fat = item.fat;
    state.updateItem.carb = item.carb;
    state.updateItem.b1 = item.b1;
    state.updateItem.c = item.c;
    state.updateItem.a = item.a;
    state.updateItem.e = item.e;
    state.updateItem.ca = item.ca;
    state.updateItem.p = item.p;
    state.updateItem.mg = item.mg;
    state.updateItem.fe = item.fe;
}

function updateThis() {
    let data = state.updateItem;
    console.log(data)
    axios.patch("http://localhost:5155/GoodsComposition/Update", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })
    getAll();
}

function deleteThis(item) {
    axios.post("http://localhost:5155/GoodsComposition/Delete", JSON.stringify(item), {
        headers: {
            "Content-Type": "application/json"
        }
    });
    getAll();
}
</script>

<style scoped>

</style>