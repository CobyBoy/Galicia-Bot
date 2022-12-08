import axios from 'axios';
import { SEND_URL } from './constants.js';
import { CHAT_ID } from './credentials.js';

export default class Telegram {
  constructor() {}

  sendTelegramMsg(message) {
    let data = { chat_id: CHAT_ID, text: message };
    if (!message) {
      console.log('El mensaje está vacío, no se enviará');
      return;
    }
    console.log('Enviando mensaje a Telegram...');
    try {
      axios.post(SEND_URL, data);
      console.log('Mensaje enviado');
    } catch (error) {
      console.log('Hubo un error');
    }
  }
}

/**
 * import requests
from constants import SEND_URL
from credentials import CHAT_ID
from constants import DEFAULT_MESSAGE

class Telegram():
    def __init__(self):
        print()
    
    def send_telegram_msg(self, message):
        print("Enviando mensaje de Telegram...")
        try:
            requests.post(SEND_URL, json={
                      'chat_id': CHAT_ID, 'text': f"{message}"})
            print("Mensaje enviado...")
        except:
            print("Hubo un error enviando el mensaje")
 */
