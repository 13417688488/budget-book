<script setup>
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/record'
const { thisMonthAmountList } = storeToRefs(useRecordStore())
const format = () => ''
</script>

<template>
  <div class="container">
    <h3>分类占比</h3>
    <div v-for="i in thisMonthAmountList" class="layout">
      <div class="text">{{ i.type }}：花费{{ i.total }}元</div>
      <el-progress :percentage="i.percentage" :stroke-width="30" :format="format"> </el-progress>
    </div>
  </div>
</template>

<style scoped>
h3 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  display: flex;
  margin: 1rem;
  padding: 2rem;
  flex-direction: column;
}
.layout {
  .text {
    display: inline-block;
    margin: 0.5rem;
  }
  .el-progress {
    flex-grow: 0.8;
    .el-progress__text {
      flex-grow: 0;
      width: 2rem;
    }
  }

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
}
span {
  width: 5vw;
}
</style>
