<script setup>
import {ref} from "vue";

const props = defineProps(['title', 'textVar', 'name', 'age', 'userObject']);

const testEmit = ref('emit pour test');
const emit = defineEmits(['updateTestEmit']); // to send variables from components to the parent view
const handleUpdate = (event) => {
  emit('updateTestEmit', event.target.value)
}
</script>

<template>
  <h1>{{ title }}</h1>
  <p>texte passer au composant par une simple variable : {{ props.textVar }}</p>
  <p>variables reactive passer au composant :</p>
  <p>
    Name is {{ props.name }}<br>
    Age is {{ props.age }}<br>
    Username is {{ props.userObject.username }}<br>
    Password is {{ props.userObject.password }}
  </p>
  <div class="text-bg-dark" :class="props.age < 18 ? 'text-danger' : 'text-success'">
    <p v-if="props.age < 18">
      You are under 18yo
    </p>
    <p v-else>
      You have the required age
    </p>
  </div>

  <slot name="header">Header fallback content</slot>
  <slot>Fallback content slot without name</slot>
  <slot name="footer">Footer fallback content</slot>

  <div class="mt-3">
    <input type="text" v-model="testEmit" @input="handleUpdate">
    <p>{{ testEmit }}</p>
  </div>
</template>
