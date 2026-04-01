import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/dados', (req, res) => {
  res.json({ mensagem: "Olá! O Node enviou isso para o React." });
});

app.listen(5000, () => {
  console.log("Servidor rodando em http://localhost:5000");
});