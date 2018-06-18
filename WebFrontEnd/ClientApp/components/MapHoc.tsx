import * as React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"
import { UserLocation, ComputedLocation } from './MapMeet';

export interface IMapProps {
    locations: UserLocation[],
    userlocation: ComputedLocation,
}

export interface IMapState {

}

export class MapHoc extends React.Component<IMapProps, IMapState> {

    constructor() {
        super();
        this.state = {};
    }

    public render() {

        const markers = this.GetMarkers(this.props.locations, this.props.userlocation);

        const polylines = this.CreateDirectionPolyLines(this.props.locations, this.props.userlocation);

        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: 51.575389, lng: -1.314649 }}>
                {polylines}
            </GoogleMap>
        ));

        return <MyMapComponent
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9KVQJ0iW4ltfEUG00HAcpwj8ay_GEDJ4&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />} />;
    }

    private CreateDirectionPolyLines(locations: UserLocation[], currentLocation: ComputedLocation) : React.ReactElement<Polyline>[] {

        const polylines = locations.map(loc => <Polyline
            path={
                [
                    { lat: currentLocation.latitude, lng: currentLocation.longitude },
                    { lat: loc.latestUserLocation.latitude, lng: loc.latestUserLocation.longitude }
                ]
            }
            options={{
                strokeColor: '#ff2527',
                strokeWeight: 5,
                geodesic: true

            }} />);
        return polylines;

    }

    private GetMarkers (locations: UserLocation[], currentLocation: ComputedLocation) : React.ReactElement<Marker>[] {

        const targetMarkers = locations.map(loc => <Marker position={{
            lat: loc.latestUserLocation.latitude,
            lng: loc.latestUserLocation.longitude
        }} />).concat([
            <Marker position={{
                lat: currentLocation.latitude,
                lng: currentLocation.longitude
            }} />
        ]);

        return targetMarkers;

    }
}