import "./App.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Spouses from "./Spouses/Spouses";
import OurStory from './OurStory/OurStory';
import Gallery from "./Gallery/Gallery";
import WhenWhere from "./WhenWhere/WhenWhere";
import RSVP from "./RSVP/RSVP";
import Footer from './Footer/Footer';
import Gifts from "./Gifts/Gifts";

const App = () => {

    const couple = {
        bride: "Noelle",
        brideSurname: "Turtur",
        groom: "Giovanni",
        groomSurname: "Giunta"
    };

    const location = {
        country: "Italia",
        city: "Roma",
        area: "Appia Antica",
        name: "Villa Rosantica",
        address: "Via Appia Antica 288",
        menus: ["Vegetariano", "Vegano", "Senza Glutine", "Normale (Pesce)"],
        weddingDate: "Jul 01, 2023 18:00:00",
        startingTime: "18:00pm",
        endingTime: "3:00am",
        position: {
            lat: 41.83272265800465,
            lng: 12.541994257117752
        }
    };

    const drinks = {
        name: "L'Oasi della Birra",
        city: "Roma",
        address: "Piazza Testaccio 39",
        drinksDate: "Jun 30, 2023 22:00:00",
        startingTime: "22:00pm",
        endingTime: "1:00am",
        position: {
            lat: 41.87974369485435,
            lng: 12.477476786325914
        }
    };

    const hotel = {
        name: "Tiber Rooms Testaccio",
        city: "Roma",
        address: "Via Amerigo Vespucci 34",
        distance: "25 minuti dalla location (macchina/taxi)",
        notes: `Abbiamo negoziato delle offerte presso questa struttura. 
                Contattateci se avete bisogno di aiuto per prenotazioni, 
                o contattate Chiara al +39 349 289 0832`,
        position: {
            lat: 41.880808178244344,
            lng: 12.474030726386609
        }
    };

    return (
        <div>
            <Sidebar couple={couple} location={location} />
            <div id="wedding-main">
                <Header couple={couple} location={location} />
                <Spouses couple={couple} location={location} />
                <WhenWhere drinks={drinks} location={location} hotel={hotel} />
                <RSVP menus={location.menus} />
                <OurStory />
                <Gallery />
                <Gifts />
                <Footer couple={couple} location={location} />
            </div>
        </div>
    );
}

export default App;