import * as dotenv from 'dotenv';
dotenv.config();

export const BASE_URL = "https://onlinebanking.bancogalicia.com.ar/login"
export const SEND_URL = `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`
export const DEFAULT_MESSAGE = "Todavía no cobramos :("
export const TRANSFERENCIA_A_BUSCAR = "Transferencias cash sueldos"
export const SUCCESS_MESSAGE = "A mi plata la gasto como quiero:\n"
export const WRONG_DATE = "No es el ante último dia hábil del mes"