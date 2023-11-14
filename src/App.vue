<script setup>
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";

const cursor = ref();
const menuOpened = ['menu', 'contact', 'NotFound'];
const tagsOpacityChange = ['A', 'INPUT', 'TEXTAREA', 'BUTTON', 'SPAN', 'svg', 'path'];
const cursorHalfSize = 24;

onMounted(() => {
  // const cursorHalfWidth = cursor.value.offsetWidth / 2; // In case if later I want to make a zoom effect on hovering certain elements
  // const cursorHalfHeight = cursor.value.offsetHeight / 2; // Same

  onmousemove = (e) => {
    cursor.value.style.transform = `translate3d(${Math.round(e.clientX - cursorHalfSize)}px, ${Math.round(e.clientY - cursorHalfSize)}px, 0)`;
    if (tagsOpacityChange.includes(e.target.tagName)) {
      if (e.target.tagName === 'SPAN' && [...e.target.classList].includes('no-cursor-change')) return;
      cursor.value.style.opacity = .3;
    } else {
      cursor.value.style.opacity = '';
    }
  }
});
</script>

<template>
  <div id="wallpaper" :class="{ 'wallpaper-border' : $route.name !== 'home' }"></div>
  <header :class="{ 'd-none d-xl-flex' : $route.name === 'home' }">
    <button id="menu-toggle" class="bg-transparent border-0 p-0 m-auto" aria-label="Menu" :class="{ opened: menuOpened.includes($route.name) }" @click="menuOpened.includes($route.name) ? $router.push({ name : 'home' }) : $router.push({ name : 'menu' })">
      <svg viewBox="0 0 100 100" width="50" height="50">
        <path
          class="line-1"
          d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
        />
        <path class="line-2" d="M 20,50 H 80" />
        <path
          class="line-3"
          d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
        />
      </svg>
    </button>
  </header>
  <div class="h-100 d-flex overflow-y-auto overflow-x-hidden">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <Component :is="Component" :cursor="cursor" />
      </Transition>
    </RouterView>
  </div>
  <div class="d-none d-xl-block" id="cursor" ref="cursor"><span></span></div>
</template>
