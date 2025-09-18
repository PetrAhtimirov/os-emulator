/**
 * Класс MemoryManager управляет доступной памятью системы.
 */
export default class MemoryManager {
  totalMemory: number;
  freeMemory: number;

  /**
   * @param totalMemory - общий объём памяти в словах
   */
  constructor(totalMemory: number) {
    this.totalMemory = totalMemory; // всего памяти
    this.freeMemory = totalMemory; // сколько памяти свободно
  }

  /**
   * Проверяет, достаточно ли свободной памяти.
   * @param size - сколько слов нужно
   * @returns достаточно ли свободной памяти
   */
  hasSpace(size: number): boolean {
    return this.freeMemory >= size;
  }

  /**
   * Выделяет память для процесса.
   * @param size - сколько слов требуется
   * @returns удалось ли выделить память
   */
  allocate(size: number): boolean {
    if (!this.hasSpace(size)) return false;
    this.freeMemory -= size;
    return true;
  }

  /**
   * Освобождает память после завершения процесса.
   * @param size - сколько слов освобождается
   */
  free(size: number) {
    this.freeMemory += size;
    if (this.freeMemory > this.totalMemory) {
      this.freeMemory = this.totalMemory; // защита от переполнения
    }
  }

  /**
   * Получить текущий объём свободной памяти.
   * @returns объем свободной памяти
   */
  getFreeMemory(): number {
    return this.freeMemory;
  }
}
