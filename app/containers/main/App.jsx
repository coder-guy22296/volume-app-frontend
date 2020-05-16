import React, { useCallback, useEffect, useState } from 'react';
import electronPrompt from 'electron-prompt';
import Modal from 'react-modal';

import VolumeGroupHeader from './VolumeGroupHeader';
import VolumeGroupList from './VolumeGroupList';
import VolumeGroupControls from './VolumeGroupControls';
import { API, KEYS, MODIFIERS, WS_API } from './config';

import './App.css';
import VolumeGroupHeader from './VolumeGroupHeader';
import VolumeGroupList from './VolumeGroupList';
import VolumeGroupControls from './VolumeGroupControls';
import { API } from './config';

export const API = 'http://10.0.0.227:4000';

function App() {
    const [connecting, setConnecting] = useState(true);
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const [runningPrograms, setRunningPrograms] = useState([]);
    const [newProgramName, setNewProgramName] = useState('');
    const [selectedGroupName, setSelectedGroupName] = useState(null);
    const selectedGroup = groups.find((g) => g.groupName === selectedGroupName);
    const selectedGroupIndex = groups.indexOf(selectedGroup);

    const [modal, modalState, toggleModal] = useModal();

    const handleModalSubmit = () => {

    }

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
        // fetchGroups();
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

    const setHotkeyVolumeUp = async (key) => {
        const { volumeUp, volumeDown, mods } = selectedGroup;

        // const key = await promptKey('Select a volume up hotkey', volumeUp);
        await fetch(`${API}/api/v1/groups/${selectedGroupName}/shortcuts`, {
            method: 'PUT',
            body: JSON.stringify({ volumeUp: key, volumeDown, mods }),
        });
        fetchGroups();
    };

    const setHotkeyVolumeDown = async (key) => {
        const { volumeUp, volumeDown, mods } = selectedGroup;

        // const key = await promptKey('Select a volume down hotkey', volumeDown);
        await fetch(`${API}/api/v1/groups/${selectedGroupName}/shortcuts`, {
            method: 'PUT',
            body: JSON.stringify({ volumeUp, volumeDown: key, mods }),
        });
        fetchGroups();
    };

    const setHotkeyModifiers = async (mod) => {
        const { mods, volumeUp, volumeDown } = selectedGroup;

        // const mod = await promptModifier('Select a keyboard modifier', mods[0]);
        await fetch(`${API}/api/v1/groups/${selectedGroupName}/shortcuts`, {
            method: 'PUT',
            body: JSON.stringify({ volumeUp, volumeDown, mods: [mod] }),
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
        if ((groups || {}).length && !selectedGroupName) {
            setSelectedGroupName(groups[0].groupName)
        }
    }, [(groups || {}).length !== 0, selectedGroupName])

    // useEffect(() => {
    //     fetchGroups();
    // }, []);

    useEffect(() => {
        if (!connecting) {
            fetchGroups();
            fetchRunningPrograms();
        }
    }, [connecting]);


    useEffect(() => {
        if (connecting) {
            const ws = new WebSocket(WS_API);
            ws.onopen = () => {
                setConnecting(false);
            }
            ws.onmessage = (event) => {
                console.log('recieved', JSON.parse(event.data))
                setGroups(JSON.parse(event.data));
            }
            ws.onclose = () => {
                setConnecting(true);
            }
            ws.onerror = () => {
                setConnecting(false);
                setConnecting(true);
            }
        }
    }, [connecting]);

    if (connecting) {
        return <div className="App d-flex flex-column">connecting....</div>;
    }

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
                    Volume Control Utility 2.0
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
                                    <header
                                        className="App-header flex-grow-1"
                                        onClick={() =>
                                            renameGroup(selectedGroupIndex)
                                        }
                                    >
                                        {`${selectedGroup.groupName} - ${selectedGroup.volAsPercent}%`}
                                    </header>
                                    <div className="d-flex flex-row w-25">
                                        <button
                                            type="button"
                                            className="flex-fill"
                                            onClick={volumeUp}
                                        >
                                            +
                                        </button>
                                        <button
                                            type="button"
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
                                                type="button"
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
                                    <button type="button" onClick={addProgram}>
                                        Add Program
                                    </button>
                                </div>
                                <div className="d-flex flex-row w-100 py-3">
                                    <div className="col-3">
                                        <h6 onClick={() => toggleModal({ title: 'Press your desired key for "Modifier"', onSubmit: setHotkeyModifiers })}>
                                            Modifiers
                                        </h6>
                                        {selectedGroup.mods.map((modifier) => (
                                            <p>{modifier}</p>
                                        ))}
                                    </div>
                                    <div className="col-3">
                                        <h6 onClick={() => toggleModal({ title: 'Press your desired key for "Volume Up"', onSubmit: setHotkeyVolumeUp })}>
                                            Volume Up
                                        </h6>
                                        {selectedGroup.volumeUp}
                                    </div>
                                    <div className="col-3">
                                        <h6 onClick={() => toggleModal({ title: 'Press your desired key for "Volume Down"', onSubmit: setHotkeyVolumeDown })}>
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
                        <button type="button" onClick={fetchRunningPrograms}>
                            Reload
                        </button>
                    </div>
                    {runningPrograms.map((program) => (
                        <p>{program}</p>
                    ))}
                </div>
                <button type="button" onClick={defaultVolume}>
                    Default volume
                </button>
                <button type="button" onClick={save}>
                    Save
                </button>
            </div>
            {modal &&
                <KeyPressModal
                    isOpen={modal}
                    toggle={toggleModal}
                    title={modalState.title}
                    onSubmit={modalState.onSubmit}
                />
            }
        </div>
    );
}

export default App;
