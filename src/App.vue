<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <nav>
    <Navbar/>
  </nav>
  <body>
    <RouterView/>
  </body>
</template>

<style>
@import "/node_modules\bootstrap\dist\css\bootstrap.min.css";

body {
  background-color : #e6e6e6;
}
</style>
