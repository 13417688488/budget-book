<script setup>
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/record'
const { budget, text, editing, progressPercentage, percentage, status } =
  storeToRefs(useRecordStore())
const { startEdit, cancelEdit, finishEdit } = useRecordStore()
</script>

<template>
  <div class="container">
    <h3>预算控制</h3>
    <div class="budget">
      本月预算：
      <span @click="startEdit()" v-if="!editing">{{ budget.toFixed(2) }}￥</span>
      <input
        type="number"
        v-if="editing"
        v-model="text"
        @keydown.enter="finishEdit()"
        @keydown.esc="cancelEdit()"
        @blur="cancelEdit()"
        :ref="(el) => el && el.focus()"
      />
    </div>
    <div>
      进度：{{ progressPercentage }}
      <span class="progressLine"
        ><el-progress :percentage="percentage" :status="status" :stroke-width="24"></el-progress
      ></span>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
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
  .budget {
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.25rem;
    input {
      padding: 0.5rem;
      margin: 0;
      width: 12.1%;
      height: 100%;
      transform: scale(1.15);
    }

    span {
      cursor: pointer;
      padding: 0.5rem;
    }
  }
}
.progressLine {
  background-color: rgb(52, 214, 255);
}
</style>
