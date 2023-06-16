<template>
  <div>
    <h2>Moment</h2>
    <h3>Format Dates</h3>
    <table>
      <tr v-for="(format, index) in momentFormats" :key="`format-${index}`">
        <td>moment().format('{{ format }}');</td>
        <td class="comment">// {{ $moment().format(format) }}</td>
      </tr>
    </table>

    <h3>Relative Time</h3>
    <table>
      <tr>
        <td>moment("20111031", "YYYYMMDD").fromNow();</td>
        <td class="comment">
          // {{ $moment('20111031', 'YYYYMMDD').fromNow() }}
        </td>
      </tr>
      <tr>
        <td>moment("20120620", "YYYYMMDD").fromNow();</td>
        <td class="comment">
          // {{ $moment('20120620', 'YYYYMMDD').fromNow() }}
        </td>
      </tr>
      <tr>
        <td>moment().startOf('day').fromNow();</td>
        <td class="comment">
          //
          {{
            $moment()
              .startOf('day')
              .fromNow()
          }}
        </td>
      </tr>
      <tr>
        <td>moment().endOf('day').fromNow();</td>
        <td class="comment">
          //
          {{
            $moment()
              .endOf('day')
              .fromNow()
          }}
        </td>
      </tr>
      <tr>
        <td>moment().startOf('hour').fromNow();</td>
        <td class="comment">
          //
          {{
            $moment()
              .startOf('hour')
              .fromNow()
          }}
        </td>
      </tr>
    </table>

    <h3>Calendar Time</h3>
    <table>
      <tr>
        <td>moment().subtract(10, 'days').calendar();</td>
        <td class="comment">
          //
          {{
            $moment()
              .subtract(10, 'days')
              .calendar()
          }}
        </td>
      </tr>
      <tr>
        <td>moment().subtract(6, 'days').calendar();</td>
        <td class="comment">
          //
          {{
            $moment()
              .subtract(6, 'days')
              .calendar()
          }}
        </td>
      </tr>
      <tr>
        <td>moment().subtract(3, 'days').calendar();</td>
        <td class="comment">
          //
          {{
            $moment()
              .subtract(3, 'days')
              .calendar()
          }}
        </td>
      </tr>
      <tr>
        <td>moment().subtract(1, 'days').calendar();</td>
        <td class="comment">
          //
          {{
            $moment()
              .subtract(1, 'days')
              .calendar()
          }}
        </td>
      </tr>
      <tr>
        <td>moment().calendar();</td>
        <td class="comment">// {{ $moment().calendar() }}</td>
      </tr>
      <tr>
        <td>moment().add(1, 'days').calendar();</td>
        <td class="comment">
          //
          {{
            $moment()
              .add(1, 'days')
              .calendar()
          }}
        </td>
      </tr>
      <tr>
        <td>moment().add(3, 'days').calendar();</td>
        <td class="comment">
          //
          {{
            $moment()
              .add(3, 'days')
              .calendar()
          }}
        </td>
      </tr>
      <tr>
        <td>moment().add(10, 'days').calendar();</td>
        <td class="comment">
          //
          {{
            $moment()
              .add(10, 'days')
              .calendar()
          }}
        </td>
      </tr>
    </table>

    <h3>Multiple Locale Support</h3>
    <table>
      <tr>
        <td>moment.locale();</td>
        <td class="comment">// {{ $moment.locale() }}</td>
      </tr>
      <tr>
        <td>moment().format('LT');</td>
        <td class="comment">// {{ $moment().format('LT') }}</td>
      </tr>
      <tr>
        <td>moment().format('LTS');</td>
        <td class="comment">// {{ $moment().format('LTS') }}</td>
      </tr>
      <tr>
        <td>moment().format('L');</td>
        <td class="comment">// {{ $moment().format('L') }}</td>
      </tr>
      <tr>
        <td>moment().format('l');</td>
        <td class="comment">// {{ $moment().format('l') }}</td>
      </tr>
      <tr>
        <td>moment().format('LL');</td>
        <td class="comment">// {{ $moment().format('LL') }}</td>
      </tr>
      <tr>
        <td>moment().format('ll');</td>
        <td class="comment">// {{ $moment().format('ll') }}</td>
      </tr>
      <tr>
        <td>moment().format('LLL');</td>
        <td class="comment">// {{ $moment().format('LLL') }}</td>
      </tr>
      <tr>
        <td>moment().format('lll');</td>
        <td class="comment">// {{ $moment().format('lll') }}</td>
      </tr>
      <tr>
        <td>moment().format('LLLL');</td>
        <td class="comment">// {{ $moment().format('LLLL') }}</td>
      </tr>
      <tr>
        <td>moment().format('llll');</td>
        <td class="comment">// {{ $moment().format('llll') }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // Reactive
    const momentFormats = reactive([
      'MMMM Do YYYY, h:mm:ss a',
      'dddd',
      'MMM Do YY',
      'YYYY [escaped] YYYY'
    ])

    return {
      momentFormats
    }
  }
})
</script>
