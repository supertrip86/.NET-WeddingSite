const Questions = ({ location }) => {
    return (
        <div id='questions' className='section-padding'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 mb-30'>
                        <span className='wedding-title-meta'>Questions and Answers</span>
                    </div>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: When and where will the ceremony and reception be?</h4>
                    <p>
                        A: The ceremony and reception will be held at the same location - Villa Rosantica on the Appia
                        Antica. Weather allowing, we will spend the day in the garden.
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: When should I book my flight and hotel?</h4>
                    <p>
                        A: Flights and hotel prices can be unpredictable. However, we suggest booking your flights
                        and accommodations as soon as possible. It can also be difficult to book hotels in Rome in
                        the summer as the city fills up.
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: Can I bring my children?</h4>
                    <p>
                        A: Of course! Everyone is welcome. Please let us know if you are bringing children so we
                        can make arrangements.
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: How can I get to the venue?</h4>
                    <p>
                        A: The venue can easily be reached by taxi from anywhere in Rome. It should take between 25
                        and 30 minutes to arrive from the city center. The exact address is:
                    </p>
                    <p className='font-italic'>{location.address}, {location.city}</p>
                    <p>
                        If you want to share a taxi with someone and
                        don't know who, please let us know and we will help.
                        You can download the “Chiama Taxi Utente App” of Roma Capitale or dial 060609 .
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: How should I dress?</h4>
                    <p>
                        A: We want all of our guests to be comfortable. Given the weather and the location, we
                        suggest guests wear lightweight breathable fabrics and shoes that will be comfortable on
                        grass. We suggest guests follow a “summer chic” dress code, such as long loose dresses or
                        pants for women and lightweight pants and linen jackets for men.
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: What will the menu be?</h4>
                    <p>
                        A: Guests can select their menu when they RSVP. Menus can be changed up until two weeks
                        before the wedding. The options are: vegetarian, vegan, gluten-free, and a fish menu.
                        Please indicate if you have any allergies or intolerances when you RSVP.
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: Will there be parking available at the venue?</h4>
                    <p>
                        A: Yes!
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: If anything changes, how will you let me know?</h4>
                    <p>
                        A: We will send our guests an email if anything changes.
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: What is the best way to reach you if I have any questions?</h4>
                    <p>
                        A: The best way to reach us is via email. Giovanni can be reached 
                        at <b><a href="mailto:gio.giunta.86@gmail.com">gio.giunta.86@gmail.com</a></b> and 
                        Noelle at <b><a href="mailto:nturtur@g.ucla.edu">nturtur@g.ucla.edu</a></b>.
                        In addition, we can both be reached via WhatsApp at the following numbers:
                    </p>
                    <p><b>Noelle</b>: +1 914 274 0779 (Whatsapp), +39 347 639 8038 (phone)</p>
                    <p><b>Giovanni</b>: +39 345 528 0842 (whatsapp and phone)</p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: What is the best way to reach Rome from the US?</h4>
                    <p>
                        A: There are direct flights from most U.S. cities to Rome Fiumicino Airport
                        (FCO). However, direct flights can be quite expensive. In our experience,
                        it costs less to fly via Dublin on Aerlingus or via Lisbon via Tap.
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: Where should I stay in Rome?</h4>
                    <p>
                        A: You should stay wherever works for your budget and plan.
                        Giovanni and I have a few places we can suggest, but we're happy to work with you
                        to make sure you find an accommodation that meets your needs.
                        In general, the neighborhoods close to - but outside - the city center are Testaccio,
                        San Saba/Aventino, Termini, the Vatican, and Flaminio.
                        If you plan on taking public transit, we suggest being somewhere close to the
                        metro-A or metro-B.
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: What should I bring with me?</h4>
                    <p>
                        A: Italy can be very hot in late-June and early-July.
                        People also walk a lot. We suggest bringing comfortable shoes and lightweight
                        clothing that protects you from the sun and mosquitos. Sunglasses are a must.
                        If you plan on visiting churches, please note that many churches require women to
                        have their shoulders covered (no tank tops) and their legs modestly covered (no shorts).
                        You can bring a light-weight scarf to cover your shoulders or legs.
                        Occasionally, churches also require men to wear long pants.
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: What should I see and do while in Rome?</h4>
                    <p>
                        A: There is too much to do! Most of the famous attractions like the Vatican Museums
                        and the Colosseum can - and actually, must - be booked online in advance.
                        But there are plenty of things to see at the spur of a moment: the Giardino degli Aranci,
                        the Pantheon, the Fontana di Trevi, Piazza Navona, Campo de' Fiori, the view of the
                        Roman Forum from the Campidoglio, the Pincio...
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: And if I want to get out of the city, what can I do in the surrounding area?</h4>
                    <p>
                        A: If you're staying in Rome and want to get out of the city for a day, you can
                        take the train from Termini or Tiburtina to Tivoli to see Hadrian's Villa
                        (Villa Adriana), Parco Villa Gregoriana, and Villa d'Este. If you want to go to the beach,
                        you can take the train from Piramide or EUR Magliana to Ostia (Stella Polare or Centro).
                        Or you can take a stop at the old roman port, Ostia Antica. If you have a car, there are
                        a few places further afield worth taking the time to see.
                        There is the incredible Monastery of Saint Benedict in Subiaco, which holds the only
                        portrait of Saint Francis of Assisi painted in his life.
                        For those interested in the Etruscans, check out Cerveteri and Tarquinia.
                        For those who want to go to the beach, we suggest a trip to Sperlonga.
                    </p>
                </div>
                <div className='col-md-12 mb-30'>
                    <h4>Q: If I plan to stay longer in Italy, what do you suggest?</h4>
                    <p>
                        A: Italy is a lovely country and there is so much to see. It all depends 
                        on your preferences. If you intend to travel, we suggest using the high speed 
                        trains operated by Trenitalia and Italotreno to visit the major cities, such 
                        as Florence and Naples. It's about 1.5 hours from Rome to Florence.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Questions