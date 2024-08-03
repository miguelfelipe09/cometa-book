import axios from 'axios';

export function Register() {

    function authenticatePass() {
        let pass = document.getElementById('pass')
        let confirmPass = document.getElementById('confirmPass')

        if (pass.value === confirmPass.value) {
            register()
        } else {
            alert('As senhas devem ser iguais')
        }

    }
    const register = async () => {
        let userName = document.getElementById('userName')
        let email = document.getElementById('email')
        let pass = document.getElementById('pass')
    console.log('teste');
    
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/register',
            data: {
                userName: userName.value,
                pass: pass.value,
                typeUser: 2,
                email: email.value,
            }
        });
    
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    };
    return(
        <>
            <div className="main-container-register">
                <form action="">
                    <div className="register-container">
                        <img src="../images/logo.png" alt="" />
                        <div className="register">
                            <div className="userName input-container">
                                <input type="text" placeholder="Nome" id="userName"/>
                            </div>
                            <div className="email input-container">
                                <input type="text" placeholder="Email" id="email"/>
                            </div>
                            <div className="password input-container">
                                <input type="password" placeholder="Senha" id="pass"/>
                            </div>
                            <div className="confirmPassword input-container">
                                <input type="password" placeholder="Confirme sua senha" id='confirmPass'/>
                            </div>
                            <div className="button">
                                <button className="button-submit" onClick={authenticatePass}>Enviar</button>
                            </div>
                        </div>
                        <div id='haveAccount'>
                            Já possui uma conta? Faça <a href="/">login</a>
                        </div>
                    </div>
                    
                </form>
            </div>
        </>
        
    )
}