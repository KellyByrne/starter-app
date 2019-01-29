import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

class OtherSamplePage extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title="Other Sample Page"/>
                <div className="d-flex justify-content-center">
                    <h1>Does this work - other sample page</h1>
                </div>

            </div>
        );
    }
}

export default OtherSamplePage;