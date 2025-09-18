import Process from "./Process";

/**
 * Класс ProcessTable управляет таблицей состояний процессов.
 */
export default class ProcessTable {
  maxProcesses: number;
  processes: Process[];

  /**
   * @param maxProcesses - максимальное количество процессов в таблице
   */
  constructor(maxProcesses: number) {
    this.maxProcesses = maxProcesses;
    this.processes = []; // массив объектов Process
  }

  /**
   * Проверка: есть ли место для нового процесса
   */
  hasSpace(): boolean {
    return this.processes.length < this.maxProcesses;
  }

  /**
   * Добавляет процесс в таблицу
   * @throws Error если места нет
   * @throws Error если процесс с таким PID уже существует
   */
  addProcess(process: Process) {
    if (!this.hasSpace()) {
      throw new Error("Таблица процессов заполнена!");
    }
    if (this.processes.some((p) => p.id === process.id)) {
      throw new Error(`Процесс с PID "${process.id}" уже существует!`);
    }

    this.processes.push(process);
  }

  /**
   * Удаляет процесс по ID
   */
  removeProcess(id: number) {
    const index = this.processes.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.processes.splice(index, 1);
    }
  }

  /**
   * Получить список процессов
   */
  getProcesses(): Process[] {
    return [...this.processes];
  }

  /**
   * Найти процесс по ID
   */
  getProcess(id: number): Process | undefined {
    return this.processes.find((p) => p.id === id);
  }
}
