import React from 'react';

const GOOGLE_HOST = 'http://www.google.co.kr/#newwindow=1';

export default class BroadcastTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.makeUrl = this.makeUrl.bind(this);
    }

    makeUrl() {
        const queryValue = `${this.props.broadcast.name} ${this.props.recentBroadcastDate.format('YYMMDD')}`;
        const queryString = ['q', queryValue].map(each => encodeURIComponent(each)).join('=');
        return [GOOGLE_HOST, queryString].join('&');
    }

    handleSearch() {
        const url = this.makeUrl();
        chrome.tabs ? chrome.tabs.update({ url: url }) : window.open(url);
    }

    render() {
        return (
            <tr key={this.props.index}>
                <td>{this.props.index + 1}</td>
                <td>{this.props.broadcast.name}</td>
                <td>{this.props.recentBroadcastDate.locale('ko').format('dddd')}</td>
                <td>{this.props.recentBroadcastDate.format('YYYY-MM-DD')}</td>
                <td className="text-center">
                    <button className="btn btn-success btn-xs" onClick={this.handleSearch}>
                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                        <span> 검색</span>
                    </button>
                </td>
                <td className="text-center">
                    <button className="btn btn-warning btn-xs" onClick={this.props.onRemove}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        <span> 삭제</span>
                    </button>
                </td>
            </tr>
        );
    }
}