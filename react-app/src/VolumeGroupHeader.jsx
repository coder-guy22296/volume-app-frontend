import React from 'react';
import PropTypes from 'prop-types';

const VolumeGroupHeader = ({ fetchGroups }) => {
    return (
        <div className="d-flex flex-row w-100">
            <header className="App-header flex-grow-1">Groups</header>
            <div className="d-flex flex-row w-25">
                <button
                    type="button"
                    className="flex-fill"
                    onClick={fetchGroups}
                >
                    Refresh
                </button>
            </div>
        </div>
    );
};

VolumeGroupHeader.propTypes = {
    fetchGroups: PropTypes.func.isRequired,
};

export default VolumeGroupHeader;
