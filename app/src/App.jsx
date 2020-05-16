import React, { useEffect, useState } from 'react';

import VolumeGroupHeader from './VolumeGroupHeader';
import VolumeGroupList from './VolumeGroupList';
import VolumeGroupControls from './VolumeGroupControls';
import { API } from './config';

import logo from './logo.svg';
import './App.css';

function App() {
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const [runningPrograms, setRunningPrograms] = useState([]);
    const [newProgramName, setNewProgramName] = useState('');
    const [selectedGroupName, setSelectedGroupName] = useState(null);
    const selectedGroup = groups.find((g) => g.groupName === selectedGroupName);

    const fetchGroups = async () => {
        setLoading(true);
        const res = await fetch(`${API}/api/v1/groups`);
        const response = await res.json();
        setGroups(response);
        setLoading(false);
    };

    const fetchRunningPrograms = async () => {
        const res = await fetch(`${API}/api/v1/system`);
        const response = await res.json();
        setRunningPrograms(response);
        console.log('response: ', response);
    };

    const removeGroup = async (index) => {
        await fetch(`${API}/api/v1/groups/${index}`, {
            method: 'DELETE',
        });
        fetchGroups();
    };

    const setVolume = async (percent) => {
        await fetch(`${API}/api/v1/groups/${selectedGroupName}/volume`, {
            method: 'PUT',
            body: JSON.stringify({ volume: percent }),
        });
        fetchGroups();
    };

    const addProgram = async () => {
        await fetch(`${API}/api/v1/groups/${selectedGroupName}/programs`, {
            method: 'POST',
            body: JSON.stringify({ programName: newProgramName }),
        });
        setNewProgramName('');
        fetchGroups();
    };

    const removeProgram = async (as) => {
        await fetch(
            `${API}/api/v1/groups/${selectedGroupName}/programs/${as}`,
            {
                method: 'DELETE',
            },
        );
        fetchGroups();
    };

    const setHotkeyVolumeUp = async () => {
        const { volumeDown, mods } = selectedGroup;

        const key = prompt('select a volume up hotkey');
        await fetch(`${API}/api/v1/groups/${selectedGroupName}/shortcuts`, {
            method: 'PUT',
            body: JSON.stringify({ volumeUp: key, volumeDown, mods }),
        });
        fetchGroups();
    };

    const setHotkeyVolumeDown = async () => {
        const { volumeUp, mods } = selectedGroup;

        const key = prompt('select a volume down hotkey');
        await fetch(`${API}/api/v1/groups/${selectedGroupName}/shortcuts`, {
            method: 'PUT',
            body: JSON.stringify({ volumeUp, volumeDown: key, mods }),
        });
        fetchGroups();
    };

    const setHotkeyModifiers = async (mods) => {
        const { volumeUp, volumeDown } = selectedGroup;

        await fetch(`${API}/api/v1/groups/${selectedGroupName}/shortcuts`, {
            method: 'PUT',
            body: JSON.stringify({ volumeUp, volumeDown, mods }),
        });
        fetchGroups();
    };

    const INCREMENT = 5;

    const volumeUp = () => {
        setVolume(selectedGroup.volAsPercent + INCREMENT);
    };

    const volumeDown = () => {
        setVolume(selectedGroup.volAsPercent - INCREMENT);
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        fetchRunningPrograms();
    }, []);

    return (
        <div className="App d-flex flex-column">
            <nav className="navbar navbar-light bg-light mb-4">
                <div className="navbar-brand" href="#">
                    <img
                        src="/docs/4.4/assets/brand/bootstrap-solid.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt=""
                    />
                    Beta
                </div>
            </nav>
            <div className="container-fluid">
                <div className="d-flex flex-row mb-3">
                    <div className="col-4 d-flex flex-column align-items-start">
                        {/* Volume Groups */}
                        <VolumeGroupHeader fetchGroups={fetchGroups} />
                        <VolumeGroupList
                            groups={groups}
                            loading={loading}
                            removeGroup={removeGroup}
                            setSelectedGroupName={setSelectedGroupName}
                        />
                        <VolumeGroupControls fetchGroups={fetchGroups} />
                    </div>
                    <div className="col-8 d-flex flex-column align-items-start">
                        {/* Volume Group Details */}
                        {selectedGroup && (
                            <>
                                <div className="d-flex flex-row w-100">
                                    <header className="App-header flex-grow-1">
                                        {`${selectedGroup.groupName} - ${selectedGroup.volAsPercent}%`}
                                    </header>
                                    <div className="d-flex flex-row w-25">
                                        <button
                                            className="flex-fill"
                                            onClick={volumeUp}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="flex-fill"
                                            onClick={volumeDown}
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                                {selectedGroup.audioSessions.map((as) => {
                                    return (
                                        <div
                                            className="d-flex flex-row justify-content-between w-100"
                                            key={as}
                                        >
                                            <p>{as}</p>
                                            <button
                                                onClick={() =>
                                                    removeProgram(as)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    );
                                })}
                                <div className="d-flex flex-row w-100">
                                    <input
                                        className="flex-grow-1"
                                        value={newProgramName}
                                        onChange={(e) =>
                                            setNewProgramName(e.target.value)
                                        }
                                    />
                                    <button onClick={addProgram}>
                                        Add Program
                                    </button>
                                </div>
                                <div className="d-flex flex-row w-100 py-3">
                                    <div className="col-3">
                                        <h6 onClick={setHotkeyModifiers}>
                                            Modifiers
                                        </h6>
                                        {selectedGroup.mods.map((modifier) => (
                                            <p>{modifier}</p>
                                        ))}
                                    </div>
                                    <div className="col-3">
                                        <h6 onClick={setHotkeyVolumeUp}>
                                            Volume Up
                                        </h6>
                                        {selectedGroup.volumeUp}
                                    </div>
                                    <div className="col-3">
                                        <h6 onClick={setHotkeyVolumeDown}>
                                            Volume Down
                                        </h6>
                                        {selectedGroup.volumeDown}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="d-flex flex-column col">
                    <div className="d-flex flex-row">
                        <header className="App-header flex-fill">
                            Running programs
                        </header>
                        <button onClick={fetchRunningPrograms}>Reload</button>
                    </div>
                    {runningPrograms.map((program) => (
                        <p>{program}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
