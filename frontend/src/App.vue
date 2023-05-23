<template>
  <div class="game">
    <Table />
    <LoadingScreen v-if="$store.state.isLoading"/>
  </div>
</template>

<script>
import Table from '@/components/Game/Table.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';

export default {
  components: {
    Table,
    LoadingScreen
  },
}

</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.game {
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: column nowrap; /* Make elements stack vertically */
}

body {
  font-family: 'Helvetica', 'Arial', sans-serif;
}
</style>
