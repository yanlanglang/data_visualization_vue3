<template>

    <div id="m-c-container"></div>

</template>


<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IconArrowRise } from '@arco-design/web-vue/es/icon';
//Echarts
import * as echarts from 'echarts';
//Arco-Design
import { Message } from '@arco-design/web-vue';
//自定义
import { formatPercent, formatBigDecimal, formatPrice } from '@/assets/js/format_util.js';
import { optionMethod } from '@/assets/js/histogram.js';

const start = ref(true);

//获取全局挂载的属性
const axios = inject('$axios');
//使用路由
let router = useRouter();

//声明: 直方图中每个对象展示的属性名(注意顺序)
const histogramFieldArr = ['sn', 'histLowest', 'np', 'histHighest'];
const histogramFieldArrCN = ['名称', '历史最低(前复权)', '现价', '历史最高(前复权)'];

//响应式数据们

//source: [{key0:value1}, {}, ...] ---> length = i
const source = ref([]);


//定时器(用来刷新数据)

//请求数据
const handlePageData = () => {
    //发送请求
    axios.get(
        "optional_stock/index",
    ).then((res) => {
        if (!res.code) {
            //全局数据
            source.value = res.data;
            //渲染柱状图需要的数据集合
            var tempArr = getHistogramData(source.value);
            //开始渲染柱状图
            drawHistogram(tempArr[0], tempArr[1], tempArr[2]);
        } else {
            Message.error(res.msg);
            router.push('/login');
        }

    }).catch((err) => {
        console.log(err);
    })
}

//根据source 获取 [tempDimensions, tempSource, tempSeries]
const getHistogramData = (source) => {
    //存 key
    let tempDimensions = histogramFieldArrCN;
    //存 {key0:value1}
    let tempSource = [];
    //存 {type: 'bar'}
    let tempSeries = [];

    //遍历source中的每个对象
    for (var i = 0; i < source.length; i++) {
        //临时对象
        var tempObj = {}
        //遍历source[i]中的每个属性名
        for (const key in source[i]) {
            //判断当前属性名是否在histogramFieldArr中
            if (histogramFieldArr.includes(key)) {
                var tempKey = '';
                switch (key) {
                    case 'sn':
                        tempKey = '名称';
                        break;
                    case 'np':
                        tempKey = '现价';
                        break;
                    case 'histHighest':
                        tempKey = '历史最高(前复权)';
                        break;
                    //'histLowest'
                    default:
                        tempKey = '历史最低(前复权)';
                }
                tempObj[tempKey] = source[i][key];
            }
        }
        //把临时对象添加进tempSource
        tempSource.push(tempObj);
    }
    //注意：series需要少一个元素
    for (var i = 0; i < (tempDimensions.length - 1); i++) {
        tempSeries.push({ type: 'bar' });
    }


    console.log(tempDimensions);
    console.log(tempSource);
    console.log(tempSeries);

    //返回
    return [
        tempDimensions,
        tempSource,
        tempSeries
    ]
};

//渲染柱状图
const drawHistogram = (dimensions, source, series) => {
    //获取图表Dom元素
    var chartDom = document.getElementById('m-c-container');
    //初始化
    var myChart = echarts.init(chartDom);
    //配置
    var option = optionMethod(dimensions, source, series);
    myChart.setOption(option);
};


onMounted(() => {
    handlePageData();
})




</script>


<style>
#m-c-container {
    /*  水平居中三要素  */
    width: 1400px;
    margin-left: auto;
    margin-right: auto;
    height: 800px;
}
</style>