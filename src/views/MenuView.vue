<script setup>
import {onMounted, ref} from "vue";

const props = defineProps(['cursor']);
const menu = ref();

onMounted(() => {
  props.cursor.classList.remove('top');
  props.cursor.classList.remove('bot');

  [...menu.value.children].forEach((element, i) => {
    element.style.transitionDelay = `${(1 + i) / 8}s`
  })
});
</script>

<template>
  <div class="my-auto ms-auto me-4 pe-3">
    <ul class="list-unstyled mb-0" ref="menu">
      <Transition name="rightToLeft" appear>
        <li><RouterLink :to="{ name: 'home', state: { go_to: 1 } }">Accueil</RouterLink></li>
      </Transition>
      <Transition name="rightToLeft" appear>
        <li><RouterLink :to="{ name: 'home', state: { go_to: 2 } }">Services</RouterLink></li>
      </Transition>
      <Transition name="rightToLeft" appear>
        <li><RouterLink :to="{ name: 'contact' }">Contact</RouterLink></li>
      </Transition>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_custom.scss";

ul {
  width: 100%;
  text-align: right;
  padding-right: 3%;

  li {
    margin: 5vh 0;
  }
  a {
    font-weight: 500;
    font-size: 64px;
    letter-spacing: 8px;
    transition: color .4s;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
    color: $light;
  }
}
</style>
