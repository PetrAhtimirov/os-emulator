<script setup lang="ts">
import { provide, reactive } from "vue";

import OS from "./core/OS.js";
import ControlPanel from "./ui/ControlPanel.vue";
import IndicatorsWidget from "./ui/IndicatorsWidget.vue";
import MemoryWidget from "./ui/MemoryWidget.vue";
import ProcessTable from "./ui/ProcessTable.vue";

const os = reactive(
  new OS({
    totalMemory: 100,
    maxProcesses: 32,
  }),
);

os.initialize();
provide<OS>("os", os);
</script>

<template>
  <div id="app" class="app">
    <ControlPanel />
    <div class="info">
      <IndicatorsWidget />
      <MemoryWidget />
    </div>
    <ProcessTable />
  </div>
</template>
