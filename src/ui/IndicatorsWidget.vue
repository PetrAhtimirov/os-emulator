<script setup lang="ts">
import { inject, ref, onMounted } from "vue";
import OS from "../core/OS";

const os = inject<OS>("os")!;

const speed = ref(os.simEngine.getSpeed());
const currentProcess = ref(os.cpu.getCurrentProcess());

onMounted(() => {
  setInterval(() => {
    speed.value = os.simEngine.getSpeed();
    currentProcess.value = os.cpu.getCurrentProcess();
  }, 100);
});
</script>

<template>
  <div class="block">
    <span class="name">Индикаторы</span>
    <span>Скорость: {{ speed.toFixed(1) }} тактов/сек</span>
    <span>Активный процесс: {{ currentProcess ? currentProcess.id : "Нет" }}</span>
    <span>Счётчик команд: {{ currentProcess ? currentProcess.pc : "-" }}</span>
  </div>
</template>
