import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { SEND_URL } from './constants.js';

export default class Telegram {
  constructor() {}

  sendTelegramMsg(message) {
    let data = { chat_id: process.env.CHAT_ID, text: message };
    if (!message) {
      console.log('El mensaje está vacío, no se enviará');
      return;
    }

    try {
      console.log('Enviando mensaje a Telegram...');
      axios
        .post(SEND_URL, data)
        .then(() => console.log('Mensaje enviado'))
        .catch((error) =>
          console.log('Error en request', error.response.config.url)
        );
    } catch (error) {
      console.log('Hubo un error');
    }
  }
}
