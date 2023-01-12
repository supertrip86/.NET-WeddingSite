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
        startingTime: "18:00pm",
        endingTime: "3:00am",
        position: {
            lat: 41.830788,
            lng: 12.544573
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

    const menus = ["Vegetarian", "Vegan", "Gluten Free", "Normal (Fish)"];

    const weddingDate = "Jul 01, 2023 18:00:00";

    return (
        <div>
            <Sidebar couple={couple} location={location} weddingDate={weddingDate} />
            <div id="wedding-main">
                <Header couple={couple} location={location} weddingDate={weddingDate} />
                <Spouses couple={couple} location={location} weddingDate={weddingDate} />
                <WhenWhere location={location} hotel={hotel} />
                <RSVP menus={menus} />
                <Counter targetDate={weddingDate} />
                <OurStory />
                <Gallery />
                <Gifts />
                <Footer couple={couple} location={location} weddingDate={weddingDate} />
            </div>
        </div>
    );
}

export default App;