<template>
  <transition name="fade">
    <div class="loading-screen">
    </div>
  </transition>
</template>

<script>
export default {
  components: {

  },
  mounted () {
    setTimeout(() => { this.$store.dispatch('startNewGame')}, 2000)
  }
}
</script>

<style lang="scss" scoped>

.loading-screen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  font-weight: 100;
  transition: all 0.2s;
  z-index: 999;
  background-color: green;
  color: red;  
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>