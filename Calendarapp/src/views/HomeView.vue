<script setup lang="ts">
import CalendarTest from '@/components/CalendarTest.vue'
import EventTest from '@/components/EventTest.vue'
</script>

<template>
  <main>
    <div class="calendarcontent">
      <div>
        <CalendarTest />
      </div>
      <div>
        <EventTest />
      </div>
    </div>
  </main>
</template>

<style>
.calendarcontent {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 2rem;
}
</style>
