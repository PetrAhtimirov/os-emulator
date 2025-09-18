<script setup lang="ts">
import { inject, ref, watch } from "vue";
import OS from "../core/OS";

const os = inject<OS>("os")!;
const running = ref(false);

const speed = ref<number>(2);

const startPause = () => {
  if (!os) return;

  if (running.value) {
    os.simEngine.stop();
  } else {
    os.simEngine.start();
  }
  running.value = !running.value;
};

const generateProcess = () => {
  if (!os) return;

  try {
    const process = os.generateJob(5, 20, 10, 50);
    os.loadProcess(process);
  } catch (e: unknown) {
    if (e instanceof Error) {
      alert(e.message);
    } else {
      alert("Unknown error");
    }
  }
};

const terminate = () => {
  if (!os) return;

  os.terminateSimulation();
  running.value = false;
};

watch(speed, (newVal) => {
  os.setSpeed(newVal);
});
</script>

<template>
  <div class="control-panel">
    <div class="control-panel-buttons">
      <button @click="startPause">{{ running ? "Пауза" : "Старт" }}</button>
      <button @click="generateProcess">Сгенерировать процесс</button>
      <button @click="terminate">Завершить симуляцию</button>
    </div>
    <label class="speed-wrapper">
      <span>Скорость [тактов/сек]</span>
      <input
        v-model="speed"
        class="speed-input"
        step="0.1"
        type="range"
        name="speed"
        min="0.1"
        max="1000"
      />
    </label>
  </div>
</template>
