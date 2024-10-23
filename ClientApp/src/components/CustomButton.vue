<script setup>
defineProps({
  iconClass: {
    type: String,
    required: false
  },
  iconColor: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="iconBtn" :class="iconColor">
    <font-awesome-icon :icon="iconClass"/>
  </div>
</template>

<style lang="scss">
.iconBtn {
  width: 30px;
  height: 30px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  color: #ffffff;
  border-radius: 50px;
  cursor: pointer;
}
</style>
