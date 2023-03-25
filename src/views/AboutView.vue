<script lang="ts" setup>
import FaviconVue from "@/components/icon/Favicon.vue";
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center py-10">
    <n-icon size="150">
      <FaviconVue />
    </n-icon>
    <h1>Jumpalong</h1>
    <span>
      {{ "Jumpalong __VERSION__ · Made by "
      }}<RouterLink
        :to="{
          name: 'profile',
          params: {
            value:
              'nprofile1qqsqwmawngpqvu72l8dkvu6gsj4y5al5nw3egf6gjmjrncwxlutc9zgpzpmhxue69uhkummnw3ezuamfdejsz9mhwden5te0wfjkccte9ehx7um5wghxyctwvshsz8thwden5te0dehhxarj94c82c3wwajkcmr0wfjx2u3wdejhgqgdwaehxw309ahx7uewd3hkcmwsv63',
          },
        }"
        >Mekefly</RouterLink
      >
    </span>
  </div>
</template>

<style scoped></style>
