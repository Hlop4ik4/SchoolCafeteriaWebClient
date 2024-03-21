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
                        <v-text-field label="Имя" v-model="state.goodsCurrentItem.name"></v-text-field>
                        <v-text-field label="Масса брутто" v-model="state.goodsCurrentItem.bruttoMass"></v-text-field>
                        <v-text-field label="Масса нетто" v-model="state.goodsCurrentItem.nettoMass"></v-text-field>
                        <v-text-field label="Пометить для удаления" v-model="state.goodsCurrentItem.markToDelete"></v-text-field>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                text="Добавить"
                                @click="addNewGoods(); isActive.value = false"
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
                                    <v-text-field label="Имя" v-model="state.goodsUpdateItem.name"></v-text-field>
                                    <v-text-field label="Масса брутто" v-model="state.goodsUpdateItem.bruttoMass"></v-text-field>
                                    <v-text-field label="Масса нетто" v-model="state.goodsUpdateItem.nettoMass"></v-text-field>
                                    <v-text-field label="Пометить для удаления" v-model="state.goodsUpdateItem.markToDelete"></v-text-field>

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
                            class="mr-1"
                            @click="deleteThis(item)"
                        ></v-btn>
                        <v-btn
                            text="Состав"
                            color="blue"
                            @click="showGoodCompositionDialog(item)"
                        ></v-btn>
                    </div>
                </td>
            </tr>
            </tbody>
        </v-table>
        <v-dialog 
            v-model="state.isGoodsCompositionModalActive"
            max-width="720"
        >
            <template v-slot:default="{ isActive }">
                <v-card title="Новая сущность">
                    <v-text-field label="Продукт" v-model="state.goodsCompositionCurrentItem.goodsName" disabled></v-text-field>
                    <v-text-field label="Протеин" v-model="state.goodsCompositionCurrentItem.protein"></v-text-field>
                    <v-text-field label="fat" v-model="state.goodsCompositionCurrentItem.fat"></v-text-field>
                    <v-text-field label="Carb" v-model="state.goodsCompositionCurrentItem.carb"></v-text-field>
                    <v-text-field label="b1" v-model="state.goodsCompositionCurrentItem.b1"></v-text-field>
                    <v-text-field label="c" v-model="state.goodsCompositionCurrentItem.c"></v-text-field>
                    <v-text-field label="a" v-model="state.goodsCompositionCurrentItem.a"></v-text-field>
                    <v-text-field label="e" v-model="state.goodsCompositionCurrentItem.e"></v-text-field>
                    <v-text-field label="ca" v-model="state.goodsCompositionCurrentItem.ca"></v-text-field>
                    <v-text-field label="p" v-model="state.goodsCompositionCurrentItem.p"></v-text-field>
                    <v-text-field label="mg" v-model="state.goodsCompositionCurrentItem.mg"></v-text-field>
                    <v-text-field label="fe" v-model="state.goodsCompositionCurrentItem.fe"></v-text-field>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            :text="state.createOrUpdateGoodsCompositionBtnText"
                            @click="CreateOrUpdateGoodsComposition(); isActive.value = false"
                        ></v-btn>
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
    goodsCurrentItem: {
        name: "",
        bruttoMass: "",
        nettoMass: "",
        markToDelete: ""
    },
    goodsUpdateItem: {
        id: "",
        name: "",
        bruttoMass: "",
        nettoMass: "",
        markToDelete: ""
    },
    goodsCompositionCurrentItem: {
        goodsId: "",
        goodsName: "",
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
        fe: ""
    },
    isGoodsCompositionModalActive: false,
    createOrUpdateGoodsCompositionBtnText: "Добавить",
    isGoodsCompositionToUpdate: false
})

onMounted(async () => {
    await getAll();
})

async function getAll() {
    let res = await axios.get("http://localhost:5155/Goods/Get");
    state.data = res.data;
}

async function addNewGoods() {
    let data = state.goodsCurrentItem;
    await axios.post("http://localhost:5155/Goods/Create", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    await getAll();
    
}

async function CreateOrUpdateGoodsComposition() {
    let data = state.goodsCompositionCurrentItem;
    if (state.isGoodsCompositionToUpdate) {
        await axios.patch("http://localhost:5155/GoodsComposition/Update", JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    } else {
        await axios.post("http://localhost:5155/GoodsComposition/Create", JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

function setStateForUpdate(item) {
    state.goodsUpdateItem.id = item.id;
    state.goodsUpdateItem.bruttoMass = item.bruttoMass;
    state.goodsUpdateItem.nettoMass = item.nettoMass;
    state.goodsUpdateItem.name = item.name;
    state.goodsUpdateItem.markToDelete = item.markToDelete;
}

async function updateThis() {
    let data = state.goodsUpdateItem;
    console.log(data)
    await axios.patch("http://localhost:5155/Goods/Update", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    await getAll();
}

async function deleteThis(item) {
    await axios.post("http://localhost:5155/Goods/Delete", JSON.stringify(item), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    await getAll();
}

async function showGoodCompositionDialog(goodsItem) {
    let res = await axios.get("http://localhost:5155/GoodsComposition/Get/" + goodsItem.id);

    if (res.data != '') {
        state.goodsCompositionCurrentItem.id = res.data.id;
        state.goodsCompositionCurrentItem.goodsId = res.data.goodsId;
        state.goodsCompositionCurrentItem.goodsName = goodsItem.name;
        state.goodsCompositionCurrentItem.protein = res.data.protein;
        state.goodsCompositionCurrentItem.fat = res.data.fat;
        state.goodsCompositionCurrentItem.carb = res.data.carb;
        state.goodsCompositionCurrentItem.b1 = res.data.b1;
        state.goodsCompositionCurrentItem.c = res.data.c;
        state.goodsCompositionCurrentItem.a = res.data.a;
        state.goodsCompositionCurrentItem.e = res.data.e;
        state.goodsCompositionCurrentItem.ca = res.data.ca;
        state.goodsCompositionCurrentItem.p = res.data.p;
        state.goodsCompositionCurrentItem.mg = res.data.mg;
        state.goodsCompositionCurrentItem.fe = res.data.fe;

        state.createOrUpdateGoodsCompositionBtnText = "Обновить";
        state.isGoodsCompositionToUpdate = true;
    } else {
        state.goodsCompositionCurrentItem.id = "";
        state.goodsCompositionCurrentItem.goodsId = goodsItem.id;
        state.goodsCompositionCurrentItem.goodsName = goodsItem.name;
        state.goodsCompositionCurrentItem.protein = "";
        state.goodsCompositionCurrentItem.fat = "";
        state.goodsCompositionCurrentItem.carb = "";
        state.goodsCompositionCurrentItem.b1 = "";
        state.goodsCompositionCurrentItem.c = "";
        state.goodsCompositionCurrentItem.a = "";
        state.goodsCompositionCurrentItem.e = "";
        state.goodsCompositionCurrentItem.ca = "";
        state.goodsCompositionCurrentItem.p = "";
        state.goodsCompositionCurrentItem.mg = "";
        state.goodsCompositionCurrentItem.fe = "";

        state.createOrUpdateGoodsCompositionBtnText = "Добавить";
        state.isGoodsCompositionToUpdate = false;
    }

    state.isGoodsCompositionModalActive = true;
}
</script>

<style scoped>

</style>