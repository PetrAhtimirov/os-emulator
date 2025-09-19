import readline from "readline";
import OS from "./core/OS";

const os = new OS({
  totalMemory: 100,
  maxProcesses: 32,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "os> ",
});

const helpText = `
Доступные команды:
/start   — запустить симуляцию
/stop    — остановить симуляцию
/gen     — сгенерировать новый процесс
/ps      — список процессов
/mem     — показать свободную память
/exit    — выйти из программы
/?       — показать эту справку
`;

console.log("OS Emulator (CLI mode)");
console.log(helpText);

rl.prompt();

rl.on("line", (line) => {
  const cmd = line.trim();

  switch (cmd) {
    case "/start":
      os.simEngine.start();
      console.log("Симуляция запущена");
      break;

    case "/stop":
      os.simEngine.stop();
      console.log("Симуляция остановлена");
      break;

    case "/gen":
      try {
        const p = os.generateJob(5, 20, 10, 50);
        os.loadProcess(p);
        console.log(`Процесс создан: PID=${p.id}`);
      } catch (e) {
        console.error("Ошибка генерации процесса:", e);
      }
      break;

    case "/ps":
      console.table(
        os.processTable.getProcesses().map((p) => ({
          PID: p.id,
          State: p.state,
          PC: p.pc,
        })),
      );
      break;

    case "/mem":
      console.log("Свободная память:", os.memoryManager.getFreeMemory());
      break;

    case "/exit":
      rl.close();
      break;

    case "/?":
      console.log(helpText);
      break;

    default:
      console.log(
        "Неизвестная команда:",
        cmd,
        "\nВведите /? для списка команд",
      );
  }

  rl.prompt();
}).on("close", () => {
  console.log("👋 Завершение работы CLI");
  process.exit(0);
});
