import { useState } from 'react';
import './registrationModal.css';

function RegistrationModal() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let newErrors = { username: '', email: '', password: '' };
        let hasError = false;

        if (formData.username.trim().length < 3) {
            newErrors.username = "O nome de usuário deve ter no mínimo 3 caracteres";
            hasError = true;
        }

        if (!formData.email.includes("@")) {
            newErrors.email = "Insira um e-mail válido";
            hasError = true;
        }

        if (formData.password.length < 6) {
            newErrors.password = "A senha deve conter no mínimo 6 caracteres";
            hasError = true;
        }

        if (!hasError) {
            try {
                // const response = await fetch(`https://sua-api.com/check-email?email=${formData.email}`);
                // const data = await response.json();

                const emailJaExiste = false;

                if (emailJaExiste) {
                    newErrors.email = "Este e-mail já está em uso.";
                    hasError = true;
                }
            } catch (err) {
                console.error("Erro ao conectar com o servidor");
            }
        }

        setErrors(newErrors);

        if (!hasError) {
            alert("Cadastro realizado com sucesso!");
            console.log("Dados enviados:", formData);
            // POST
        }
    };

    return (
        <div className="modal">
            <div className="left-side">
                <h1 className='title'>Bem-vindo ao nosso site!</h1>
                <p className='description'>Faça seu registro para acessar conteúdos exclusivos.</p>
            </div>
            <div className="right-side">
                <img src="../../images/logos/shortLogo.svg" alt="Logo" className='img_logo' />
                <h2 className='form_title'>Criar sua conta</h2>

                <form className='registration_forms' onSubmit={handleFormSubmit}>

                    <div className='form-group'>
                        <input
                            type="text"
                            name="username"
                            placeholder='Nome de usuário'
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? 'input-error' : ''}
                        />
                        {errors.username && <span className='error-message'>{errors.username}</span>}
                    </div>

                    <div className='form-group'>
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <span className='error-message'>{errors.email}</span>}
                    </div>

                    <div className='form-group'>
                        <input
                            type="password"
                            name="password"
                            placeholder='Senha'
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'input-error' : ''}
                        />
                        {errors.password && <span className='error-message'>{errors.password}</span>}
                    </div>

                    <button type="submit" className='button-forms'>Registrar</button>
                </form>

                <a href="/login" className='login-link'>Já tem uma conta? <b className='login-text'>Faça login</b></a>
            </div>
        </div>
    );
}

export default RegistrationModal;