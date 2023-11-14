<script setup>
import TestComponent from "@/components/TestComponent.vue";
import {ref, reactive, computed, watch} from "vue";

const test = "AAAAA";
const textReactive = ref("text reactive input");

const textVar = "BBBBB";
const name = ref("Nescio");
const age = ref(17);
console.log(name.value, age.value); // (reactive var need .value to show the var content)

// const userObjectRef = ref({
//   username: "nomen",
//   password: "gfd126hgf12fgdh"
// });
// console.log(userObjectRef.value.username, userObjectRef.value.password);

const userObjectReactive = reactive({ // using reactive instead of ref is better for objects
  username: "nomen",
  password: "gfd126hgf12fgdh"
});
console.log(userObjectReactive.username, userObjectReactive.password);

function consoleLogUserObject() {
  console.log(userObjectReactive)
}

const stringReactive = computed(() => {
  return `your username is ${userObjectReactive.username} and password is ${userObjectReactive.password}, you name is ${name.value} and you are ${age.value}yo`;
});

watch(name, (newVal, oldVal) => { // when a var change we can perform some action (without using v-on:input/@input)
  console.log(`the new value is ${newVal} and the old value was ${oldVal}`)
})

function displayEmit(value) {
  console.log('Get emit from parent view : ' + value)
}
</script>

<template>
  <div class="p-5">
    <h1>view</h1>
    <p>texte afficher depuis une simple variable : {{ test }}</p>

    <input type="text" v-model="textReactive">
    {{ textReactive }}

    <hr>

    <p>reactive inputs envoyer au composant</p>
    <input type="text" v-model="name">
    <input type="number" v-model.number="age"> <!-- .number so vue.js transform the value in number -->
    <br>
    <input type="text" v-model.lazy="userObjectReactive.username" v-on:input="consoleLogUserObject"> <!-- .lazy to apply the reactivity on change and not in input -->
    <input type="text" v-model.lazy="userObjectReactive.password" @change="consoleLogUserObject"> <!-- @ is the shorthand for v-on (event listener) -->

    <hr>

    <TestComponent
        title="composant"
        :text-var="textVar"
        :name="name"
        :age="age"
        :user-object="userObjectReactive"
        @update-test-emit="emit => displayEmit(emit)"
    >
      <template v-slot:header>
        header multislot
      </template>
<!--      <div>slot without defined name</div>-->
      <template v-slot:footer>
        footer multislot
      </template>
    </TestComponent>

    <hr>

    <p>{{ stringReactive }}</p>
  </div>
</template>
