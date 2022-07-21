import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconExclamation } from "../components/icons/index";
import useAuth from "../data/hook/useAuth";

export default function Authentication() {

    const {signUp, login, loginGoogle} = useAuth();

    const [error, setError] = useState(null);
    const [signIn, setSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const showError = (msg, seconds = 5) => {
        setError(msg);
        setTimeout(() => setError(null), seconds * 1000);
    }

    const toggleSignIn = () => {
        setSignIn(!signIn);
    }

    const onChangeEmail = (e: any) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const submit = async () => {
        try {
            if(signIn)
                await login(email, password);
            else
                await signUp(email, password);
        } catch(e) {
            showError(e?.message ?? "Ocorreu um erro inesperado.")
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className={`hidden md:block md:w-1/2`}>
                <img
                    src="https://source.unsplash.com/random"
                    alt="Imagem da Tela de Autenticação"
                    className="h-screen w-full object-cover"
                />
            </div>
            <div className={`m-10 w-full md:w-1/2`}>
                <h1 className={`
                    text-xl font-bold mb-5
                `}>
                    {signIn ? 'Entre com a sua conta.' : 'Cadastre-se na plataforma'}
                </h1>

                {error ? (
                    <div className={`
                        flex items-center px-5 py-3 my-2
                        bg-red-400 text-white
                        border border-red-500 rounded-lg
                    `}>
                    {IconExclamation()}
                    <span className="ml-3 text-sm">Ocorreu um erro! {error}</span>
                </div>
                ) : (
                    null
                )}
                <AuthInput
                    type="text"
                    label="E-mail"
                    value={email}
                    onChange={onChangeEmail}
                    required
                />
                <AuthInput
                    type="password"
                    label="Senha"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
                <button onClick={() => submit()} className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}>
                    {signIn ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="w-full my-6 border-gray-300"/>

                <button onClick={() => loginGoogle()} className={`
                    w-full bg-red-500 hover:bg-red-400
                    text-white rounded-lg px-4 py-3
                `}>
                    Entrar com Google
                </button>

                <p className="mt-8">
                    <a
                        onClick={() => toggleSignIn()}
                        className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}
                    >
                        {signIn ? 'Crie uma conta gratuitamente' : 'Entrar com uma conta'}
                    </a>
                </p>
            </div>
        </div>
    )
}