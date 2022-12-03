<template>

    <div id="m-i-container"></div>

</template>


<script setup>

import { onMounted, inject, ref } from '@vue/runtime-core';


onMounted(() => {

})


</script>


<style>
#m-i-container {
    /*  水平居中三要素  */
    width: 1400px;
    margin-left: auto;
    margin-right: auto;
    height: 800px;
}

p {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 24px;
    text-align: center;
}
</style>