function Home() {
    const token = localStorage.getItem('@App:token');

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Home</h1>
            <p>Login realizado com sucesso.</p>
            <p>{token ? 'Token salvo no localStorage.' : 'Token não encontrado.'}</p>
        </main>
    );
}

export default Home;
