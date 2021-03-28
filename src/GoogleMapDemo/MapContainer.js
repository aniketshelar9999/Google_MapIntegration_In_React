import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// const locations = 
const mapStyles = {
    height: "100vh",
    width: "100%"
};

const defaultCenter = {
    lat: 22.98596571991664, lng: 72.43479279500757
}

class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: {},
            locations:
                [
                    {
                        "id": 1,
                        "name": "Individual Visit",
                        "location": {
                            "lat": 22.99501272282675,
                            "lng": 72.37565544775168
                        }
                    },
                    {
                        "id": 2,
                        "name": "Sample Distribution",
                        "location": {
                            "lat": 22.985689164122306,
                            "lng": 72.4350502817103
                        }
                    },
                    {
                        "id": 3,
                        "name": "Group Meeting",
                        "location": {
                            "lat": 22.988928778656888,
                            "lng": 72.49856499200955
                        }
                    },
                    {
                        "id": 4,
                        "name": "Sample To Sale",
                        "location": {
                            "lat": 23.011840906979955,
                            "lng": 72.51272705525486
                        }
                    }
                ]
        }
    }
    onSelect = item => {
        console.log("item", item);
        this.setState({ selected: item })
        // console.log("this.state.selected", this.state.selected);
        // setSelected(item);

    }
    getMakerImages(id) {
        switch (id) {
            case 1:
                return "http://maps.google.com/mapfiles/ms/icons/blue.png"
            case 2:
                return "http://maps.google.com/mapfiles/ms/micons/green.png"
            case 3:
                return "http://maps.google.com/mapfiles/ms/micons/red.png"
            case 4:
                return "http://maps.google.com/mapfiles/ms/micons/purple.png"

            default:
                break;
        }
    }
    emptyLocation() {
        this.setState({ selected: {} })
    }
    render() {
        const { locations, selected } = this.state;
        return (
            <LoadScript
                googleMapsApiKey='Your_A_Keypi'>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={defaultCenter}>
                    {
                        locations.map(item => {
                            return (
                                <Marker
                                    icon={this.getMakerImages(item.id)}
                                    key={item.name}
                                    position={item.location}
                                    onClick={() => this.onSelect(item)} />
                            )
                        })
                    }
                    {
                        selected.location &&
                        (
                            <InfoWindow
                                position={selected.location}
                                clickable={true}
                                onCloseClick={() => this.emptyLocation()}
                            >
                                <p>{selected.name}</p>
                            </InfoWindow>
                        )
                    }
                </GoogleMap>
            </LoadScript>
        )
    }
}


export default MapContainer