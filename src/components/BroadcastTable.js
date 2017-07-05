import React from 'react';
import moment from 'moment';
import BroadcastTableRow from './BroadcastTableRow';

export default class BroadcastTable extends React.Component {
    getRecentBroadcastDate(broadcastDay) {
        const today = moment();
        const thisWeekBroadcastDate = moment().day(broadcastDay);
        let recentBroadcastDate;

        if (today.isAfter(thisWeekBroadcastDate)) {
            recentBroadcastDate = thisWeekBroadcastDate;
        } else {
            recentBroadcastDate = thisWeekBroadcastDate.subtract(1, 'week');
        }

        return recentBroadcastDate;
    }

    getBroadcastTableRows() {
        return this.props.broadcastList.map((broadcast, index) => (
            <BroadcastTableRow
                key={index}
                index={index}
                broadcast={broadcast}
                recentBroadcastDate={this.getRecentBroadcastDate(broadcast.day)}
                onRemove={(event) => this.props.onRemove(index, event)} />
        ));
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>방송 이름</th>
                        <th>방송 요일</th>
                        <th>최근 방송 날짜</th>
                        <th className="text-center">토렌트 검색</th>
                        <th className="text-center">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getBroadcastTableRows()}
                </tbody>
            </table>
        );
    }
}

BroadcastTable.defaultProps = {
    broadcastList: [],
    onRemove: () => console.error('onRemove is not defined')
}
