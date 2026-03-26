import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/dados')
      .then((response) => setDados(response.data))
      .catch((e) => setErro(e.response?.data?.message || e.message));
  }, []);

  return (
    <div>
      <div className="card">
        <h1>Bem-vindo ao meu projeto React!</h1>
        <p>Este é um exemplo de aplicação React com Vite consumindo o backend.</p>
        {erro && <p>Erro: {erro}</p>}
        {!erro && !dados && <p>Carregando dados...</p>}
        {dados && <p>{dados.mensagem}</p>}
    
      </div>
    </div>
  )
}

export default App
