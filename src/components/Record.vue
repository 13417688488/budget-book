<script setup>
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/record'
const { record, amount, type, date, category, note } = storeToRefs(useRecordStore())
const { addRecord, remove } = useRecordStore()

//默认输入
type.value = 'expense'
category.value = '餐饮'
const now = new Date()
date.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
</script>

<template>
  <div class="container">
    <div class="display">
      <ul>
        <li>
          <div>收支</div>
          <div>金额</div>
          <div>分类</div>
          <div>备注</div>
          <div>日期</div>
          <div>删除</div>
        </li>
        <li v-for="r in record">
          <div v-if="r.type === 'expense'">支出</div>
          <div v-if="r.type === 'income'">收入</div>
          <div>
            <div v-if="r.type === 'expense'">-</div>
            <div v-if="r.type === 'income'">+</div>
            {{ r.amount.toFixed(2) }}￥
          </div>
          <div>{{ r.category }}</div>
          <div>{{ r.note }}</div>
          <div>{{ r.date }}</div>
          <div><button @click="remove(r)">X</button></div>
        </li>
      </ul>
    </div>

    <div class="enterplace">
      <div>金额：<input type="number" v-model="amount" required placeholder="必填(金额)" /></div>
      <div>
        类型：<select v-model="type">
          <option value="expense">支出</option>
          <option value="income">收入</option>
        </select>
      </div>
      <div>日期：<input type="date" v-model="date" /></div>
      <div>备注：<input type="text" placeholder="非必填（备注）" v-model="note" /></div>
      <div>
        分类：<select v-model="category" v-if="type === 'expense'">
          <option value="餐饮">餐饮</option>
          <option value="交通">交通</option>
          <option value="购物">购物</option>
          <option value="居住">居住</option>
          <option value="娱乐">娱乐</option>
          <option value="医疗">医疗</option>
          <option value="其他">其他</option>
        </select>
        <select v-model="category" v-if="type !== 'expense'">
          <option value="工资">工资</option>
          <option value="兼职">兼职</option>
          <option value="理财">理财</option>
          <option value="其他">其他</option>
        </select>
      </div>
      <div><button @click="addRecord">保存</button></div>
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
.enterplace {
  box-sizing: border-box;
  width: 100vw;
  padding: 0.3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 0.3rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: hsla(0, 0%, 100%, 0.553);
  div {
    input {
      width: 50%;
    }
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.display {
  display: flex;
  padding: 1rem;
  background-image: radial-gradient(#eaf4f8, #ddeaef);
  min-height: 80vh;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  ul li {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    padding: 0.5rem 0;
  }
  ul li div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
