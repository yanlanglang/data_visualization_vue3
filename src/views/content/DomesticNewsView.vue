<template>

    <div v-if="pageData != null">
        <!-- 遍历内容 -->
        <a-list>
            <a-list-item v-for="news in pageData.content" :key="news.id">
                <a-tag color="green">

                    {{ news.pubDate }} {{ news.pubTime }}
                </a-tag>

                <p class="demo-list">{{ news.content }}</p>
            </a-list-item>
        </a-list>


        <!-- 分页 -->
        <div class="demo-pagination-block" style="text-align:center">
            <el-pagination v-model:current-page="number" v-model:page-size="size" :page-sizes="[20, 30, 50, 100, 200]"
                :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="totalElements" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>

    </div>

</template>


<script setup>
import { onMounted, ref, inject } from 'vue'


//获取全局挂载的属性
const axios = inject('$axios');

//响应式数据
const pageData = ref({});

//总元素个数
const totalElements = ref(200);
//每页元素个数
const size = ref(20);
//当前页码和输入框中的值
const number = ref(1);

const small = ref(false)
const background = ref(true)
const disabled = ref(false)

//处理 每页展示的数据发生改变
const handleSizeChange = (val) => {
    pageData.value.size = val;
    handlePageData(number.value, pageData.value.size);
}
//处理 页面发生改变
const handleCurrentChange = (val) => {
    pageData.value.number = val;
    handlePageData(pageData.value.number, size.value);
}


//异步请求操作
const handlePageData = () => {
    //发送请求
    axios.get(
        "news/find", {
        params: {
            size: pageData.value.size,
            page: pageData.value.number - 1,
        }
    }
    ).then((res) => {
        pageData.value = res.data;

        totalElements.value = pageData.value.totalElements;
        size.value = pageData.value.size;
        number.value = pageData.value.number + 1;

    }).catch((err) => {
        console.log(err);
    });
}


onMounted(() => {
    handlePageData(number.value, size.value);
})



</script>


<style>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}

.demo-list {
    font-size: 18px;
}
</style>