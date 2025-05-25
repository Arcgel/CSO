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
  <div>
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
  </div>
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

            <div class="row align-items-end text-start">
              <div class="col-sm-9">
                <i class="fa-solid fa-link icon-relative"></i>
                <input type="text" class="form-control ps-5" id="generatedlinks" />
              </div>
              <div class="col-sm-3">
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
            <div class="mb-3 row align-items-center">
              <div class="col-sm-6">
                <input type="date" class="form-control" v-model="date" id="selectedDate" />
              </div>
              <div class="col-sm row">
                <div class="col-sm-6 d-flex align-items-center gap-1">
                  <label class="text-nowrap">Start : </label>
                  <input type="time" class="form-control" id="StartTime" />
                </div>
                <div class="col-sm-6 d-flex align-items-center gap-1">
                  <label class="text-nowrap">End : </label>
                  <input type="time" class="form-control" id="EndTime" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div class="gap-2 d-flex text-center justify-content-center">
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

  <!-- --------------- -->

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
            ><i class="fa-solid fa-left-long pe-auto" data-bs-dismiss="modal" aria-label="Close"></i
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
            ><i class="fa-solid fa-left-long pe-auto" data-bs-dismiss="modal" aria-label="Close"></i
          ></a>
          <h1 class="modal-title fs-5 ps-2" id="staticBackdropLabel">Join Event</h1>
        </div>
        <div class="modal-body">
          <form class="mb-3">
            <div class="row align-items-end">
              <div class="col-sm-9 text-start">
                <i class="fa-solid fa-link icon-relative"></i>
                <input type="text" class="w-100 form-control ps-5" required />
              </div>
              <div class="col-sm-3">
                <a href="#" class="btn w-100 background-color-gray">Join</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- ----------- -->
</template>

<style scoped>
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
</style>
