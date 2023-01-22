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
                        <h4 className='wedding-story-subtitle'>Our Story</h4>
                        <h3 className='wedding-story-title'>In a few words...</h3>
                        <p>
                            Giovanni and Noelle met in Piazza Testaccio, Rome, in fall 2018. 
                            Shortly thereafter, Noelle broke her finger playing Gaelic football 
                            and Giovanni came to the rescue - taking her to the hospital, 
                            waiting with her, and explaining everything!
                        </p>
                        <p>
                            Many adventures followed! Giovanni took her to see all of the sights 
                            near and around Rome. They discovered a shared love of archeological 
                            sites, hiking, canuzzi (dogs), board games, and local cheeses. 
                            Together, they've traveled all over Italy, Lebanon, and Ethiopia.
                        </p>
                        <p>
                            When Noelle got Covid in March 2020, Giovanni diligently nursed her 
                            back to health and his family supplied them with everything they needed.
                        </p>
                        <p>

                        </p>
                        <p>
                            In 2022, they moved to Giovanni's family home in Nicolosi, Sicily, 
                            where Giovanni's aunt, uncle, cousins, and their jack russell kept 
                            them in good cheer and company. In spring 2022, Noelle had to return 
                            to New York to graduate from Columbia… Giovanni, however, had plans for her return!
                        </p>
                        <h4>In August, on top of the Colle di Nivolet, Giovanni proposed!</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStory
