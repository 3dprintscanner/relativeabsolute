/// <reference path="../../node_modules/@types/googlemaps/index.d.ts"/>
/// <reference path="../../node_modules/@types/react/index.d.ts"/>

import * as React from 'react';
import { IMapProps, IMapState } from './MapHoc';
import { UserLocation, ComputedLocation } from './MapMeet';


export class DistanceTable extends React.Component<IMapProps, IMapState> {


    constructor() {
        super();
        this.state = {};
    }

    render() {
        const table = DistanceTable.renderForecastsTable(this.props.locations, this.props.userlocation);
        return table;
    }

    private static renderForecastsTable(locations: UserLocation[], currentLocation: ComputedLocation) {
        return <table className="table">
            <thead>
                <tr>
                    <th>FromLat</th>
                    <th>FromLng</th>
                    <th>ToLat</th>
                    <th>ToLng</th>
                    <th>Distance</th>
                    <th>Bearing</th>
                   </tr>
                   </thead>
                <tbody>
                    {locations.map(loc =>
                        <tr key={loc.userId}>
                            <td>{currentLocation.latitude}</td>
                            <td>{currentLocation.longitude}</td>
                            <td>{loc.latestUserLocation.latitude}</td>
                            <td>{loc.latestUserLocation.longitude}</td>
                            <td>{google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude), new google.maps.LatLng(loc.latestUserLocation.latitude, loc.latestUserLocation.longitude))}</td>
                            <td>{google.maps.geometry.spherical.computeHeading(new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude), new google.maps.LatLng(loc.latestUserLocation.latitude, loc.latestUserLocation.longitude))}</td>
                        </tr>
                    )}
                </tbody>
               </table>;
    }
}
