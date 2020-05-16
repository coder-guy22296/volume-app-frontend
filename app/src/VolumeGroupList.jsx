import React from 'react';
import PropTypes from 'prop-types';

const VolumeGroupList = ({
    groups,
    loading,
    setSelectedGroupName,
    removeGroup,
}) => (
    <>
        {!groups.length && loading && <p>loading.....</p>}
        {groups.map((group, index) => {
            return (
                <div
                    className="d-flex flex-row justify-content-between w-100"
                    key={group.groupName}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedGroupName(group.groupName)}
                    >
                        {group.groupName}
                    </button>
                    <button type="button" onClick={() => removeGroup(index)}>
                        Delete
                    </button>
                </div>
            );
        })}
    </>
);

VolumeGroupList.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    removeGroup: PropTypes.func.isRequired,
    setSelectedGroupName: PropTypes.func.isRequired,
};

export default VolumeGroupList;
