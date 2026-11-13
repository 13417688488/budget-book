<script setup>
import { ref } from 'vue'
import { useRecordStore } from '@/stores/record'
import { storeToRefs } from 'pinia'
const { options, selected, thisMonthExpense, thisMonthIncome, thisMonth } =
  storeToRefs(useRecordStore())
</script>

<template>
  <div class="container">
    <div class="choose">
      <div>
        月份选择：
        <select v-model="selected">
          <option v-if="options[0] === undefined" value="nothing">没用流水可以选择</option>
          <option v-for="r in options" :value="r.option">
            {{ r.option }}
          </option>
        </select>
      </div>
    </div>
    <div class="display">
      <div class="block">
        本月支出：
        <div>{{ thisMonthExpense.toFixed(2) }}￥</div>
      </div>
      <div class="block">
        本月收入：
        <div>{{ thisMonthIncome.toFixed(2) }}￥</div>
      </div>
      <div class="block">
        本月结余：
        <div>{{ thisMonth.toFixed(2) }}￥</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  margin: 1rem;
  padding: 2rem;
  flex-direction: column;
}
.choose {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2rem;
  font-size: 1.25rem;
  div {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    select {
      font-size: 1rem;

      height: 100%;
    }
  }
}
.display {
  display: flex;
  justify-content: space-evenly;
  .block {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 1rem;
    padding: 2rem;
    width: 10rem;
    height: 10rem;
    background-color: rgb(223, 227, 225);
    box-shadow: 10px 10px 20px rgba(84, 84, 84, 0.3);
    border-radius: 10px;
    border: 1px solid #747474;
    font-size: 2rem;
    div {
      text-align: right;
      font-size: 1.5rem;
    }
  }
}
</style>
