/// <reference path="../../node_modules/@types/googlemaps/index.d.ts"/>
/// <reference path="../../node_modules/@types/markerclustererplus/index.d.ts"/>
/// <reference path="../../node_modules/@types/react-router/index.d.ts"/>
import * as React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { UserLocation, ComputedLocation} from './MapMeet';


interface IMapProps {
    locations: UserLocation[],
    userlocation: ComputedLocation,
}

interface IMapState {

}

export class MapHoc extends React.Component<IMapProps, IMapState> {

    constructor() {
        super();
        this.state = {};
    }

    //public render() {
    //    return
    //    <GoogleMap defaultZoom={8}
    //                      defaultCenter={{ lat: -34.397, lng: 150.644 }}/>
    //}

    public render() {

        const targetMarkers = this.props.locations.map(loc => <Marker position={{
            lat: loc.latestUserLocation.latitude,
            lng: loc.latestUserLocation.longitude
        }} />);
        const userMarker = <Marker position={{
            lat: this.props.userlocation.latitude,
            lng: this.props.userlocation.longitude
        }}/>;

        const allMarkers = targetMarkers.push(userMarker);
        console.log(allMarkers);
        console.log(userMarker);

        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 51.1, lng: -0.1 }}
            >
                {targetMarkers}
            </GoogleMap>
        ))

        return <MyMapComponent
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9KVQJ0iW4ltfEUG00HAcpwj8ay_GEDJ4&v=3.exp&libraries=geometry,drawing,places"
                   loadingElement={<div style={{ height: `100%` }} />}
                   containerElement={<div style={{ height: `400px` }} />}
                   mapElement={<div style={{ height: `100%` }} />}
               />
    }
}