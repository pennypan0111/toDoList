<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { ElInput } from 'element-plus' // 為了在 stories.js 中可以使用才在此引入
import 'bootstrap/dist/css/bootstrap.min.css' // 為了在 stories.js 中可以使用才在此引入
import 'element-plus/dist/index.css' // 為了在 stories.js 中可以使用才在此引入

const props = defineProps({
  label: {
    type: String,
    default: '標題'
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '請輸入欄位'
  },
  type: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: function() {
    return props.modelValue
  },
  set: function(value) {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <div class="w-100">
    <label>{{ label }}</label>
    <el-input v-model="inputValue" :placeholder="placeholder" :type="type" :disabled="disabled"/>
  </div>
</template>
