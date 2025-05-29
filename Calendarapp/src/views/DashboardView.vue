<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import * as CalendarComp from '../components/Calendar.vue'

const isShrunk = ref(false)
const mobileNavOpen = ref(false)

function toggleWidth() {
  isShrunk.value = !isShrunk.value
}

function toggleMobileNav() {
  mobileNavOpen.value = !mobileNavOpen.value
}
</script>

<template>
  <div class="custom-background">
    <div class="container-fluid mainn">
      <div class="row">
        <div :class="[
          'side-bar',
          'text-white',
          'vh-120',
          'p-3',
          'transition-width',
          isShrunk ? 'col-md-1' : 'col-md-2',
        ]">
          <div class="row gap-80 align-items-center justify-content-center">
            <div class="row px-0 justify-content-between align-items-center">
              <div class="col-6" v-if="!isShrunk">
                <h6 class="fw-bold">CALENDAR <span class="custom-color">SYSTEM</span> </h6>
              </div>
              <div :class="isShrunk ? ['col-0', 'text-center'] : ['col-4', 'text-end']">
                <a class="btn text-white burger-btn" @click="toggleWidth">
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
          <div class="container-fluid calendar">
            <div class="notification">
              <a role="button" tabindex="0">
                <i class="fa-solid fa-bell"></i>
              </a>
            </div>
            <div class="text-center custom-height h-100 w-100 align-content-center my-5 pt-3"
              :class="isShrunk ? ['ps-100'] : ['']">
              <component :is="CalendarComp.default" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MOBILE -->
    <div class="mobile-header">
      <div class="mobile-brand">CALENDAR <span class="custom-color">SYSTEM</span></div>
      <div class="mobile-actions">
        <a role="button" tabindex="0" class="mobile-notification">
          <i class="fa-solid fa-bell"></i>
        </a>
        <a class="mobile-burger" @click="toggleMobileNav">
          <i class="fa-solid fa-bars"></i>
        </a>
      </div>
    </div>
    
    <div :class="['mobile-nav-drawer', mobileNavOpen ? 'open' : '']">
      <div class="mobile-nav-header">
        <h6 class="fw-bold mb-0">CALENDAR <span class="custom-color">SYSTEM</span></h6>
        <a class="mobile-nav-close" @click="toggleMobileNav">
          <i class="fa-solid fa-times"></i>
        </a>
      </div>
      <div class="mobile-nav-content">
        <div class="mobile-nav-section">
          <h6>List of joined</h6>
        </div>
        <div class="mobile-nav-footer">
          <router-link to="/" class="btn text-center text-white">
            <i class="fa-solid fa-right-from-bracket"></i> Log out
          </router-link>
        </div>
      </div>
    </div>
    
    <div :class="['mobile-nav-overlay', mobileNavOpen ? 'open' : '']" @click="toggleMobileNav"></div>
    <!-- END -->
  </div>
</template>

<style scoped>
.custom-background {
  background-image: url('/image/im-just-going-to-leave-this-here-4k-backgrounds-website-for-v0-acnbp4hyin9e1.png');
  background-size: cover;
}
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

.fa-bell {
  color: #2a2a2a;
}

.custom-color {
  color: #cd4628; 
}

.mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #2a2a2a;
  color: white;
  padding: 10px 15px;
  z-index: 1000;
  justify-content: space-between;
  align-items: center;
}

.mobile-brand {
  font-weight: bold;
  font-size: 16px;
}

.mobile-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.mobile-notification, .mobile-burger {
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.mobile-nav-drawer {
  position: fixed;
  top: 0;
  left: -280px;
  width: 280px;
  height: 100%;
  background-color: #2a2a2a;
  color: white;
  z-index: 1001;
  transition: left 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.mobile-nav-drawer.open {
  left: 0;
}

.mobile-nav-header {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-nav-close {
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.mobile-nav-content {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mobile-nav-section {
  margin-bottom: 20px;
}

.mobile-nav-footer {
  margin-top: auto;
  text-align: center;
}

.mobile-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-nav-overlay.open {
  opacity: 1;
  visibility: visible;
}

@media only screen and (min-width: 992px) {
  .custom-background {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .mainn {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .mainn > .row {
    flex: 1;
    min-height: 100vh;
  }
  
  .side-bar {
    min-height: 100vh;
    overflow-y: auto;
  }
  
  .col-md-10 {
    min-height: 100vh;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  
  .custom-background {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .side-bar {
    display: block !important; 
    min-width: 220px !important;
    flex: 0 0 220px !important;
    max-width: 220px !important;
    
    min-height: 100vh;
  }
  
  .side-bar.col-md-1 {
    min-width: 100px !important;
    flex: 0 0 100px !important;
    max-width: 100px !important;
  }
  
  .col-md-10 {
    width: calc(100% - 220px) !important;
    flex: 0 0 calc(100% - 220px) !important;
    max-width: calc(100% - 220px) !important;
  }
  
  .col-md-10.ml-auto {
    margin-left: auto !important;
  }
  
  .side-bar.col-md-1 + .col-md-10 {
    width: calc(100% - 100px) !important;
    flex: 0 0 calc(100% - 100px) !important;
    max-width: calc(100% - 100px) !important;
  }
  
  .mobile-header {
    display: none;
  }
  
  .notification {
    right: 10px;
  }

  .ps-100 {
    padding-left: 0 !important;
  }
  
}


@media only screen and (min-width: 480px) and (max-width: 767px) {
  .custom-background {
    background-size: cover;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  .mainn {
    width: 100%;
    overflow-x: hidden;
    padding-top: 50px; 
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  
  .calendar {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  
  .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  .side-bar {
    display: none; 
  }
  
  .notification {
    display: none;
  }
  
  .mobile-header {
    display: flex; 
    padding: 12px 18px;
  }
  
  .mobile-brand {
    font-size: 18px;
  }
  
  .mobile-actions {
    gap: 18px;
  }
  
  .mobile-notification, .mobile-burger {
    font-size: 20px;
  }
  
  .mobile-nav-drawer {
    width: 300px;
    left: -300px;
  }
  
  .mobile-nav-header {
    padding: 18px;
  }
  
  .mobile-nav-content {
    padding: 18px;
  }
  
  .mobile-nav-section h6 {
    font-size: 1.1rem;
    margin-bottom: 15px;
  }
  
  .mobile-nav-footer .btn {
    font-size: 1.05rem;
    padding: 8px 15px;
  }
  
  .col-md-10 {
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  .ps-100 {
    padding-left: 0 !important;
  }
  
  .custom-height {
    margin-top: 15px !important;
    padding-top: 0 !important;
    margin-bottom: 15px !important;
  }
}

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .custom-background {
    background-size: cover;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  .mainn {
    width: 100%;
    overflow-x: hidden;
    padding-top: 50px; 
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  
  .calendar {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  
  .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  .side-bar {
    display: none; 
  }
  
  .notification {
    display: none; 
  }
  
  .mobile-header {
    display: flex; 
  }
  
  .col-md-10 {
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  .ps-100 {
    padding-left: 0 !important;
  }
  
  .custom-height {
    margin-top: 10px !important;
    padding-top: 0 !important;
    margin-bottom: 10px !important;
  }
  
}
</style>
