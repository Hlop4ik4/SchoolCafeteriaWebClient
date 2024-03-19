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
                        <v-text-field label="Имя" v-model="state.currentItem.name"></v-text-field>
                        <v-text-field label="Масса брутто" v-model="state.currentItem.bruttoMass"></v-text-field>
                        <v-text-field label="Масса нетто" v-model="state.currentItem.nettoMass"></v-text-field>
                        <v-text-field label="Пометить для удаления" v-model="state.currentItem.markToDelete"></v-text-field>

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
                    Наименование
                </th>
                <th class="text-left">
                    Масса (брутто)
                </th>
                <th class="text-left">
                    Масса (нетто)
                </th>
                <th class="text-left">
                    MarkToDelete
                </th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, idx) in state.data" :key="idx">
                <td>{{item.name}}</td>
                <td>{{item.bruttoMass}}</td>
                <td>{{item.nettoMass}}</td>
                <td>{{item.markToDelete}}</td>
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
                                    <v-text-field label="Имя" v-model="state.updateItem.name"></v-text-field>
                                    <v-text-field label="Масса брутто" v-model="state.updateItem.bruttoMass"></v-text-field>
                                    <v-text-field label="Масса нетто" v-model="state.updateItem.nettoMass"></v-text-field>
                                    <v-text-field label="Пометить для удаления" v-model="state.updateItem.markToDelete"></v-text-field>

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
                            v-if="item.markToDelete == 'True'"
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
        bruttoMass: "",
        nettoMass: "",
        markToDelete: ""
    },
    updateItem: {
        id: "",
        name: "",
        bruttoMass: "",
        nettoMass: "",
        markToDelete: ""
    }
})

onMounted(() => {
    getAll();
})

function getAll() {
    axios.get("http://localhost:5155/Goods/Get")
        .then(res => {
            state.data = res.data;
        })
}

function addNew() {
    let data = state.currentItem;
    axios.post("http://localhost:5155/Goods/Create", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(getAll());
    
}

function setStateForUpdate(item) {
    state.updateItem.id = item.id;
    state.updateItem.bruttoMass = item.bruttoMass;
    state.updateItem.nettoMass = item.nettoMass;
    state.updateItem.name = item.name;
    state.updateItem.markToDelete = item.markToDelete;
}

function updateThis() {
    let data = state.updateItem;
    console.log(data)
    axios.patch("http://localhost:5155/Goods/Update", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(getAll());
}

function deleteThis(item) {
    axios.post("http://localhost:5155/Goods/Delete", JSON.stringify(item), {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(getAll());
}
</script>

<style scoped>

</style>