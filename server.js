import express from 'express';

export const app = express();

app.all('/', (req, res) => {
  res.send('Bot is running...');
});

export const keepAlive = () => {
  app.listen(() => {
    console.log(`Server is running...`);
  });
};
