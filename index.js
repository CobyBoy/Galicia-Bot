import puppeteer from 'puppeteer';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const path = require('./selectors.json');
import Telegram from './Telegram.js';
import Galicia from './Galicia.js';
const chromium = require('chrome-aws-lambda');


const options = {
  headless: false,
  defaultViewport: null,
  args: ['--window-size=1500,1080', '--no-sandbox', '--disable-setuid-sandbox'],
};
const browser = await puppeteer.launch(options);

const page = await browser.newPage();

const bot = new Galicia(page);

await bot.goToLoginPage();

await bot.fillLoginForm();

await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

await page
  .waitForSelector('.container-fluid', { visible: true })
    .then(() => console.log('Página principal cargada...'));
  
await page
  .waitForSelector('.content-nav', { visible: true })
    .then(() => console.log('Menú cargado...'));
  
const cuentasLink = await page.waitForSelector(path.selectors.cuentasLink, { visible: true });
cuentasLink.click().then(()=> console.log('navegando a cuentas...'));

await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

const cajaPesos = await page.waitForSelector(path.selectors.cajaPesos, { visible: true });
cajaPesos.click().then(() => console.log('navegando a mis movimientos...'));

await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
 
await page.waitForSelector(path.selectors.listaDeMovimientos, { visible: true });

const messageToSend = await bot.findDeposit();
const telebot = new Telegram();
telebot.sendTelegramMsg(messageToSend + '\n[Enviado desde NodeJS bot]');

browser.close();