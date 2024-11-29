<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div :class="[ !$route.meta.hideLayout ? 'container' : '' ]">
    <div :class="[ !$route.meta.hideLayout ? 'mt-4' : '' ]">
      <RouterView />
    </div>
  </div>
</template>
