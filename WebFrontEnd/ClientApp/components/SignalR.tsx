import * as React from 'react';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';


interface IChatState {
    bookingHubConnection: HubConnection | null, 
    bookingMessages: string[],
    message: string,
}

export class SignalRChat extends React.Component<{},IChatState> {


    constructor() {
        super();
        this.state = { bookingHubConnection: null, bookingMessages: [], message: ''};
    }

    componentDidMount() {
        const bookingHubConnection = new HubConnectionBuilder().withUrl('http://localhost:5001/chat').build();
        

        this.setState({ bookingHubConnection }, () => {
            this.state.bookingHubConnection!.start()
                .then(() => console.log('SignalR Started'))
                .catch(err => console.log('Error connecting SignalR - ' + err));

           
        });
        bookingHubConnection.on("ReceiveMessage", (message, a) => {
            const bookingMessages = this.state.bookingMessages;
            bookingMessages.push(a);
            this.setState({ bookingMessages });
        });

    }

    sendMessage = () => {
        this.state.bookingHubConnection!
            .invoke('SendMessage', 'test', this.state.message)
            .catch(err => console.error(err));

        this.setState({ message: '' });
    };

    render() {
        return <div className="container">
            <ul className="list-group">
                {this.state.bookingMessages.map(bm => <li className="list-group-item">{bm}</li>)}
            </ul>
                   <input
                       type="text"
                       value={this.state.message}
                       onChange={e => this.setState({ message: e.target.value })}
                    />
                   <button onClick={this.sendMessage}>Send</button>
               </div>
    }
}