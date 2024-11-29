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

<style lang="scss">
.el-input {
  width: 100%;
  margin-bottom: 16px;

  &.is-disabled {
    .el-input__wrapper {
      background-color: $input-disabled-color;
      border: 1px solid $input-border-color;
    }
  }

  .el-input__wrapper {
    border: 1px solid $input-border-color;
    border-radius: 50px;

    &.is-focus {
      box-shadow: 0 0 0 1px $input-border-color inset;
    }
  }
}
</style>
