import { useState } from 'react';
import { api } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import './AccessLayout.css';

function AccessLayout({ mode = 'register' }) {
    const isRegisterMode = mode === 'register';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [formMessage, setFormMessage] = useState('');

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
        setSuccessMessage('');
        setFormMessage('');

        let newErrors = { username: '', email: '', password: '' };
        let hasError = false;

        if (isRegisterMode && formData.username.trim().length < 3) {
            newErrors.username = "O nome de usuário deve ter no mínimo 3 caracteres";
            hasError = true;
        }

        if (!formData.email.includes("@")) {
            newErrors.email = "Insira um e-mail válido";
            hasError = true;
        }

        if (formData.password.length < 6) {
            if (isRegisterMode) {
                newErrors.password = "A senha deve conter no mínimo 6 caracteres";
            } else {
                setFormMessage("A senha está errada");
            }
            hasError = true;
        }

        setErrors(newErrors);

        if (!hasError) {
            setIsSubmitting(true);

            try {
                const endpoint = isRegisterMode ? '/users/register' : '/users/login';
                const payload = {
                    email: formData.email,
                    password: formData.password
                };

                if (isRegisterMode) {
                    payload.name = formData.username;
                }

                const response = await api.post(endpoint, payload);

                if (isRegisterMode) {
                    setFormData({ username: '', email: '', password: '' });
                    navigate('/login');
                } else {
                    localStorage.setItem('@App:token', response.data.token);
                    navigate('/home');
                }

            } catch (err) {
                console.error(err);
                
                if (err.response) {
                    if (isRegisterMode && err.response.status === 409) {
                        setErrors({ ...newErrors, email: 'Este e-mail já está em uso.' });
                    } else {
                        const backendMessage = err.response.data.message || 'Erro ao cadastrar';
                        setFormMessage(backendMessage);
                    }
                } else {
                    setFormMessage('Erro ao conectar com o servidor.');
                }
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="modal">
            <div className="left-side">
                <h1 className='title'>Bem-vindo ao nosso site!</h1>
                <p className='description'>
                    {isRegisterMode
                        ? 'Faça seu registro para acessar conteúdos exclusivos.'
                        : 'Entre com sua conta para continuar explorando conteúdos exclusivos.'}
                </p>
            </div>
            <div className="right-side">
                <img src="/images/logos/shortLogo.svg" alt="Logo" className='img_logo' />
                <h2 className='form_title'>{isRegisterMode ? 'Criar sua conta' : 'Entrar na sua conta'}</h2>

                <form className='registration_forms' onSubmit={handleFormSubmit}>

                    {formMessage && <span className='form-error-message'>{formMessage}</span>}

                    {isRegisterMode && (
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
                    )}

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

                    <button type="submit" className='button-forms' disabled={isSubmitting}>
                        {isSubmitting
                            ? (isRegisterMode ? 'Registrando...' : 'Entrando...')
                            : (isRegisterMode ? 'Registrar' : 'Entrar')}
                    </button>

                    {successMessage && <span className='success-message'>{successMessage}</span>}
                </form>

                {isRegisterMode ? (
                    <Link to="/login" className='login-link'>
                        Já tem uma conta? <b className='login-text'>Faça login</b>
                    </Link>
                ) : (
                    <Link to="/register" className='login-link'>
                        Ainda não tem conta? <b className='login-text'>Registre-se</b>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default AccessLayout;