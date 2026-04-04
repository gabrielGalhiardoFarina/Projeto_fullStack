import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import { userRoutes } from './interfaces/routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rota de Teste
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Servidor saudável' });
});

// Prefixo das rotas de usuário
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});