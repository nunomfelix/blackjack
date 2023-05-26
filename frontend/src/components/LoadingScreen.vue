<template>
  <transition name="fade">
    <div class="loading-screen">
      <div class="container">    
        <div class="progress progress-moved">
          <div class="progress-bar">
          </div>                       
        </div> 
      </div>
    </div>
  </transition>
</template>

<script>
import { onBeforeUnmount } from 'vue';

export default {
  mounted() {
    const progressBar = document.querySelector('.progress-bar');

    let progress = 0;
    const increment = 1;

    let intervalId; 
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        progress += increment;
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
          clearInterval(intervalId);
          this.$store.dispatch('startNewGame');
        }
      }, 20);
    }, 2000);

   
    onBeforeUnmount(() => {
      clearInterval(intervalId);
    });
  },
};
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
.container {
  margin: 100px auto;
  width: 500px;
  text-align: center;
}

.progress {
  padding: 6px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.25);  
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
}

.progress-bar {
  height: 18px;
  border-radius: 30px;
  background-image: 
    linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  transition: 0.4s linear;  
  transition-property: width, background-color;    
}
.progress-moved .progress-bar {
  width: 85%; 
  background-color: #ffffff;  
  animation: progressAnimation 4.5s;
}

@keyframes progressAnimation {
  0%   { width: 5%; background-color: #ffffff;}
  100% { width: 100%; background-color: #ffffff; }
}
</style>