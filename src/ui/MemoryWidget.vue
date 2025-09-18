<script setup lang="ts">
import { inject, ref, onMounted } from "vue";
import OS from "../core/OS";

const os = inject<OS>("os")!;
const freeMemory = ref(os.memoryManager.getFreeMemory());
const totalMemory = os.memoryManager.totalMemory;

onMounted(() => {
  setInterval(() => {
    freeMemory.value = os.memoryManager.getFreeMemory();
  }, 200);
});
</script>

<template>
  <div class="block">
    <span class="name">Память</span>
    <span>Свободная память: {{ freeMemory }} / {{ totalMemory }}</span>
  </div>
</template>
