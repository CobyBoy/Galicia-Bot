import * as dotenv from 'dotenv'
dotenv.config();
import {
  BASE_URL,
  DEFAULT_MESSAGE,
  SUCCESS_MESSAGE,
  TRANSFERENCIA_A_BUSCAR,
} from './constants.js';
import * as css from './selectors.js';

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
    await this.page.type('#DocumentNumber', process.env.DNI);
    await this.page.type('#UserName', process.env.USER_NAME);
    await this.page.type('#Password', process.env.PASSWORD);
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
          if (row.textContent.includes(valorABuscar) && row.textContent.includes(new Date().getMonth()+1) && !depositado) {
            console.log('Sueldo depositado');
            for (const i of row.children) {
              message += i.innerText + '\n';
            }
            depositado = true;
            return message;
          }
        }
        return msgDefault;
      },
      css.default.selectors.listaDeMovimientos,
      TRANSFERENCIA_A_BUSCAR,
      DEFAULT_MESSAGE,
      SUCCESS_MESSAGE
    );
  };
}
