import {
  BASE_URL,
  DEFAULT_MESSAGE,
  SUCCESS_MESSAGE,
  TRANSFERENCIA_A_BUSCAR,
} from './constants.js';
import { DNI, PASSWORD, USERNAME } from './credentials.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const path = require('./selectors.json');

export default class Galicia {
  constructor(page) {
    this.page = page
  }

  async goToLoginPage() {
    console.log('Abriendo navegador...');
    await this.page.goto(BASE_URL);
  }

  async fillLoginForm() {
    await this.page
      .waitForSelector('#form1', { visible: true })
      .then(() => console.log('Formulario listo'));
    await this.page.type('#DocumentNumber', DNI);
    await this.page.type('#UserName', USERNAME);
    await this.page.type('#Password', PASSWORD);
    await this.page.click('#submitButton');
    console.log('Logueando...');
  }

  async findDeposit() {
    return await this.page.evaluate(
      (listaDeMovimientosPath, valorABuscar, msgDefault, msgSuccess) => {
        const listaDeMovimientos = document.querySelectorAll(listaDeMovimientosPath);
        let message = msgSuccess;
        let depositado = false;

        for (const row of listaDeMovimientos) {
          if (row.textContent.includes(valorABuscar) && !depositado) {
            console.log('Sueldo depositado');
            for (i of row.children) {
              message += i.innerText + '\n';
            }
            depositado = true;
            return message;
          }
        }
        return msgDefault;
      },
      path.selectors.listaDeMovimientos,
      TRANSFERENCIA_A_BUSCAR,
      DEFAULT_MESSAGE,
      SUCCESS_MESSAGE
    );
  }
}
