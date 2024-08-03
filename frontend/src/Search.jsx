export function Search() {
    return (
        <div className="search-container">
            <div className="flex">
                <input type="text" className="search" placeholder="Pesquisa"/>
                <div className="search-icon"><img src="../images/lupa.png" alt="" /></div>
            </div>
        </div>
    )
}