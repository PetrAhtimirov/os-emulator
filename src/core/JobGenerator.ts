import Process from "./Process.js";

/**
 * Класс JobGenerator создаёт новые процессы
 */
export default class JobGenerator {
  counter: number;

  constructor() {
    this.counter = 0; // для генерации уникальных PID
  }

  /**
   * Генерирует новый процесс с уникальным PID
   */
  generateProcess(
    minMemory: number,
    maxMemory: number,
    minInstructions: number,
    maxInstructions: number,
  ): Process {
    this.counter += 1;
    const pid = this.counter;
    const memorySize = this.getRandomInt(minMemory, maxMemory);
    const totalInstructions = this.getRandomInt(
      minInstructions,
      maxInstructions,
    );

    return new Process(Number(pid), memorySize, totalInstructions);
  }

  /**
   * Вспомогательная функция: случайное число между min и max (включительно)
   */
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
