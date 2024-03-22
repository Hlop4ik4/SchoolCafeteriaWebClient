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
                            v-model="state.orderCurrentItem.dishOrder"
                            chips
                            multiple
                            :items="state.dishes"
                            @update:modelValue="selectDishesChange"
                        ></v-select>
                        <v-text-field label="Цена" v-model="state.orderCurrentItem.price" disabled></v-text-field>
                        <v-text-field label="К оплате" v-model="state.orderCurrentItem.sumToPay" disabled></v-text-field>

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
                    Сумма
                </th>
                <th class="text-left">
                    К оплате
                </th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, idx) in state.data" :key="idx">
                <td>{{item.price}}</td>
                <td>{{item.sumToPay}}</td>
                <td>
                    <div class="d-flex flex-row" style="justify-content: right">
                        <v-btn
                            color="green"
                            class="mr-1"
                            text="Оплатить"
                            @click="setStateForDelete(item)"
                        ></v-btn>
                    </div>
                </td>
            </tr>
            </tbody>
        </v-table>
        <v-dialog 
            v-model="state.isOrderModalActive"
            max-width="720"
        >
            <template v-slot:default="{ isActive }">
                <v-card title="Заказ">
                    <v-list
                        item-title="name"
                        :items="state.dishOrderDeleteItem"
                    ></v-list>
                    <v-text-field label="Цена" v-model="state.orderDeleteItem.price" disabled></v-text-field>
                    <v-text-field label="К оплате" v-model="state.orderDeleteItem.sumToPay" disabled></v-text-field>
                    <v-text-field v-if="state.isChangeVisible" label="Сдача" v-model="state.orderDeleteItem.change" disabled></v-text-field>
                    <v-text-field label="Оплатить" v-model="state.orderDeleteItem.payment"></v-text-field>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <template
                            v-if="!state.isOrderPayed"
                        >
                            <v-btn
                                text="Отмена"
                                @click="isActive.value = false"
                            ></v-btn>
                            <v-btn
                                text="Ок"
                                @click="payOrder()"
                            ></v-btn>
                        </template>
                        <template
                            v-else
                        >
                            <v-btn
                                text="Закрыть"
                                @click="deleteThis(); isActive.value = false"
                            ></v-btn>
                        </template>
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
    orderCurrentItem: {
        price: "",
        sumToPay: "",
        dishOrder: [],
    },
    orderDeleteItem: {
        id: "",
        price: "",
        sumToPay: "",
        payment: "",
        dishOrder: [],
    },
    dishOrderDeleteItem: [{
        name: "",
        price: ""
    }],
    dishes: [],
    isOrderModalActive: false,
    isOrderPayed: false,
    isChangeVisible: false
})

onMounted(async () => {
    await getAllOrders();
    await getAllDishes();
})

async function getAllOrders() {
    let res = await axios.get("http://localhost:5155/Orders/Get");
    state.data = res.data;
}

async function getAllDishes() {
    let res = await axios.get("http://localhost:5155/Dishes/Get");
    state.dishes = res.data;
}

async function addNew() {
    let data = state.orderCurrentItem;
    await axios.post("http://localhost:5155/Orders/Create", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    await getAllOrders();

    state.orderCurrentItem = {
        price: "",
        sumToPay: "",
        dishOrder: [],
    }
}

async function setStateForDelete(item) {
    state.orderDeleteItem.id = item.id;
    state.orderDeleteItem.price = item.price;
    state.orderDeleteItem.sumToPay = item.sumToPay;
    state.orderDeleteItem.dishOrder = item.dishOrder;
    state.orderDeleteItem.payment = "";
    state.orderDeleteItem.change = "";

    let res = await axios.get("http://localhost:5155/Dishes/GetByOrder/" + item.id)

    state.dishOrderDeleteItem = res.data;

    state.isOrderModalActive = true;
    state.isOrderPayed = false;
    state.isChangeVisible = false;
}

async function deleteThis() {
    let data = state.orderDeleteItem;
    await axios.post("http://localhost:5155/Orders/Delete", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    await getAllOrders();
}

async function selectDishesChange(a) {
    if (a.length > 0) {
        let res = await axios.get("http://localhost:5155/Dishes/Get/" + a);

        let pricesSum = 0;
        res.data.forEach((elem, index) => {
            let resPrice = elem.price.replace(',', '.');
            pricesSum += Number(resPrice);
        })

        state.orderCurrentItem.price = pricesSum + '';
        state.orderCurrentItem.sumToPay = state.orderCurrentItem.price + '';
    } else {
        state.orderCurrentItem.price = "0";
        state.orderCurrentItem.sumToPay = "0";
    }
}

async function payOrder() {
    let sumToPay = state.orderDeleteItem.sumToPay.replace(',', '.');
    let payment = state.orderDeleteItem.payment.replace(',', '.');

    let currentOrderSumToPayNumber = Number(sumToPay)
    let paymentSumToPayDiff = currentOrderSumToPayNumber - Number(payment);

    if (paymentSumToPayDiff <= 0) {
        state.orderDeleteItem.sumToPay = "0";
        state.orderDeleteItem.change = Math.abs(paymentSumToPayDiff);
        state.isOrderPayed = true;
        state.isChangeVisible = true;
    } else {
        state.orderDeleteItem.sumToPay = paymentSumToPayDiff + '';
        state.isOrderModalActive = false;
    }

    let data = state.orderDeleteItem;
    await axios.patch("http://localhost:5155/Orders/Update", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    });

    await getAllOrders();

    state.orderDeleteItem.payment = "";
}
</script>