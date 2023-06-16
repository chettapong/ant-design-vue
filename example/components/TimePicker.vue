<template>
  <div>
    <h1>Time Picker</h1>
    <h3>Auto append colon symbol while typing</h3>
    <a-time-picker use12-hours @change="onChange" />
    <br />
    <br />
    <a-time-picker use12-hours format="h:mm:ss A" @change="onChange" />
    <br />
    <br />
    <a-time-picker use12-hours format="h:mm a" @change="onChange" />
    <br />
    <br />
    <a-time-picker format="HH:mm" class="w-full" />
    <br />
    <br />
    <a-time-picker
      :allow-next-day="true"
      format="HH:mm"
      placeholder="เวลา"
      class="w-full"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // Method
    function onChange(
      time: moment.Moment,
      timeString: string,
      isNextDay: boolean
    ) {
      console.log(time, timeString, isNextDay)
    }

    return {
      onChange
    }
  }
})
</script>
