<template>
    <a-layout class="layout-demo">
        <!-- 侧边栏结束 -->
        <a-layout-sider hide-trigger collapsible :collapsed="collapsed">
            <!-- logo -->
            <div class="logo" />
            <!-- 菜单栏 -->
            <a-menu :defaultOpenKeys="['1']" :defaultSelectedKeys="['1_1']" :style="{ width: '100%' }"
                @menuItemClick="onClickMenuItem">

                <!-- 1 新闻快讯 -->
                <a-sub-menu key="1">
                    <template #title>
                        <span>
                            <IconCalendar />新闻快讯
                        </span>
                    </template>
                    <!-- 国内快讯 -->
                    <router-link to="/domestic_news">
                        <a-menu-item key="1_1">国内快讯</a-menu-item>
                    </router-link>
                    <!-- 国外快讯 -->
                    <router-link to="/international_news">
                        <a-menu-item key="1_2">
                            国外快讯
                        </a-menu-item>
                    </router-link>
                </a-sub-menu>
                <!-- 2 多维数据分析 -->
                <a-sub-menu key="2">
                    <template #title>
                        <span>
                            <IconCalendar />数据可视化
                        </span>
                    </template>
                    <!-- 大盘行情 -->
                    <router-link to="/market_index">
                        <a-menu-item key="2_1">
                            大盘行情
                        </a-menu-item>
                    </router-link>
                    <!-- 我的自选 -->
                    <router-link to="/my_choice">
                        <a-menu-item key="2_2">
                            我的自选
                        </a-menu-item>
                    </router-link>
                    <!-- 模拟收益 -->
                    <router-link to="/others">
                        <a-menu-item key="2_3">
                            模拟收益
                        </a-menu-item>
                    </router-link>
                    <!-- 实时监控 -->
                    <router-link to="/others">
                        <a-menu-item key="2_4">
                            实时监控
                        </a-menu-item>
                    </router-link>
                </a-sub-menu>

                <!-- 3 -->
                <a-sub-menu key="3">
                    <template #title>
                        <span>
                            <IconCalendar />认知升级
                        </span>
                    </template>
                    <!-- Markdonw -->
                    <router-link to="/others">
                        <a-menu-item key="3_1">
                            Markdonw
                        </a-menu-item>
                    </router-link>
                    <!-- 其它 -->
                    <router-link to="/others">
                        <a-menu-item key="3_2">
                            Others
                        </a-menu-item>
                    </router-link>

                </a-sub-menu>

            </a-menu>
        </a-layout-sider>
        <!-- 侧边栏结束 -->

        <!-- 内容栏结束 -->
        <a-layout>
            <!-- 展开/收缩按钮开始 -->
            <a-layout-header class="top-buttons" style="padding-left: 20px;">
                <a-button shape="circle" @click="onCollapse()">
                    <IconCaretRight v-if="collapsed" />
                    <IconCaretLeft v-else />
                </a-button>

                <a-button shape="circle" @click="triggerTheme()">
                    <icon-sun-fill />
                </a-button>
            </a-layout-header>
            <!-- 展开/收缩按钮结束 -->

            <!-- 主要页面开始 -->
            <a-layout class="main-content" style="padding: 0 24px;">
                <!-- 面包屑 -->
                <a-breadcrumb :style="{ margin: '16px 0' }">
                    <a-breadcrumb-item>Home</a-breadcrumb-item>
                    <a-breadcrumb-item>List</a-breadcrumb-item>
                    <a-breadcrumb-item>App</a-breadcrumb-item>
                </a-breadcrumb>
                <!-- 内容 -->
                <a-layout-content :style="{ position: 'relative' }">
                    <!-- 二级路由出口 -->
                    <router-view> </router-view>

                </a-layout-content>
                <!-- 脚部 -->
                <a-layout-footer>Footer</a-layout-footer>
            </a-layout>
            <!-- 主要页面结束 -->
        </a-layout>
        <!-- 内容栏结束 -->
    </a-layout>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
    IconSunFill,
} from '@arco-design/web-vue/es/icon';

import MarketIndexView from './content/MarketIndexView.vue';
import DomesticNewsView from './content/DomesticNewsView.vue';
import InternationalNewsView from './content/InternationalNewsView.vue';
import OthersView from './content/OthersView.vue';

export default defineComponent({
    components: {
        IconCaretRight,
        IconCaretLeft,
        IconHome,
        IconCalendar,
        IconSunFill,
        //
        DomesticNewsView,
        InternationalNewsView,
        MarketIndexView,
        OthersView
    },
    setup() {
        let themeTemp = false;
        const collapsed = ref(false);
        const onCollapse = () => {
            collapsed.value = !collapsed.value;
        };
        //切换主题颜色
        const triggerTheme = () => {
            if (themeTemp) {
                // 设置为暗黑主题
                document.body.setAttribute('arco-theme', 'dark')
            } else {
                // 恢复亮色主题
                document.body.removeAttribute('arco-theme');
            }
            themeTemp = !themeTemp;
        };


        return {
            collapsed,
            onCollapse,
            //
            themeTemp,
            triggerTheme,
            //菜单点击事件
            onClickMenuItem(key) {
                //通过${key}来选择性的show

                Message.info({ content: `You select ${key}`, showIcon: true });
            },


        };
    },
});
</script>
<style scoped>
.layout-demo {
    height: 100vh;
    background: var(--color-fill-2);
    border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
    height: 32px;
    margin: 12px 8px;
    background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
    background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-header) {
    height: 64px;
    line-height: 64px;
    background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
    height: 48px;
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
    /* color: var(--color-text-2); */
    font-weight: 400;
    font-size: 14px;
    /*background: var(--color-bg-3);*/
    background: var(--color-neutral-2);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-neutral-10);
    font-size: 16px;
    font-stretch: condensed;
    /* text-align: center; */
}

.top-buttons {
    display: flex;
    justify-content: space-between;
    padding: 15px;
}

.main-content {
    background: var(--color-neutral-3);
}
</style>
  