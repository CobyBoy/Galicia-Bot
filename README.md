# Cómo usar

Descargar/clonar repo.
Dentro de la carpeta descargada correr `npm install` para instalar las dependencias.
Crear archivo `.env`
Completarlo como el env_example

Crear bot en telegram con [BotFather](https://t.me/BotFather) o buscarlo desde la app de Telegram @BotFather
para obtener el `TOKEN` seguir las instruccciones
para obtener el `CHAT_ID` propio: buscar @userinfobot en tg e iniciar el bot

El resto completar con los datos de logueo de Galicia Homebanking

En el archivo constants.js: TRANSFERENCIA_A_BUSCAR debe reemplazarse con el movimiento que se desea buscar (devuelve el más reciente). Ej: para recibir mensaje de telegram si Accenture pagó el sueldo sería: SIST. NAC. DE PAGOS - HABERES

El bot correrá según lo indicado en el archivo `cron.js`
`
    let cronExpression = '0 */1 14 * mon-fri';
`
Modificar según necesidad. En el ej corre el minuto 0,cada 1 hora,el día 14 de todos los meses, de lunes a viernes. Molesta todo el día.

El `server.js` y `main.sh` están para poder hostearlo en replit