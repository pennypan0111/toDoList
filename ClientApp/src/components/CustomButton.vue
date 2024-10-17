<script setup>
const props = defineProps({
  buttonText: {
    type: String,
    required: true,
    default: '按鈕名稱'
  }
})
</script>

<template>
  <el-button>{{ props.buttonText }}</el-button>
</template>
