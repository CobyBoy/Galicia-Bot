import { TOKEN } from "./credentials.js"

export const BASE_URL = "https://onlinebanking.bancogalicia.com.ar/login"
export const SEND_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`

export const CHROME_OPTIONS =''
/* export const CHROME_OPTIONS.add_experimental_option("excludeSwitches", ['enable-automation'])
export const CHROME_OPTIONS.add_experimental_option("detach", True)
export const CHROME_OPTIONS.add_argument("window-size=1500,1000") */

export const DEFAULT_MESSAGE = "Todavía no cobramos :("
export const TRANSFERENCIA_A_BUSCAR = "Transferencias cash sueldos"
export const SUCCESS_MESSAGE = "A mi plata la gasto como quiero:\n"
export const WRONG_DATE = "No es el ante último dia hábil del mes"