export type ProcessState = "NEW" | "READY" | "RUNNING" | "TERMINATED";

/**
 * Класс Process представляет один процесс в системе.
 */
export default class Process {
  id: number;
  memorySize: number;
  totalInstructions: number;
  state: ProcessState;
  pc: number;

  /**
   * @param id - уникальный идентификатор процесса
   * @param memorySize - размер памяти (в словах), требуемый процессу
   * @param totalInstructions - общее количество команд (длина программы)
   */
  constructor(id: number, memorySize: number, totalInstructions: number) {
    this.id = id;
    this.memorySize = memorySize;
    this.totalInstructions = totalInstructions;

    this.state = "NEW"; // возможные: NEW, READY, RUNNING, TERMINATED
    this.pc = 0; // счетчик команд (Program Counter)
  }

  /**
   * Выполнение одного такта (увеличивает PC).
   * Если процесс завершён, переводит его в состояние TERMINATED.
   */
  tick() {
    if (this.state === "TERMINATED") return;

    this.pc += 1;

    if (this.pc >= this.totalInstructions) {
      this.state = "TERMINATED";
    }
  }

  /**
   * Переводит процесс в состояние READY.
   */
  setReady() {
    if (this.state === "NEW") {
      this.state = "READY";
    }
  }

  /**
   * Переводит процесс в состояние RUNNING.
   */
  setRunning() {
    if (this.state === "READY" || this.state === "RUNNING") {
      this.state = "RUNNING";
    }
  }

  /**
   * Принудительное завершение процесса.
   */
  terminate() {
    this.state = "TERMINATED";
  }

  /**
   * Проверка: завершён ли процесс?
   * @returns {boolean}
   */
  isTerminated() {
    return this.state === "TERMINATED";
  }
}
