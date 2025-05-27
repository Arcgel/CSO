<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Calendar from '../components/Calendar.vue'

const isShrunk = ref(false)

function toggleWidth() {
  isShrunk.value = !isShrunk.value
}
</script>

<template>
  <div class="custom-background">
    <div class="container-fluid">
    <div class="row">
      <div
        :class="[
          'side-bar',
          'text-white',
          'vh-120',
          'p-3',
          'transition-width',
          isShrunk ? 'col-md-1' : 'col-md-2',
        ]"
      >
        <div class="row gap-80 align-items-center justify-content-center">
          <div class="row px-0 justify-content-between align-items-center">
            <div class="col-6" v-if="!isShrunk">
              <h6 class="fw-bold">CALENDAR <span class="custom-color">SYSTEM</span> </h6>
            </div>
            <div :class="isShrunk ? ['col-0', 'text-center'] : ['col-4', 'text-end']">
              <a class="btn text-white" @click="toggleWidth">
                <i class="fa-solid fa-bars"></i>
              </a>
            </div>
          </div>

          <div>
            <div class="container" v-if="!isShrunk">
              <h6>List of joined</h6>
            </div>
            <div class="d-flex justify-content-center">
              <div class="col-2 d-flex align-items-center justify-content-center" v-if="isShrunk">
                <div class="d-flex flex-column text-center">
                  <span class="fw-bold"> C A L E N D A R </span>
                  <span class="pt-5 fw-bold custom-color" v-if="isShrunk"> S Y S T E M </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center position-relative" :class="isShrunk ? ['top-20'] : ['top-75']">
          <router-link to="/" class="btn text-center text-white">
            <i class="fa-solid fa-right-from-bracket"></i> <span v-if="!isShrunk">Log out</span>
          </router-link>
        </div>
      </div>

      <div :class="isShrunk ? 'col-md-10' : 'col-md-10'">
        <div class="container-fluid">
          <div class="notification">
            <a role="button" tabindex="0">
              <i class="fa-solid fa-bell"></i>
            </a>
          </div>
          <div
            class="text-center custom-height h-100 w-100 align-content-center my-5 pt-3"
            :class="isShrunk ? ['ps-100'] : ['']"
          >
            <Calendar />
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.top-20 {
  top: 20%;
}
.top-75 {
  top: 75%;
}
.gap-80 {
  gap: 80px;
}
.ps-100 {
  padding-left: 100px;
}
.side-bar {
  background-color: #2a2a2a;
  transition: width 0.3s ease;
}

.vc-day {
  height: 93px !important;
  width: 123px !important;
  border: 2px solid black !important;
  border-radius: 12px !important;
}

.notification {
  position: absolute;
  right: 30px;
  top: 15px;
  z-index: 3;
  font-size: 25px;
  width: 40px;
  padding: 0;
  text-align: center;
}
.custom-color{
  color: #ff0000;
  text-shadow: -1px 1px 0px white;
}
.custom-background{
  background-image: url('/image/im-just-going-to-leave-this-here-4k-backgrounds-website-for-v0-acnbp4hyin9e1.png');
  background-size: cover;
}

</style>
