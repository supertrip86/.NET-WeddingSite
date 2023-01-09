import './Gallery.css';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { galleryImages } from '../../assets/data/gallery';
import GalleryImage from '../GalleryImage/GalleryImage';
import FsLightbox from "fslightbox-react";

const Gallery = () => {
    const [filtered, setFiltered] = useState([]);
    const [activeFilter, setActiveFilter] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [currentImageIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!activeFilter) {
            setFiltered(galleryImages);
            return;
        }

        const filteredGallery = galleryImages.filter(image => image.filter.includes(activeFilter));

        setFiltered(filteredGallery);

    }, [activeFilter]);

    const showSlide = (index) => {
        setOpen(!isOpen);

        setCurrentIndex(index + 1);
    };

    return (
        <div id='gallery' className='section-padding'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 mb-30'>
                        <span className='wedding-title-meta'>Gallery</span>
                        <h2 className='wedding-title'>Our Memories</h2>
                    </div>
                </div>
                <div className="row">
                    <ul className="col list-unstyled list-inline mb-0 gallery-menu" id="gallery-filter">
                        <li onClick={() => setActiveFilter("")} className="list-inline-item"><span className={activeFilter === "" ? "active" : ""}>All</span></li>
                        <li onClick={() => setActiveFilter("ceremony")} className="list-inline-item"><span className={activeFilter === "ceremony" ? "active" : ""}>Ceremony</span></li>
                        <li onClick={() => setActiveFilter("party")} className="list-inline-item"><span className={activeFilter === "party" ? "active" : ""}>Party</span></li>
                    </ul>
                </div>
            </div>
            <div className='container'>
                <div className='row gallery-filter mt-3' key={filtered}>
                    <AnimatePresence>
                        {
                            filtered.map((image, index) => {
                                return (
                                    <div className='col-md-4 gallery-item' key={index} onClick={() => showSlide(index)}>
                                        <GalleryImage path={image.src} label={image.label} />
                                    </div>
                                )
                            })
                        }
                    </AnimatePresence>
                    <FsLightbox
                        toggler={isOpen}
                        slide={currentImageIndex}
                        sources={filtered.map(image => image.src)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Gallery