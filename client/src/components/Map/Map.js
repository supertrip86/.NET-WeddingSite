import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Map = ({ center }) => {
    const containerStyle = {
        width: '90vw',
        height: '60vh',
        margin: 'auto',
        borderRadius: '4px'
    };

    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAfJUsrGQCYeXg2UI8fAPhizt7FhCtF6dw"
    })

    return isLoaded ? (
        <div className='map-responsive'>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={defaultMapOptions}
            >
                <Marker position={center} />
            </GoogleMap>
        </div>
    ) : <></>
}

export default Map;