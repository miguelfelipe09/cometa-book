import { Header } from "./Header.jsx"
import { Book } from "./Book.jsx"
import { LateralMenu } from "./LateralMenu.jsx"
export function MainPage() {

    return (
        <div className="div">
            <div>
                <LateralMenu/>
            </div>
            <div className="books">
                <Header/>
                <Book/>
            </div>
        </div> 
    )
}