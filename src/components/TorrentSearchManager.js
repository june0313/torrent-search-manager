import React from 'react';
import BroadcastCreator from './BroadcastCreator';
import BroadcastTable from './BroadcastTable';
import update from 'react-addons-update';

class TorrentSearchManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            broadcastList: []
        }

        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    }

    componentWillMount() {
        const broadcastList = localStorage.broadcastList;
        if (broadcastList) {
            this.setState({
                broadcastList: JSON.parse(broadcastList)
            })
        }
    }

    componentDidUpdate(preProps, preState) {
        if (JSON.stringify(preState.broadcastList) !== JSON.stringify(this.state.broadcastList)) {
            localStorage.broadcastList = JSON.stringify(this.state.broadcastList);
        }
    }

    handleAddButtonClick(broadcast) {
        if (!broadcast.name || broadcast.name.length === 0) {
            return;
        }

        this.setState({
            broadcastList: this.state.broadcastList.concat(broadcast)
        });
    }

    handleRemoveButtonClick(index, event) {
        this.setState({
            broadcastList: update(this.state.broadcastList, { $splice: [[index, 1]] })
        });

        event.stopPropagation();
    }

    render() {
        return (
            <div className="container">
                <h4>TSM <small> Torrent search manager</small></h4>
                <hr/>
                <BroadcastCreator onCreate={this.handleAddButtonClick} />
                <BroadcastTable broadcastList={this.state.broadcastList} onRemove={this.handleRemoveButtonClick} />
            </div>
        );
    }
}

export default TorrentSearchManager;