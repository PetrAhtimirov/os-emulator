<script setup lang="ts">
import { inject, ref, onMounted } from "vue";

const os = inject("os");
const processes = ref(os.processTable.getProcesses());

onMounted(() => {
  setInterval(() => {
    processes.value = os.processTable.getProcesses();
  }, 200);
});
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>PID</th>
        <th>PC</th>
        <th>Состояние</th>
        <th>Память</th>
        <th>Всего команд</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="proc in processes" :key="proc.id">
        <td>{{ proc.id }}</td>
        <td>{{ proc.pc }}</td>
        <td>{{ proc.state }}</td>
        <td>{{ proc.memorySize }}</td>
        <td>{{ proc.totalInstructions }}</td>
      </tr>
    </tbody>
  </table>
</template>
