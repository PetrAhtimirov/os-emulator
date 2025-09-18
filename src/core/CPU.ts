import Process from "./Process";

/**
 * Класс CPU выполняет такты процесса
 */
export default class CPU {
  currentProcess: Process | null;

  constructor() {
    this.currentProcess = null; // активный процесс (Process)
  }

  /**
   * Устанавливает активный процесс
   * @param process
   */
  setProcess(process: Process) {
    this.currentProcess = process;
    if (process && process.state === "READY") {
      process.setRunning();
    }
  }

  /**
   * Выполняет один такт активного процесса
   */
  tick() {
    if (!this.currentProcess) return;

    this.currentProcess.tick();

    if (this.currentProcess.isTerminated()) {
      this.currentProcess = null; // процесс завершён
    }
  }

  /**
   * Получить текущий активный процесс
   * @returns {Process | null}
   */
  getCurrentProcess() {
    return this.currentProcess;
  }
}
