import puppeteer from 'puppeteer';
import * as css from './selectors.js';
import Telegram from './Telegram.js';
import Galicia from './Galicia.js';

const options = {
  headless: false,
  defaultViewport: null,
  args: ['--window-size=1500,1080', '--no-sandbox', '--disable-setuid-sandbox'],
};
const browser = await puppeteer.launch(options);

const page = await browser.newPage();
page.setDefaultNavigationTimeout(60000);

const bot = new Galicia(page);

const telebot = new Telegram();

await bot.goToLoginPage();

await bot.fillLoginForm();

await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

await page
  .waitForSelector(css.default.selectors.inicioBody, { visible: true })
  .then(() => console.log('Página principal cargada...'));

try {
  await page.waitForSelector(css.default.selectors.menu, { visible: true })
    .then(() => console.log('Menú cargado...'));
  
  const cuentasLink = await page.waitForSelector(css.default.selectors.cuentasLink, { visible: true });

  cuentasLink.click().then(() => console.log('navegando a cuentas...'));
} catch (error) {
  console.log('Hubo un error clickeando en cuentas');
}

try {
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
} catch (error) {
  console.log('La navegación a Cuentas falló...');
}

try {
  const cajaPesos = await page.waitForSelector(css.default.selectors.cajaPesos, { visible: true });
  cajaPesos.click().then(() => console.log('navegando a mis movimientos...'));
} catch (error) {
  console.log('Hubo un error clickeando en la caja de pesos');
}

try {
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
} catch (error) {
  console.log('La navegación a Movimientos falló...');
}

try {
  await page.waitForSelector(css.default.selectors.listaDeMovimientos, { visible: true });

  const messageToSend = await bot.findDeposit();
  telebot.sendTelegramMsg(messageToSend + '\n[Enviado desde NodeJS bot]');
} catch (error) {
  console.log('Hubo un error en la carga de la página de movimientos...');
} finally {
  browser.close();
}
