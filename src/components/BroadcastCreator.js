import React from 'react';
import './BroadcastCreator.scss';

const emptyBroadcast = {
    name: '',
    day: '0'
}

export default class BroadcastCreator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            broadcast: emptyBroadcast
        }

        this.handleBroadcastNameChange = this.handleBroadcastNameChange.bind(this);
        this.handleBroadcastDayChange = this.handleBroadcastDayChange.bind(this);
        this.handleCreateBroadcast = this.handleCreateBroadcast.bind(this);
    }

    handleBroadcastNameChange(e) {
        const broadcast = {
            name: e.target.value,
            day: this.state.broadcast.day
        }

        this.setState({
            broadcast: broadcast
        });
    }

    handleBroadcastDayChange(e) {
        const broadcast = {
            name: this.state.broadcast.name,
            day: e.target.value
        }

        this.setState({
            broadcast: broadcast
        });
    }

    handleCreateBroadcast() {
        this.props.onCreate(this.state.broadcast);

        this.setState({
            broadcast: emptyBroadcast
        })
    }

    render() {
        return (
            <div>
                <form className="form-inline">
                    <div className="form-group">
                        <input className="form-control"
                            type="text"
                            placeholder="방송 이름"
                            name="broadcastName"
                            onChange={this.handleBroadcastNameChange}
                            value={this.state.broadcast.name} />
                    </div>

                    <div className="form-group">
                        <select className="form-control" name="date" onChange={this.handleBroadcastDayChange} value={this.state.broadcast.day}>
                            <option value="0">일요일</option>
                            <option value="1">월요일</option>
                            <option value="2">화요일</option>
                            <option value="3">수요일</option>
                            <option value="4">목요일</option>
                            <option value="5">금요일</option>
                            <option value="6">토요일</option>
                        </select>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={this.handleCreateBroadcast}>추가</button>
                </form>
            </div>
        );
    }
}