<template>
    <a-form :model="formData" :style="{ width: '600px' }">

        <a-form-item field="username" label="username">
            <a-input v-model="formData.username" placeholder="please enter your username..." />
        </a-form-item>

        <a-form-item field="password" label="password">
            <a-input v-model="formData.password" placeholder="please enter your password..." />
        </a-form-item>

        <a-form-item>
            <a-button type="primary" class="login-btn" @click="handleForm">Submit</a-button>
        </a-form-item>
    </a-form>

</template>


<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';

//Arco-Design
import { Message } from '@arco-design/web-vue';

const axios = inject('$axios');
const formData = ref({
    username: 'username',
    password: '123456',
})

let router = useRouter();

const handleForm = () => {
    axios.get("consumer/login", {
        params: {
            username: formData.value.username,
            password: formData.value.password,
        }
    }).then((res) => {
        console.log(res);
        if (res.code) {
            Message.error(res.msg);
        } else {
            Message.success('登录成功！');
            router.push('/my_choice');
        }
    }).catch((err) => {
        console.log(err);
    })
}


</script>


<style>

</style>