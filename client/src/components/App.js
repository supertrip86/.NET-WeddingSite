import "./App.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Spouses from "./Spouses/Spouses";
import Counter from "./Counter/Counter";
import OurStory from './OurStory/OurStory';
import Gallery from "./Gallery/Gallery";
import WhenWhere from "./WhenWhere/WhenWhere";
import RSVP from "./RSVP/RSVP";
import Footer from './Footer/Footer';
import Gifts from "./Gifts/Gifts";
import Questions from "./Questions/Questions";

const App = () => {

    const couple = {
        bride: "Noelle",
        brideSurname: "Turtur",
        groom: "Giovanni",
        groomSurname: "Giunta"
    };

    const location = {
        country: "Italy",
        city: "Rome",
        area: "Appia Antica",
        name: "Villa Rosantica",
        address: "Via Appia Antica 288",
        menus: ["Vegetarian", "Vegan", "Gluten Free", "Normal (Fish)"],
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
        city: "Rome",
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
        name: "Hotel Favoloso",
        city: "Rome",
        address: "Via Qualunque 99",
        distance: "15 minutes from the Venue (car)",
        position: {
            lat: 41.853549,
            lng: 12.468731
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
                <Questions location={location} />
                <OurStory />
                <Gallery />
                <Gifts />
                <Footer couple={couple} location={location} />
            </div>
        </div>
    );
}

export default App;