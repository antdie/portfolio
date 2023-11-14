<script setup>
import {onMounted} from "vue";

const props = defineProps(['cursor']);

onMounted(() => {
  props.cursor.classList.remove('top');
  props.cursor.classList.remove('bot');
});
</script>

<template>
  <div class="m-auto">
    <div class="alert alert-danger text-center" role="alert">
      <strong>Erreur 404</strong>
      <br><RouterLink :to="{ name: 'home' }" class="text-dark">Retour</RouterLink>
    </div>
  </div>
</template>
