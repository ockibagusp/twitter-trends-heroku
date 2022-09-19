<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Twitter Trends</RouterLink> |
    <RouterLink to="/getdaytrends">(beta) GetDayTrends.com</RouterLink>
  </nav>
  
  <main>
    <h2 style="margin-top: 5px;">Trending Topic Twitter di Indonesia (Indonesia atau Inggris)</h2>

    <h3 style="margin-top: -15px; margin-bottom: 10px;">>> Copy dan Paste!</h3>
    <h3 style="margin-top: -10px; margin-bottom: 10px;">Browser aja.</h3>

    <RouterView />
  </main>
</template>
