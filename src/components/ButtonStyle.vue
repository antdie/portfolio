<script setup>
const props = defineProps(['label'])
</script>

<template>
  <button>
    <span>{{ props.label }}</span>
  </button>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_custom.scss";

button {
  position: relative;
  width: 100%;
  padding: 1rem 0;
  border: 0;
  font-weight: 600;
  color: $dark;
  background-color: $white;
  letter-spacing: 1px;
  font-size: 20px;
  transition: color .4s;

  span {
    position: relative;
  }
  &:hover {
    color: $white;
  }
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $dark;
    transition: transform .4s;
    transform: scaleX(0);
    transform-origin: left;
  }
  &:hover::before {
    transform: scaleX(1);
  }
  &.bg-light::before {
    transform-origin: right;
  }
  &.mini {
    width: auto;
    padding: .375rem .75rem;
  }
}
</style>
