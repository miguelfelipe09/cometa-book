import axios from 'axios';

export function Login() {
    const authenticate = async () => {
        let email = document.querySelector('#email').value
        let password = document.querySelector('#pass').value
    
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/api/auth',
                data: {
                    email: email,
                    password: password
                }
            });

            if(response.data) {
                localStorage.setItem('id', `${response.data.idtypeuser}`);

                window.location.replace(`http://localhost:5173/home`);
            }
           
        } catch (error) {
                console.error(error);
        }
    };

    return(
        <>
            <div className="main-container-register">
                <div className="register-container">
                    <img src="../images/logo.png" alt="" />
                    <div className="register login">
                        <div className="email input-container">
                            <input type="text" placeholder="Email" id="email"/>
                        </div>
                        <div className="password input-container">
                            <input type="password" placeholder="Senha" id="pass"/>
                        </div>
                        <div className="button">
                            <button className="button-submit" onClick={authenticate}>Enviar</button>
                        </div>
                    </div>
                        <div id='haveAccount'>
                            Não possui uma conta? <a href="/register">Registre-se</a>
                        </div>
                </div>
            </div>
        </>
        
    )
}