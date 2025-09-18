import CPU from "./CPU.js";
import JobGenerator from "./JobGenerator.js";
import MemoryManager from "./MemoryManager.js";
import Process from "./Process.js";
import ProcessTable from "./ProcessTable.js";
import SimulationEngine from "./SimulationEngine.js";

type Config = {
  maxProcesses: number;
  totalMemory: number;
};

export default class OS {
  memoryManager: MemoryManager;
  processTable: ProcessTable;
  cpu: CPU;
  simEngine: SimulationEngine;
  jobGenerator: JobGenerator;
  config: Config;

  constructor(config: Config) {
    this.memoryManager = new MemoryManager(config.totalMemory);
    this.processTable = new ProcessTable(config.maxProcesses);
    this.cpu = new CPU();
    this.simEngine = new SimulationEngine(this.cpu);
    this.jobGenerator = new JobGenerator();

    this.config = config; // для UI и диапазонов генерации
  }

  /**
   * Инициализация модели
   */
  initialize() {
    this.processTable = new ProcessTable(this.config.maxProcesses);
    this.memoryManager = new MemoryManager(this.config.totalMemory);
    this.cpu = new CPU();
    this.simEngine = new SimulationEngine(this.cpu);
    this.jobGenerator = new JobGenerator();
  }

  /**
   * Генерация нового процесса
   */
  generateJob(
    minMemory: number,
    maxMemory: number,
    minInstructions: number,
    maxInstructions: number,
  ): Process {
    const process = this.jobGenerator.generateProcess(
      minMemory,
      maxMemory,
      minInstructions,
      maxInstructions,
    );
    return process;
  }

  /**
   * Загрузка процесса в систему
   */
  loadProcess(process: Process) {
    // Выделяем память и добавляем процесс
    this.memoryManager.allocate(process.memorySize);
    this.processTable.addProcess(process);

    // Если CPU свободен, назначаем этот процесс
    if (!this.cpu.getCurrentProcess()) {
      this.cpu.setProcess(process);
    }
  }

  /**
   * Завершить симуляцию: останавливаем движок, очищаем память и таблицу
   */
  terminateSimulation() {
    this.simEngine.stop();
    // Освобождаем память всех процессов
    this.processTable.getProcesses().forEach((p) => {
      this.memoryManager.free(p.memorySize);
    });
    this.processTable = new ProcessTable(this.config.maxProcesses);
    this.cpu = new CPU();
  }

  /**
   * Установить скорости симуляции
   */
  setSpeed(speedVal: number) {
    this.simEngine.setSpeed(speedVal);
  }

  /**
   * Получить справку
   */
  getHelp() {
    return `
      Доступные команды:
      - Завершить моделирование
      - Увеличить скорость на 5-10%
      - Уменьшить скорость на 5-10%
      - /? - показать справку
    `;
  }

  /**
   * Экспорт состояния модели (для JSON)
   */
  exportState() {
    const state = {
      processes: this.processTable.getProcesses().map((p) => ({
        id: p.id,
        pc: p.pc,
        memorySize: p.memorySize,
        totalInstructions: p.totalInstructions,
        state: p.state,
      })),
      freeMemory: this.memoryManager.getFreeMemory(),
      speed: this.simEngine.getSpeed(),
    };
    return JSON.stringify(state, null, 2);
  }

  /**
   * Импорт состояния модели из JSON
   */
  importState(json: string) {
    const state = JSON.parse(json);
    this.initialize();

    state.processes.forEach((pData: Process) => {
      const proc = new Process(
        pData.id,
        pData.memorySize,
        pData.totalInstructions,
      );
      proc.pc = pData.pc;
      proc.state = pData.state;

      this.memoryManager.allocate(proc.memorySize);
      this.processTable.addProcess(proc);
    });

    this.simEngine.setSpeed(state.speed);
  }

  /**
   * Выполняет один такт симуляции
   */
  tick() {
    // Выполнить текущий процесс
    this.cpu.tick();

    // Если CPU свободен, назначить первый READY-процесс из таблицы
    if (!this.cpu.getCurrentProcess()) {
      const next = this.processTable
        .getProcesses()
        .find((p) => p.state === "READY");
      if (next) {
        this.cpu.setProcess(next);
      }
    }
  }
}
