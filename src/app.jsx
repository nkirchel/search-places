import React from "react";
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

import "./assets/css/app.css";
import Geocode from "react-geocode";

const mapStyles = {
    height: "100vh",
    width: "100%",
};

Geocode.setApiKey(process.env['GOOGLE_MAP_API_TOKEN']);
Geocode.setLanguage("en");
Geocode.setRegion("in");
//Geocode.enableDebug();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                lat: 20.5937,
                lng: 78.9629,
            },
            address: "",
            search: "",
            viewInfo: false,
            copied: false
        };
    }
    handleChange = (search) => {
        this.setState({ location: this.state.location, search: search });
    };

    handleSelect = (newAddress) => {
        this.setState({ location: this.state.location, search: newAddress });
        geocodeByAddress(newAddress)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                this.setState({ location: latLng, address: this.state.address });
                this.getAddress();
            })
            .catch((error) => console.error("Error", error));
    };

    getAddress = () => {
        Geocode.fromLatLng(this.state.location.lat, this.state.location.lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                this.setState({ ...this.state, address: address, copied: false });
            },
            (error) => {
                console.error(error);
            },
        );
    };

    onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        this.setState({ location: { lat, lng }, copied: false });
        this.getAddress();
    };

    componentDidMount() {
        if (!navigator.geolocation) {
            alert("Please allow to track your location");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    markers: [
                        {
                            text: "Current Location",
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    ],
                });

                this.getAddress();
            },
            (error) => {
                alert(JSON.stringify(error));
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
            },
        );
    }
    render() {
        return (
            <>
                <LoadScript googleMapsApiKey={process.env['GOOGLE_MAP_API_TOKEN'] + '&libraries=places'}>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={16}
                        center={this.state.location}
                    >
                        <Marker
                            onClick={() => this.setState({ ...this.state, viewInfo: true })}
                            position={this.state.location}
                            draggable={true}
                            onDragEnd={(e) => this.onMarkerDragEnd(e)}
                        />
                        {this.state.viewInfo ? (
                            <InfoWindow
                                position={this.state.location}
                                onCloseClick={() =>
                                    this.setState({ ...this.state, viewInfo: false })
                                }
                            >
                                <p>{this.state.address}</p>
                            </InfoWindow>
                        ) : (
                            ""
                        )}
                    </GoogleMap>
                    <PlacesAutocomplete
                        value={this.state.search}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                        }) => (
                            <div className='app_input'>
                                <input
                                    {...getInputProps({
                                        placeholder: "Search Places ...",
                                        className: "location-search-input",
                                    })}
                                />
                                <div className='autocomplete-dropdown-container'>
                                    {loading && (
                                        <div style={{ fontSize: "bold", textAlign: "center" }}>
                                            Loading...
                                        </div>
                                    )}
                                    {suggestions.map((suggestion, index) => {
                                        const className = suggestion.active
                                            ? "suggestion-active"
                                            : "suggestion-item";
                                        const style = suggestion.active
                                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                                        return (
                                            <div
                                                key={index}
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                    <div className='app_address'>
                        {this.state.address.length === 0
                            ? "This Site request a location Access, enable it to get your current Location"
                            : this.state.address}

                        <div
                            className='app_copy'
                            onClick={() => {
                                navigator.clipboard.writeText(this.state.address);
                                this.setState({ ...this.state, copied: true });
                            }}
                        >
                            {this.state.copied
                                ? "Address Copied to Clipboard"
                                : "click here to copy"}
                        </div>
                    </div>
                </LoadScript>
            </>
        );
    }
}

export default App;
