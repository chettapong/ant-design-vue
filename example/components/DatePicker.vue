<template>
  <div>
    <h1>Date Picker</h1>
    <a-date-picker @change="onChange" />
    <br /><br />
    <a-month-picker placeholder="Select month" @change="onChange" />
    <br /><br />
    <a-range-picker @change="onChange" />
    <br /><br />
    <a-week-picker placeholder="Select week" @change="onChange" />
    <br /><br />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // Method
    function onChange(date: moment.Moment, dateString: string) {
      console.log(date, dateString)
    }

    return {
      onChange
    }
  }
})
</script>
