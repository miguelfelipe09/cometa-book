import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Book() {
    function closeModal() {
        let modal = document.getElementById('myModal')
        modal.style = 'display: none;'
    }
    
    let [dados, setDados] = useState(null);
    let [search, setSearch] = useState("");
    let [erro, setErro] = useState(null);
    let [generos, setGeneros] = useState(null);
    let [gender, setGenderChoice] = useState(null);
    let [mensage, setMensagem] = useState(null);
  
    function searchFunction() {
      let search = document.querySelector('.search').value
      setSearch(search)
      console.log(search)
    }
    
    function searchByGender() {
        let genders = document.getElementById('genders').value
        setGenderChoice(parseInt(genders))
        
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
            if(search == "" && gender == 0) {
                const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/api/allBooks');
                    setDados(response.data);

                    if (response.data.length === 0) {
                        setMensagem("Não há livros cadastrados no momento!");
                    } else {
                        setMensagem(""); // Limpa a mensagem se houver dados
                    }
                } catch (error) {
                    setErro(error.message);
                }
                };
            
                fetchData();
            }
            else if (search != "" ){
                console.log('2')
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`http://localhost:3000/api/searchBooks/${search}`);
                        setDados(response.data);

                        if (response.data.length === 0) {
                            setMensagem("Não há livros cadastrados no momento!");
                        } else {
                            setMensagem(""); // Limpa a mensagem se houver dados
                        }
                    } catch (error) {
                        setErro(error.message);
                    }
                    };
                
                    fetchData();
            }

            else if(gender != null && gender != 0) {
                console.log('3')
                console.log(gender)
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`http://localhost:3000/api/searchByGender/${gender}`);
                        setDados(response.data);

                        if (response.data.length === 0) {
                            setMensagem("Não há livros cadastrados no momento!");
                        } else {
                            setMensagem(""); // Limpa a mensagem se houver dados
                        }
                    } catch (error) {
                        setErro(error.message);
                    }
                    };
                
                    fetchData();
            }
            else if (gender == 0 || gender == null) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get('http://localhost:3000/api/allBooks');
                        setDados(response.data);

                        if (response.data.length === 0) {
                            setMensagem("Não há livros cadastrados no momento!");
                        } else {
                            setMensagem(""); // Limpa a mensagem se houver dados
                        }
                    } catch (error) {
                        setErro(error.message);
                    }
                    };
                
                    fetchData();
            }
            
    }, [search,gender]);

  if (erro) {
    return <div>Erro ao carregar os dados: {erro}</div>;
  }

  if (!dados) {
    return <div>Carregando...</div>;
  }

  let books = []

    dados.forEach(element => {
        books.push(
            <div key={element.id} className="book">
                <img src={element.image} alt="" className="book-image" onClick={constructModal}/>
                <div className="eye"><img src="../images/olho.png" alt="" className="eye-image" onClick={constructModal}/></div>
            </div>
        )
        function constructModal() {
            let image = document.getElementById('img')
            let name = document.getElementById('name')
            let author = document.getElementById('author')
            let synopsis = document.getElementById('synopsis')
            let modal = document.getElementById('myModal')
            let gender = document.getElementById('gender')
            let numberPages = document.getElementById('number-pages')
            let imgAvailable = document.getElementById('available-status')
            image.src = element.image
            name.innerText = element.title
            author.innerText = element.author
            synopsis.innerText = element.synopisis
            gender.innerText = element.namegender
            numberPages.innerText = element.numberpages
            modal.style = 'display: flex;'

            if(element.isavailable) {
                imgAvailable.src = '../images/checked.png'
            }
            else {
                imgAvailable.src = '../images/botao-x.png'
            }
        }
    })

  return (
    <>
        
        <div id="myModal" className="modal">
            <div className="modal-content">
                <div className="modal-image-book">
                    <img src="" alt="" id="img"/>
                    <div id="available-status-container">
                        <img src="" alt="" id="available-status" />
                    </div>
                    
                </div>
                <div className="modal-info-book">
                    <h2 className="teste1" id="name"></h2>
                    <h3 id="author"></h3>
                    <div className='synopsis-content'>
                        <div id="synopsis"></div>
                    </div>
                    <div className="teste">
                        <p id="gender"></p>
                        <p id="number-pages"></p>
                    </div>
                </div>
                <span className="close" onClick={closeModal}>&times;</span>
            </div>
          </div>
          <div className="search-container">
            <div className="flex">
                <input type="text" className="search" placeholder="Pesquisa" />
                <div className="search-icon" onClick={searchFunction}><img src="../images/lupa.png" alt="" /></div>
            </div>
            <select name="genders" id="genders" className="select-gender" onChange={searchByGender}>
                <option value="0">Todos</option>
                {generos.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="book-container">
            {books}
        </div>
        <div className='mensage'>
            {mensage}
        </div>
    </>
    
    
  );
}

export default Book;