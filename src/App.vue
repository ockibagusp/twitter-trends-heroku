<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Twitter Trends</RouterLink> |
    <RouterLink to="/getdaytrends">(beta) GetDayTrends.com</RouterLink>
  </nav>
  
  <main>
    <h2>Trending Topic Twitter di Indonesia (Indonesia atau Inggris)</h2>

    <h3>>> Copy dan Paste!</h3>
    <h3>Browser aja.</h3>

    <RouterView />
  </main>
</template>
