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
                        <v-text-field label="Название" v-model="state.currentItem.name"></v-text-field>
                        <v-text-field label="Цена" v-model="state.currentItem.price"></v-text-field>

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
                    Название
                </th>
                <th class="text-left">
                    Цена
                </th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, idx) in state.data" :key="idx">
                <td>{{item.name}}</td>
                <td>{{item.price}}</td>
                <td>
                    <div class="d-flex flex-row" style="justify-content: right;">
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
                                    <v-text-field label="Название" v-model="state.updateItem.name"></v-text-field>
                                    <v-text-field label="Цена" v-model="state.updateItem.price"></v-text-field>

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
        name: "",
        price: ""
    },
    updateItem: {
        id: "",
        name: "",
        price: ""
    }
})

onMounted(async () => {
    await getAll();
})

async function getAll() {
    let res = await axios.get("http://localhost:5155/Dishes/Get");
    state.data = res.data;
}

async function addNew() {
    let data = state.currentItem;
    await axios.post("http://localhost:5155/Dishes/Create", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    await getAll();
    
    state.currentItem = {
        name: "",
        price: ""
    }
}

function setStateForUpdate(item) {
    state.updateItem.id = item.id;
    state.updateItem.name = item.name;
    state.updateItem.price = item.price;
}

async function updateThis() {
    let data = state.updateItem;
    console.log(data)
    await axios.patch("http://localhost:5155/Dishes/Update", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    await getAll();
}

async function deleteThis(item) {
    await axios.post("http://localhost:5155/Dishes/Delete", JSON.stringify(item), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    await getAll();
}
</script>