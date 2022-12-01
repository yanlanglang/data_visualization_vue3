<template>

    <div>
        <!-- 股票基本信息 -->
        <div>
            <p>基本信息</p>
            <a-descriptions size="large" :data="stockBaseInfo" bordered />
        </div>

        <!-- 输入搜索框 -->
        <div>
            <a-input-search @search="toBackendMain" v-model="inputSymbol" placeholder="股票代码" search-button>
                <!-- 图标 -->
                <template #button-icon>
                    <icon-search />
                </template>
                <!-- 文字 -->
                <template #button-default>
                    Search
                </template>
            </a-input-search>
        </div>

        <!-- 大盘指数行情 -->
        <p>历史信息</p>
        <div id="m-i-container"></div>

    </div>

</template>


<script setup>

import { onMounted, inject, ref } from '@vue/runtime-core';
//echarts
import * as echarts from 'echarts';
//Arco Design
import { IconSearch } from '@arco-design/web-vue/es/icon';
import { Message } from '@arco-design/web-vue';

//k_线图
import { optionMethod, dispatchAction, splitDataMethod } from '@/assets/js/k_line'


//颜色
const upColor = '#00da3c';
const downColor = '#ec0000';

//股票代码
const inputSymbol = ref("002555");
//股票基本信息
const stockBaseInfo = ref([]);
//股票历史信息
const stockHistInfo = ref([]);

//axios
const axios = inject('$axios');

//axios请求，获取数据
function handleStockAllInfo(symbol) {

    axios.get("stock_hist/find", {
        params: {
            symbol: symbol,
        }
    }).then((res) => {
        console.log(res);
        if (!res.code) {
            //处理res.data;
            var stockAllInfo = res.data;
            //数据清空
            clearStockAllInfo();
            //分离StockAllInfo
            separateStockAllInfo(stockAllInfo);
            //渲染K线图
            drawKLine(stockHistInfo.value);
        } else {
            Message.error(res.msg);
        }
    })

}

//数据清空
function clearStockAllInfo() {
    stockBaseInfo.value = [];
    stockHistInfo.value = [];
    //inputSymbol.value = "";
}

//分离AllInfo，使之为 BaseInfo & HistInfo 分别完成赋值操作
function separateStockAllInfo(stockAllInfo) {
    var labels = ["总市值", "流通市值", "行业", "上市时间", "股票代码", "股票简称", "总股本", "流通股"];
    var values = [];

    var historyArrObj = [];

    //处理响应数据的格式
    for (const key in stockAllInfo) {
        if (stockAllInfo.hasOwnProperty.call(stockAllInfo, key)) {
            const element = stockAllInfo[key];

            //初步处理历史数据
            if (key === 'stockHists') {
                historyArrObj = stockAllInfo[key];
            }

            //处理时间
            if (key === 'ttm') {
                values.push(handleDateTime(stockAllInfo[key]));
            }

            //BaseInfo[i].values
            if (key !== 'id' && key !== 'stockHists' && key !== 'ttm') {
                values.push(element);
            }

        }
    }

    //BaseInfo[i]
    for (var i = 0; i < labels.length; i++) {
        var temp = {
            label: labels[i],
            value: values[i]
        }
        stockBaseInfo.value.push(temp);
    }

    //HistInfo[i]
    stockHistInfo.value = handleDataType(historyArrObj);
}

//处理数据格式 [{key0:value0, key1:value2, ...}, ...] ---> [[value0, value2, ...], ...]
function handleDataType(historyArrObj) {

    //返回的数据
    var rawData = [];

    for (var i = 0; i < historyArrObj.length; i++) {
        var obj = historyArrObj[i];

        //选择性获取：time、open、close、lowest、highest、volume, time需要额外处理一下
        var tempTime = handleDateTime(obj.date);
        var oneDayData = [
            tempTime,
            obj.open,
            obj.close,
            obj.lowest,
            obj.highest,
            obj.volume
        ];

        //填充数值
        rawData.push(oneDayData);
    }
    return rawData;
}

//处理时间 dateTime:yyyy-MM-ddxxxxx  ---> yyyy-MM-dd
function handleDateTime(dateTime) {
    var dateee = new Date(dateTime).toJSON();
    var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');

    //[start，end)
    return date.substring(0, 10);;
}

//检查参数格式是否正确
function checkSymbol(symbol) {
    //长度为6
    var len = (symbol.length == 6);
    //数值类型
    var isNum = !(parseFloat(symbol).toString() == "NaN");

    //长度为6 && 数值类型 && 正数 && 整数
    if (len && isNum && (symbol > 0) && !(symbol.toString().includes('.'))) {
        //验证成功
        return true;
    } else {
        //验证失败
        return false;
    }
}

//发送请求的入口函数
function toBackendMain() {
    var val = inputSymbol.value;
    var isLawful = checkSymbol(val);
    if (isLawful) {
        //开始提交请求
        handleStockAllInfo(val);
    } else {
        //报错
        Message.error('输入类型错误，请重新输入！');
        inputSymbol.value = "";
    }
}

// 渲染K线图
function drawKLine(rawData) {
    //splitDataMethod、optionMethod、dispatchAction
    var myChart = echarts.init(document.getElementById("m-i-container"));
    var option;
    var data = splitDataMethod(rawData);

    myChart.setOption((option = optionMethod(data, upColor, downColor)), true);
    myChart.dispatchAction(dispatchAction);
}

onMounted(() => {
    toBackendMain()
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