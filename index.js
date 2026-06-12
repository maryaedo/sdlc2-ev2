const express = require('express');
const app = express();
const port = 3000;

function greet(name) {
  const appColor = process.env.APP_COLOR || 'TechMarket';
  if (!name) return `Hola! Soy ${appColor}`;
  return `Hola, ${name}! Bienvenido a CI/CD. (Desde ${appColor})`;
}

module.exports = { greet };

app.get('/', (req, res) => {
  res.send(greet(req.query.name));
});

// Endpoint exigido para las sondas de telemetría en la EV3
app.get('/health', (req, res) => {
  if (process.env.APP_COLOR === 'Fallo-Simulado-Evidencia') {
    return res.status(500).send('UNHEALTHY');
  }
  res.status(200).send('OK');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Aplicación escuchando en http://localhost:${port}`);
  });
}