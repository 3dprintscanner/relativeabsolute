/// <reference path="../../node_modules/@types/googlemaps/index.d.ts"/>


import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

import { MapHoc } from "./MapHoc";
import { DistanceTable } from './DistanceTable';
import { SignalRChat } from './SignalR';

interface MeetState {
    meetResponse: MeetLocationResponse;
    loaded: boolean,
}

interface MeetLocationResponse {
    userId: string,
    currentLocation: ComputedLocation,
    targetLocations: UserLocation[],

}

export interface UserLocation {
    userId: string, 
    latestUserLocation: ComputedLocation,
    updateTime: string,
}

export interface ComputedLocation {
    latitude: number,
    longitude: number,
    altitude?: number,
    accuracy?: number,
}

export class MapMeet extends React.Component<RouteComponentProps<{}>, MeetState> {
    constructor() {
        super();
        this.state = {
            meetResponse: {
                userId: '',
                currentLocation: { latitude: 51.1, longitude: 0 },
                targetLocations: []
            },
            loaded: false
        };
    }

    public render() {

        let contents = !this.state.loaded
            ? <p><em>Loading...</em></p>
            : <MapHoc locations={this.state.meetResponse.targetLocations} userlocation={this.state.meetResponse.currentLocation} />;

        let valuesTable = !this.state.loaded
            ? <p><em>Loading Values..</em></p>
            : <DistanceTable locations={this.state.meetResponse.targetLocations} userlocation={this.state.meetResponse
                .currentLocation}/>;

        return <div>
            <h1>Person Tracker</h1>

            <button onClick={() => {
                console.log("button clicked");
                this.incrementCounter();
            }}>LoadNearby</button>
            <div className="row">
                {contents}
            </div>
            <div className="row">
                {valuesTable}
            </div>
            <div className="row">
                <SignalRChat/>
            </div>
    </div>;
}

    incrementCounter() {
        fetch('api/Locations/DummyMeetLocations')
            .then(response => response.json() as Promise<MeetLocationResponse>)
            .then(data => {
                this.setState({ meetResponse: data, loaded: true});
            });
    }

    private static renderLocations(locations: MeetLocationResponse) {
        return <table className='table'>
                   <thead>
                   <tr>
                       <th>Date</th>
                       <th>Temp. (C)</th>
                   </tr>
                   </thead>
                   <tbody>
                   {locations.targetLocations.map(loc =>
                       <tr key={loc.userId}>
                           <td>{loc.latestUserLocation.latitude}</td>
                           <td>{loc.latestUserLocation.longitude}</td>
                       </tr>
                   )}
                   </tbody>
               </table>;
    }
}
