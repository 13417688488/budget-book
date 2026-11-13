<script setup>
import { ref } from 'vue'
import { useRecordStore } from '@/stores/record'
const { init } = useRecordStore()
init()
</script>

<template>
  <header>
    <div class="container">
      <RouterLink to="/record">记一笔</RouterLink>
      <RouterLink to="/monthly">看月结</RouterLink>
      <RouterLink to="/budget">控预算</RouterLink>
      <RouterLink to="/search">分类</RouterLink>
    </div>
  </header>

  <main>
    <Transition name="fade" mode="out-in">
      <RouterView></RouterView>
    </Transition>
  </main>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  gap: 1rem;
  a {
    color: rgb(14, 166, 231);
    text-decoration: none;
    font-size: 1.4rem;
    padding: 0.1rem;
    margin: 0.1rem;
  }
  .router-link-active,
  .router-link-exact-active {
    border-bottom: 2px rgb(14, 166, 231) solid;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
