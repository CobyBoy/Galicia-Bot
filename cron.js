import cron from 'node-cron';
import { keepAlive } from './server.js';
import { exec } from 'node:child_process';

//cada 1 hora, si la fecha esta entre el rango, todos los meses,de lun a vier https://crontab.cronhub.io/
let cronExpression = `0 */1 14 * mon-fri`;

let task = cron.schedule(
  cronExpression,
  function () {
    console.log('running a task every hour');

    exec('node bot.js', (error, stdout, stderr) => {
      console.log('Executing file...');
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  },
  { timezone: 'America/Argentina/Buenos_Aires' }
);

keepAlive();
task.start();
