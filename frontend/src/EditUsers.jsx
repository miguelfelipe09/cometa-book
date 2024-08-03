
import React, { useState, useEffect } from 'react';
import { Header } from "./Header"
import { LateralMenu } from "./LateralMenu"
import axios from 'axios';

export function EditUsers() {

    const deleteFunction = async () => {
        let idBook = document.getElementById('idBook').value
        console.log(idBook)
        try {
            const response = await axios.delete(`http://localhost:3000/api/deleteUsers/${idBook}`);
            
            location.reload()
        } catch (error) {
        }
      }

    function closeModal() {
        let modal = document.getElementById('myModal')

        modal.style = 'display: none;'
    }


    
  let [dados, setDados] = useState(null);
  let [search, setSearch] = useState("");
  let [erro, setErro] = useState(null);

  function searchFunction() {
    const search = document.querySelector('.search-book').value
    setSearch(search)
  }
        
        useEffect(() => {
            if(search == "") {
                const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/api/allUsers');
                    setDados(response.data);
                } catch (error) {
                    setErro(error.message);
                }
                };
            
                fetchData();
            } else {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`http://localhost:3000/api/searchUsers/${search}`);
                        setDados(response.data);
                    } catch (error) {
                        setErro(error.message);
                    }
                    };
                
                    fetchData();
            }

        }, [search]);

    const updateUsers = async () => {

        let userName = document.getElementById('userName')
        let pass = document.getElementById('pass')
        let type = document.querySelector('.select-available')
        let id = document.getElementById('idBook')

        try {
            const response = await axios({
                method: 'put',
                url: 'http://localhost:3000/api/updateUsers',
                data: {
                    id: id.value,
                    userName: userName.value,
                    pass: pass.value,
                    type: type.value,
                    
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

const addBooks = async () => {
    let bookName = document.querySelector('.book-name-input')
    let bookAuthor = document.querySelector('.author-name-input')
    let image = document.querySelector('.imageFile')
    let numberPages = document.querySelector('.number-pages-input')
    let available = document.querySelector('.select-available')
    let synopsis = document.querySelector('#synopsis-input')
    let gender = document.querySelector('.select-gender')

try {
    const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/addBooks',
        data: {
            namebook: bookName.value,
            idgender: gender.value,
            authorname: bookAuthor.value,
            numberpages: numberPages.value,
            synopsis: synopsis.value,
            image: image.src,
            isavailable: available.value
        }
    });

} catch (error) {
    console.error(error);
}
};

  if (erro) {
    return <div>Erro ao carregar os dados: {erro}</div>;
  }

  if (!dados) {
    return <div>Não há livros cadastrados</div>
  }

  let books = []

  dados.forEach(element => {
    books.push(
        <>  
            <div className="id-book-container item-table">{element.id}</div>
            <div className="name-book-container item-table">{element.firstname}</div>
            <div className="author-book-container item-table">{element.password}</div>
            <div className="available-book-container item-table">{element.idtypeuser == 1 ? <><div className="color"><p>Administrador</p></div></> : <><div className="color">Usuário</div></>}</div>
            <div className="item-table actions">
                <img src="../images/delete.png" alt="" onClick={openModalConfirmExclude}/>
                <img src="../images/edit.png" alt="" onClick={constructModal}/>
            </div>  
                   
        </>
    )
    
    function openModalConfirmExclude() {
        let modal = document.getElementById('modal-confirm-exclude')
        let id = document.getElementById('idBook')
        id.value = element.id
        modal.style = 'display: flex;'

        console.log(id.value)
    }
    function constructModal() {
        let modal = document.getElementById('myModal')
        let id = document.getElementById('idBook')
        modal.style = 'display: flex;'

        id.value = element.id
        let userName = document.getElementById('userName')
        let pass = document.getElementById('pass')
        let type = document.querySelector('.select-available')
        userName.value = element.firstname
        pass.value = element.password
        type.value = element.idtypeuser

        console.log(id.value)
    }
})

    return (
        <>
            <div id="modal-confirm-exclude" className="modal">
                <div className="modal-content modal-exclude">
                    <input type="text" id='id-book'/>
                    <p>Tem certeza que deseja excluir esse livro?</p>
                    <div>
                        <button type='submit' className='confirmExclude' onClick={deleteFunction}>SIM</button>
                        <button className='noExclude'>NÃO</button>
                    </div>
                </div>
            </div>
            <div id="myModal" className="modal">
                <div className="modal-content modal-user">
                    <form action="">
                    <div className="edit-user">
                        <div className="userName input-container">
                            <input type="text" placeholder="Nome" id="userName"/>
                        </div>
                        <div className="password input-container">
                            <input type="password" placeholder="Senha" id="pass"/>
                        </div>
                        <select name="available" id="available" className="select-available">
                            <option value="1">Administrador</option>
                            <option value="2">Usuario</option>
                        </select>
                        <input type="text" id='idBook'/>
                        <div className="button">
                            <button className="button-submit" onClick={updateUsers}>Enviar</button>
                        </div>
                    </div>
                    </form>
                    <span className="close" onClick={closeModal}>&times;</span>
                </div>
            </div>

            <div className="div">
                <div>
                    <LateralMenu/>
                </div>
                <div className="books">
                    <Header/>
                    <div className="title">
                        <h1>Gerenciar Usuários</h1>
                        
                    </div>
                    <hr />
                    <div className="search-content">
                        <input type="text" className="search-book" placeholder="Pesquisar" onKeyUp={() => {searchFunction()}}/>
                    </div>
                    <div className="table-users">
                        <div className="id-book-container item-table">#</div>
                        <div className="name-book-container item-table">Nome</div>
                        <div className="author-book-container item-table">Senha</div>
                        <div className="gender-book-container item-table">Admin?</div>
                        <div className="item-table">Ações</div>
                        {books}
                    </div>
                </div>
            </div> 
            
        </>
        
    )
}

export default EditUsers;