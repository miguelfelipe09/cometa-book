import { useEffect } from "react"

export function LateralMenu() {

    useEffect(() => {
        if(window.location.href == 'http://localhost:5173/') {
            console.log('home')
            document.querySelector('.home').classList.add('ativo')
        }
        else if(window.location.href == 'http://localhost:5173/edit-books') {
            console.log('edit')
            document.querySelector('.edit').classList.add('ativo')
        }
        else if(window.location.href == 'http://localhost:5173/edit-users') {
            console.log('')
            document.querySelector('.edit-us').classList.add('ativo')
        }
    }, []);

    if(window.location.href == 'http://localhost:5173/') {
        
    }
    function toggle(){
        var menuItem = document.querySelectorAll('.item-menu')
        function selectLink(){
            menuItem.forEach((item)=>
                item.classList.remove('ativo')
            )
            this.classList.add('ativo')
        }

        menuItem.forEach((item)=>
            item.addEventListener('click', selectLink)
        )

        var menuSide = document.querySelector('.menu-lateral')
        menuSide.classList.toggle('expandir')
    }
    function clear() {
        localStorage.clear();
    }
    return (
        <nav className="menu-lateral">

        <div className="btn-expandir">
            <img src="../images/cardapio.png" alt="" id="btn-exp" onClick={toggle}/>
        </div>
        <ul>
            <li className="item-menu home" >
                <a href="/home">
                    <span className="icon" ><img src="../images/casa.png" alt="" /></span>
                    <p className="txt-link">Home</p>
                </a>
            </li>
            {localStorage.getItem('id') == 1 ? (
                <li className="edit item-menu">
                <a href="/edit-books">
                    <span className="icon"><img src="../images/editar.png" alt="" /></span>
                    <p className="txt-link">Editar</p>
                </a>
            </li>
            ) : (
                <li></li>
            )}
            {localStorage.getItem('id') == 1 ? (
                <li className="edit-us item-menu">
                <a href="/edit-users">
                    <span className="icon"><img src="../images/edit-user.png" alt="" /></span>
                    <p className="txt-link">Editar</p>
                </a>
            </li>
            ) : (
                <li></li>
            )}
            <li className="item-menu">
                <a href="/" onClick={clear}>
                    <span className="icon"><img src="../images/sair.png" alt="" /></span>
                    <p className="txt-link">Sair</p>
                </a>
            </li>
        </ul>

    </nav>
    )
}