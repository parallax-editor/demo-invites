<template>
  <NuxtPage />
</template>

<style>
/* Reset global: el engine no resetea html/body; sin esto el margin del
   user-agent deja un marco blanco alrededor del sitio full-bleed. */
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  background: #0b0b12;
}
</style>
