<template>
  <button class="btn" type="submit">{{ button.text }}</button>
</template>

<script>
export default {
  props: ['button'],
}
</script>

<style lang="scss" scoped>
.btn {
  width: inherit;
  height: 44px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  color: white;
  background: #d6073d;
  border-radius: 10px;
}

.btn:hover {
  background: #be0536;
  box-shadow: -6px -6px 16px rgba(255, 255, 255, 0.5),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
