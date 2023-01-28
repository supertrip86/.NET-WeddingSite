import './OurStory.css';
import storyImage from '../../assets/images/OurStory/story.jpg';

const OurStory = () => {
    return (
        <div id='story' className='story section-padding'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-5 mb-30'>
                        <div className='story-img animate-box'>
                            <div className='img'>
                                <img src={storyImage} className='img-fluid' alt='' />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7 animate-box'>
                        <h4 className='wedding-story-subtitle'>La Nostra Storia</h4>
                        <h3 className='wedding-story-title'>In poche parole (di Noelle Turtur)</h3>
                        <p>
                            Giovanni e Noelle si sono conosciuti a Piazza Testaccio, a Roma, 
                            nell'autunno 2018. Poco tempo dopo, Noelle si è rotta un dito giocando 
                            a calcio gaelico e Giovanni l'ha soccorsa portandola in ospedale, tenendole 
                            compagnia e spiegando tutto ad una americana appena arrivata in Italia!
                        </p>
                        <p>
                            Seguirono molte avventure. Giovanni la portò a vedere mille bellissimi posti a Roma 
                            ed in giro per il Lazio. Nel frattempo, scoprivano sempre più interessi in comune:
                            siti archeologici, escursioni, canuzzi, giochi da tavolo e diversi tipi di formaggio. 
                            Insieme, hanno viaggiato in tutta Italia, in Libano, in Etiopia e negli Stati Uniti.
                        </p>
                        <p>
                            Quando Noelle si è ammalata di Covid nel marzo 2020, Giovanni ha fatto tutto il possibile 
                            per soccorrerla e rimetterla in sesto. La sua famiglia è stata così gentile da fornire 
                            tutto il supporto possibile!
                        </p>
                        <p>
                            Nel 2022 si trasferiscono a Nicolosi, in Sicilia, dove zii, cugini, un jack russell e nuovi 
                            amici hanno rallegrato le loro giornate. Nella primavera del 2022, Noelle dovette tornare a 
                            New York per conseguire il proprio dottorato alla Columbia University. 
                            Giovanni, però, aveva dei progetti per il suo ritorno!
                        </p>
                        <h4>Ad agosto, in cima al Colle di Nivolet, Giovanni le ha chiesto di sposarlo!</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStory
