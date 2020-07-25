import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { API } from './config';

const VolumeGroupControls = ({ fetchGroups }) => {
    const [newGroupName, setNewGroupName] = useState('');

    const addGroup = async () => {
        await fetch(`${API}/api/v1/groups`, {
            method: 'POST',
            // headers: {
            //     "Content-Type": "application/json"
            // },
            body: JSON.stringify({ groupName: newGroupName }),
        });
        setNewGroupName('');
        fetchGroups();
    };

    return (
        <div className="d-flex flex-row w-100">
            <input
                className="flex-grow-1"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
            />
            <button type="button" onClick={addGroup}>
                Add Group
            </button>
        </div>
    );
};

VolumeGroupControls.propTypes = {
    fetchGroups: PropTypes.func.isRequired,
};

export default VolumeGroupControls;
