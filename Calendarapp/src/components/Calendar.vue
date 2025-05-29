<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'

const date = ref(new Date())
const dropdownVisible = ref(false)
const dropdownPosition = ref({ top: 0, left: 0 })
const selectedDay = ref<any>(null)

function showDropdown(event: MouseEvent, day: any) {
  selectedDay.value = day
  dropdownVisible.value = true
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  dropdownPosition.value = {
    top: rect.top + window.scrollY + rect.height,
    left: rect.left + window.scrollX,
  }

  event.stopPropagation()
}
function onClickOutside(event: MouseEvent) {
  const dropdown = document.querySelector('.dropdown-menu')
  const dayContent = document.querySelector('.vc-day-content')
  if (
    dropdown &&
    !dropdown.contains(event.target as Node) &&
    dayContent &&
    !(event.target as HTMLElement).classList.contains('vc-day-content')
  ) {
    dropdownVisible.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', onClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <div class="calendar-wrapper">
    <Calendar v-model="date">
      <template #day-content="{ day }">
        <div
          class="vc-day-content"
          :aria-label="day.label"
          @click="showDropdown($event, day)"
          style="cursor: pointer"
        >
          {{ day.day }}
        </div>
      </template>
    </Calendar>
    <ul
      class="dropdown-menu show ps-3"
      v-if="dropdownVisible"
      :style="{
        position: 'absolute',
        top: dropdownPosition.top + 'px',
        left: dropdownPosition.left + 'px',
        zIndex: 9999,
      }"
      @click="dropdownVisible = false"
    >
      <li>
        <a
          href="#"
          class="pe-auto text-decoration-none text-black"
          data-bs-toggle="modal"
          data-bs-target="#CreateEventBackdrop"
          >Create</a
        >
      </li>
      <li>
        <a
          href="#"
          class="pe-auto text-decoration-none text-black"
          data-bs-toggle="modal"
          data-bs-target="#ViewEventBackdrop"
          >View</a
        >
      </li>
      <li>
        <a
          href="#"
          class="pe-auto text-decoration-none text-black"
          data-bs-toggle="modal"
          data-bs-target="#CreateEventBackdrop"
          >Edit</a
        >
      </li>
      <li>
        <a
          href="#"
          class="pe-auto text-decoration-none text-black"
          data-bs-toggle="modal"
          data-bs-target="#JoinBackdrop"
          >Join</a
        >
      </li>
    </ul>
  
    <!-- Create Form / Edit  -->
    <div
      class="modal fade"
      id="CreateEventBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="CreateEventBackdrop"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Event</h1>
          </div>
          <div class="modal-body">
            <form>
              <div class="text-start mt-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="radioDefault"
                    id="radioDefault1"
                  />
                  <label class="form-check-label" for="radioDefault1"> Private </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="radioDefault"
                    id="radioDefault2"
                    checked
                  />
                  <label class="form-check-label" for="radioDefault2"> Public </label>
                </div>
              </div>

              <div class="row align-items-end text-start link-con">
                <div class="col-sm-9 link-input">
                  <i class="fa-solid fa-link icon-relative"></i>
                  <input type="text" class="form-control ps-5" id="generatedlinks" />
                </div>
                <div class="col-sm-3 button-container">
                  <button class="btn w-100 background-color-gray">Generate Link</button>
                </div>
              </div>

              <div class="mb text-start">
                <i class="fa-solid fa-t icon-relative"></i>
                <input type="text" class="form-control ps-5" id="titleInput" />
              </div>
              <div class="mb-3 text-start">
                <i class="fa-solid fa-user icon-relative"></i>
                <input type="email" class="form-control ps-5"  id="emailInput" multiple />
              </div>
              <div class="mb-3 row align-items-center datetime-container">
                <div class="col-sm-5 date">
                  <input type="date" class="form-control" v-model="date" id="selectedDate" />
                </div>
                <div class="col-sm row datetime">
                  <div class="col-sm-6 d-flex align-items-center gap-1 time">
                    <label class="text-nowrap">Start :</label>
                    <input type="time" class="form-control" id="StartTime" />
                  </div>
                  <div class="col-sm-6 d-flex align-items-center gap-1 time">
                    <label class="text-nowrap">End :</label>
                    <input type="time" class="form-control" id="EndTime" />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div class="gap-2 d-flex text-center justify-content-center modal-actions">
                <a class="btn background-color-gray" data-bs-dismiss="modal" aria-label="Close"
                  >Cancel</a
                >
                <a class="btn background-color-gray">Delete</a>
                <a type="submit" class="btn background-color-gray">Set</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Display event -->
    <div
      class="modal fade"
      id="ViewEventBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="ViewEventBackdrop"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <a href="#" class="text-decoration-none text-black"
              ><i class="fa-solid fa-left-long pe-auto arrow" data-bs-dismiss="modal" aria-label="Close"></i
            ></a>
            <h1 class="modal-title fs-5 ps-2" id="staticBackdropLabel">View Event</h1>
          </div>
          <div class="modal-body"></div>
        </div>
      </div>
    </div>

    <!----- Join ------>
    <div
      class="modal fade"
      id="JoinBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="JoinBackdrop"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <a href="#" class="text-decoration-none text-black"
              ><i class="fa-solid fa-left-long pe-auto arrow" data-bs-dismiss="modal" aria-label="Close"></i
            ></a>
            <h1 class="modal-title fs-5 ps-2" id="staticBackdropLabel">Join Event</h1>
          </div>
          <div class="modal-body">
            <form class="mb-3">
              <div class="row align-items-end link-con">
                <div class="col-sm-9 text-start link-input">
                  <i class="fa-solid fa-link icon-relative"></i>
                  <input type="text" class="w-100 form-control ps-5" required />
                </div>
                <div class="col-sm-3 button-container">
                  <a href="#" class="btn w-100 background-color-gray">Join</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

.vc-day-content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu {
  display: block;
  min-width: 150px;
}

.btn:hover,.btn:active{
  color: white !important;
  background: rgb(252 23 0) !important;
  border: 1px solid white !important;
  transition: 0.35s; 
}

@media only screen and (min-width: 768px) and (max-width: 1279px) {
  :deep(.vc-container) {
    width: 90% !important;
    font-size: 1rem !important;
    margin: 0 auto !important;
  }
  
  :deep(.vc-header) {
    padding: 8px 6px !important;
    margin-bottom: 1.5rem !important;
  }
  
  :deep(.vc-weeks) {
    padding: 2px 6px !important;
  }
  
  :deep(.vc-day) {
    min-height: 50px !important;
    padding: 5px 0 !important;
  }
  
  :deep(.vc-day-content) {
    font-size: 0.95rem !important;
    width: 100% !important;
    height: 100% !important;
    margin: 4px auto !important;
  }
  
  :deep(.vc-title) {
    font-size: 1.2rem !important;
  }
  
  :deep(.vc-arrow) {
    padding: 6px !important;
  }
  
  :deep(.vc-weekday) {
    padding: 5px 0 !important;
    font-size: 0.9rem !important;
    font-weight: 600 !important;
  }

  
  .dropdown-menu {
    min-width: 150px;
    font-size: 0.95rem;
    padding: 0.4rem 0.7rem !important;
  }
  
  .dropdown-menu li {
    padding: 5px 0;
  }
  
  .date {
    width: 100%;
    margin-bottom: 15px;
    padding: 0%;
  }
  
  .datetime {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .time {
    width: 50%;
    padding: 0;
    display: flex;
    align-items: center;
  }
  
  .time:last-child {
    padding-right: 0;
    padding-left: 5px;
  }
  
  .time label {
    width: 45px;
    margin-right: 5px;
    flex-shrink: 0;
    white-space: nowrap;
  }
  
  .time input {
    flex-grow: 1;
    width: 100%;
  }
  
  .datetime-container {
    margin: 0 0 15px 0;
    display: block;
  }

  .button-container .btn {
    white-space: nowrap;
    font-size: 0.9rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  
  .link-con .link-input {
    width: 65%;
  }
  
  .link-con .button-container {
    width: 35%;
  }
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
  :deep(.vc-container) {
    width: 95% !important;
    font-size: 0.9rem !important;
  }
  
  :deep(.vc-header) {
    padding: 6px 4px !important;
    margin-bottom: 1.2rem !important;
  }
  
  :deep(.vc-weeks) {
    padding: 0 4px !important;
  }
  
  :deep(.vc-day) {
    min-height: 35px !important;
    padding: 4px 0 !important;
  }
  
  :deep(.vc-day-content) {
    font-size: 0.85rem !important;
    width: 100% !important;
    height: 100% !important;
    margin: 3px auto !important;
  }
  
  :deep(.vc-title) {
    font-size: 1rem !important;
  }
  
  :deep(.vc-arrow) {
    padding: 5px !important;
  }
  
  :deep(.vc-weekday) {
    padding: 4px 0 !important;
    font-size: 0.8rem !important;
  }
  
  .dropdown-menu {
    min-width: 130px;
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem !important;
  }
  
  .dropdown-menu li {
    padding: 4px 0;
  }

  .modal {
    padding: 0 !important;
  }

  .modal-backdrop {
    opacity: 1;
    background-color: white;
  }
  
  .modal.fade .modal-dialog {
    margin: 0;
    padding: 0;
    max-width: none;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: none;
    transition: transform 0.1s ease-out;
  }
  
  .modal-dialog {
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .modal-content {
    width: 100% !important;
    max-width: none !important;
    height: 100vh;
    border: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
  
  .modal-header {
    border-radius: 0;
    padding: 16px;
    background-color: #2a2a2a;
    color: white;
    border-bottom: none;
  }
  
  .modal-header .modal-title {
    color: white;
  }

  .arrow {
    color: white;
    margin-right: 6px;
  }
  
  .modal-body {
    padding: 16px;
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .modal-body form {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
  }
  
  .form-control, .form-select, .form-check {
    margin-bottom: 16px;
  }

  .modal-actions {
    margin-top: auto;
    padding-top: 16px;
    padding-bottom: 16px;
    width: 100%;
    justify-content: space-around !important;
  }
  
  .modal-actions .btn {
    width: 30%;
    padding: 10px 0;
  }
  
  .modal-title {
    font-size: 1.3rem !important;
  }
  
  .form-control {
    font-size: 1.05rem;
    padding: 0.55rem;
    height: auto;
  }
  
  .btn {
    font-size: 1.05rem;
    padding: 0.55rem 1.1rem;
  }
  
  .form-check-label {
    font-size: 1rem;
  }
  
  .icon-relative {
    font-size: 1.05rem;
    left: 14px;
  }
  
  .time {
    margin-bottom: 12px;
  }
  
  .time label {
    width: 50px;
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  .time input {
    flex-grow: 1;
    width: 100%;
  }
  
  .datetime {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
    padding: 0;
  }
  
  .date {
    padding-bottom: 6px;
  }

  
}

@media only screen and (min-device-width : 320px) and (max-device-width : 479px) {
  :deep(.vc-container) {
    width: 92% !important;
    font-size: 0.8rem !important;
  }
  
  :deep(.vc-header) {
    padding: 5px 3px !important;
    margin-bottom: 1rem !important;
  }
  
  :deep(.vc-weeks) {
    padding: 0 3px !important;
  }
  
  :deep(.vc-day) {
    min-height: 30px !important;
    padding: 3px 0 !important;
  }
  
  :deep(.vc-day-content) {
    font-size: 0.75rem !important;
    width: 100% !important;
    height: 100% !important;
    margin: 2px auto !important;
  }
  
  :deep(.vc-title) {
    font-size: 0.9rem !important;
  }
  
  :deep(.vc-arrow) {
    padding: 4px !important;
  }
  
  :deep(.vc-weekday) {
    padding: 3px 0 !important;
    font-size: 0.7rem !important;
  }
  
  .dropdown-menu {
    min-width: 120px;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem !important;
  }
  
  .dropdown-menu li {
    padding: 3px 0;
  }
  
  .modal {
    padding: 0 !important;
  }

  .modal-backdrop {
    opacity: 1;
    background-color: white;
  }
  
  .modal.fade .modal-dialog {
    margin: 0;
    padding: 0;
    max-width: none;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: none;
    transition: transform 0.1s ease-out;
  }
  
  .modal-dialog {
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .modal-content {
    width: 100% !important;
    max-width: none !important;
    height: 100vh;
    border: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
  
  .modal-header {
    border-radius: 0;
    padding: 15px;
    background-color: #2a2a2a;
    color: white;
    border-bottom: none;
  }
  
  .modal-header .modal-title {
    color: white;
  }

  .arrow {
    color: white;
    margin-right: 5px;
  }
  
  .modal-body {
    padding: 15px;
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .modal-body form {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
  }
  
  .form-control, .form-select, .form-check {
    margin-bottom: 15px;
  }
  
  .modal-actions {
    margin-top: auto;
    padding-top: 15px;
    padding-bottom: 15px;
    width: 100%;
    justify-content: space-around !important;
  }
  
  .modal-actions .btn {
    width: 30%;
    padding: 10px 0;
  }
  
  .modal-title {
    font-size: 1.2rem !important;
  }
  
  .form-control {
    font-size: 1rem;
    padding: 0.5rem;
    height: auto;
  }
  
  .btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
  
  .form-check-label {
    font-size: 0.9rem;
  }
  
  .icon-relative {
    font-size: 1rem;
    left: 12px;
  }

  .time {
    margin-bottom: 10px;
  }
  
  .time label {
    width: 45px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  
  .time input {
    flex-grow: 1;
    width: 100%;
  }
  
  .datetime {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
    padding: 0;
  }
  
  .date {
    padding-bottom: 5px;
  }
}
</style>
