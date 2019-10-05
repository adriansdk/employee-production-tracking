import React from 'react';
import DailyQuota from './DailyQuota';

class Performance extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
      <div className="performance">
        <DailyQuota/>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default Performance;