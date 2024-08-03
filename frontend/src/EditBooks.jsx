
import React, { useState, useEffect } from 'react';
import { Header } from "./Header"
import { LateralMenu } from "./LateralMenu"
import axios from 'axios';

export function EditBooks() {

    const deleteFunction = async () => {
        let idBook = document.getElementById('id-book').value
        try {
            const response = await axios.delete(`http://localhost:3000/api/deleteBooks/${idBook}`);
            
            location.reload()
        } catch (error) {
        }
      }

    function file() {
        const inputFile = document.querySelector('#picture-input')
        const pictureImage = document.querySelector('.picture-image-span')

        inputFile.addEventListener('change', function(ev) {
            const inputTarget = ev.target
            const file = inputTarget.files[0]

            if (file) {
                const reader = new FileReader();

                reader.addEventListener('load', function(ev) {
                    const readerTarget = ev.target
                    const img = document.querySelector('.imageFile')
                    img.src = readerTarget.result
                })
                reader.readAsDataURL(file)
            }
            else {
                pictureImage.innerText = 'Choose an Image'
            }
        })
    }

    function closeModal() {
        let modal = document.getElementById('myModal')

        modal.style = 'display: none;'
    }

    function closeModalExclude() {
        let modal = document.getElementById('modal-confirm-exclude')

        modal.style = 'display: none;'
    }

    function openModal() {
        let modal = document.getElementById('myModal')
        modal.style = 'display: flex;'
        let buttonEdit = document.querySelector('.button-edit')
        let buttonRegister = document.querySelector('.button-register')
        document.querySelector('.book-name-input').value = ""
        document.querySelector('.author-name-input').value = ""
        document.querySelector('.imageFile').src = ""
        document.querySelector('.number-pages-input').value = ""
        document.querySelector('#synopsis-input').value = ""
        document.querySelector('.select-gender').value = "0"
        buttonEdit.style = 'display: none;'
        buttonRegister.style = 'display: block;'

    }
    
  let [dados, setDados] = useState(null);
  let [search, setSearch] = useState("");
  let [generos, setGeneros] = useState([""]);
  let [erro, setErro] = useState(null);

  function searchFunction() {
    const search = document.querySelector('.search-book').value
    setSearch(search)
  }
        
        useEffect(() => {
            const gendersData = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/api/genders');
                    setGeneros(response.data);
                } catch (error) {
                    setErro(error.message);
                }
            };

            gendersData();

            if(search == "") {
                const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/api/allBooks');
                    setDados(response.data);
                } catch (error) {
                    setErro(error.message);
                }
                };
            
                fetchData();
            } else {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`http://localhost:3000/api/searchBooks/${search}`);
                        setDados(response.data);
                    } catch (error) {
                        setErro(error.message);
                    }
                    };
                
                    fetchData();
            }

        }, [search]);

  

    const updateBooks = async () => {
        let bookName = document.querySelector('.book-name-input')
        let bookAuthor = document.querySelector('.author-name-input')
        let image = document.querySelector('.imageFile')
        let numberPages = document.querySelector('.number-pages-input')
        let available = document.querySelector('.select-available')
        let synopsis = document.querySelector('#synopsis-input')
        let id = document.getElementById('idBook')
        let gender = document.querySelector('.select-gender')

        try {
            const response = await axios({
                method: 'put',
                url: 'http://localhost:3000/api/updateBooks',
                data: {
                    id: id.value,
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
            <div className="name-book-container item-table">{element.title}</div>
            <div className="author-book-container item-table">{element.author}</div>
            <div className="gender-book-container item-table">{element.namegender}</div>
            <div className="pages-book-container item-table">{element.numberpages}</div>
            <div className="available-book-container item-table">{element.isavailable ? <><div className="available"><p>Disponível</p></div></> : <><div className="inavailable">Indisponível</div></>}</div>
            <div className="item-table actions">
                <img src="../images/delete.png" alt="" onClick={openModalConfirmExclude}/>
                <img src="../images/edit.png" alt="" onClick={constructModal}/>
            </div>  
                   
        </>
    )
    
    function openModalConfirmExclude() {
        let idBook = document.getElementById('id-book')
        idBook.value = element.id
        let modal = document.getElementById('modal-confirm-exclude')
        modal.style = 'display: flex;'

    }

    

    function constructModal() {
        let modal = document.getElementById('myModal')
        modal.style = 'display: flex;'

        let buttonEdit = document.querySelector('.button-edit')
        let buttonRegister = document.querySelector('.button-register')
        buttonEdit.style = 'display: block;'
        buttonRegister.style = 'display: none;'

        let bookName = document.querySelector('.book-name-input')
        let bookAuthor = document.querySelector('.author-name-input')
        let image = document.querySelector('.imageFile')
        let numberPages = document.querySelector('.number-pages-input')
        let synopsis = document.getElementById('synopsis-input')
        let id = document.getElementById('idBook')
        let available = document.querySelector('.select-available')
        let idgender = document.querySelector('.select-gender')

        bookName.value = element.title
        bookAuthor.value = element.author
        numberPages.value = element.numberpages
        image.src = element.image
        synopsis.value = element.synopisis
        id.value = element.id
        available.value = element.isavailable
        idgender.value = element.idgender
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
                <div className="modal-content modal-edit">
                    <form action="">
                        <div className="register-container-book">
                            <label htmlFor="picture-input" className="picture">
                                <span className="picture-image-span picture-image"><img src="" alt="" className="picture-image imageFile" /></span>
                            </label>
                            <input type="file" id="picture-input" onClick={file}/>
                            <div className="register-book-container">
                                <div className="book-name input-container">
                                    <p>Nome:</p>
                                    <input type="text" id='teste' className="book-name-input"/>
                                </div>
                                <div className="author-name input-container">
                                    <p>Autor:</p>
                                    <input type="text" className="author-name-input"/>
                                </div>
                                <div className="gender input-container">
                                    <p>Gênero:</p>
                                    <select name="genders" id="genders" className="select-gender">
                                        {generos.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="number-pages input-container">
                                    <p>Páginas:</p>
                                    <input type="text" className="number-pages-input"/>
                                </div>
                                <div className="book-available input-container">
                                    <p>Disponível?</p>
                                
                                    <select name="available" id="available" className="select-available">
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                </div>
                                <div className="book-synopsis input-container">
                                    <p>Sinopse:</p>
                                    <textarea name="" id="synopsis-input" cols="30" rows="10"></textarea>
                                </div>
                                <input type="text" hidden id='idBook'/>
                                <div className="button">
                                    <button type="submit" className="button-edit button-submit" onClick={() => {updateBooks()}}>ENVIAR</button>
                                    <button type="submit" className="button-register button-submit" onClick={() => {addBooks()}}>ENVIAR</button>
                                </div>
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
                        <h1>Gerenciar Livros</h1>
                        <button className='addBooks' onClick={openModal}>Adicionar</button>
                    </div>
                    <hr />
                    <div className="search-content">
                        <input type="text" className="search-book" placeholder="Pesquisar" onKeyUp={() => {searchFunction()}}/>
                    </div>
                    <div className="table-books">
                        <div className="id-book-container item-table">#</div>
                        <div className="name-book-container item-table">Nome</div>
                        <div className="author-book-container item-table">Autor</div>
                        <div className="gender-book-container item-table">Gênero</div>
                        <div className="pages-book-container item-table">Páginas</div>
                        <div className="available-book-container item-table">Disponível?</div>
                        <div className="item-table">Ações</div>
                        {books}
                    </div>
                </div>
            </div> 
            
        </>
        
    )
}

export default EditBooks;