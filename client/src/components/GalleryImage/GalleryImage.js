import './GalleryImage.css';
import { motion } from 'framer-motion';

const GalleryImage = ({ path, label }) => {
    return (
        <motion.div
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='img-zoom'>
                <div className='gallery-box'>
                    <div className='gallery-img'>
                        <img
                            src={path}
                            className='img-fluid mx-auto d-block'
                            alt={label}
                        />
                    </div>
                    <div className='gallery-detail'>
                        <h4 className='mb-0'>{label}</h4>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default GalleryImage;