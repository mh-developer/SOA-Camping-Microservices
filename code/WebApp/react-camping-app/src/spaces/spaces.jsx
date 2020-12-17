import React, { useState, Fragment, useEffect, useCallback } from "react";
import AddSpaceForm from "./forms/add-space-form.component";
import EditSpaceForm from "./forms/edit-space-form.component";
import SpaceTable from "./tables/space-table.component";
import { spaceModel } from "./shared/space.model";
import { SpaceService } from "./shared/space.service";
import { Row, Col } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Spaces = () => {
    // Setting state
    const [spaces, setSpaces] = useState([]);
    const [currentSpace, setCurrentSpace] = useState(spaceModel);
    const [editing, setEditing] = useState(false);
    const { getAccessTokenWithPopup } = useAuth0();

    const loadspacesData = useCallback(async () => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_SPACES_API_URL,
        });

        SpaceService.getAll(token)
            .then((response) => {
                if (response.data) {
                    setSpaces(response.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, [getAccessTokenWithPopup]);

    useEffect(() => {
        loadspacesData();
    }, [loadspacesData]);

    // CRUD operations
    const addSpace = async (space) => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_SPACES_API_URL,
        });
        const createSpace = {
            oznaka: space.oznaka,
            lokacija: space.lokacija,
            namen: space.namen,
            prost: space.prost,
        };

        SpaceService.create(createSpace, token)
            .then((response) => {
                if (response.data) {
                    setSpaces([...spaces, response.data]);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteSpace = async (id) => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_SPACES_API_URL,
        });
        setEditing(false);
        SpaceService.remove(id, token)
            .then((response) => {
                setSpaces(spaces.filter((space) => space._id !== id));
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateSpace = async (id, updatedSpace) => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_SPACES_API_URL,
        });
        setEditing(false);

        SpaceService.update(id, updatedSpace, token)
            .then((response) => {
                setSpaces(
                    spaces.map((space) =>
                        space._id === id ? updatedSpace : space
                    )
                );
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const editRow = (space) => {
        setEditing(true);

        setCurrentSpace({ ...space });
    };

    return (
        <div className="container content">
            <h1 className="text-center page-title">Spaces</h1>
            <Row className="d-flex justify-content-between">
                <Col md={4}>
                    {editing ? (
                        <Fragment>
                            <h2>Edit space</h2>
                            <EditSpaceForm
                                editing={editing}
                                setEditing={setEditing}
                                currentSpace={currentSpace}
                                updateSpace={updateSpace}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h2>Add new space</h2>
                            <AddSpaceForm addSpace={addSpace} />
                        </Fragment>
                    )}
                </Col>

                <Col md={8} className="tableCol">
                    <SpaceTable
                        spaces={spaces}
                        editRow={editRow}
                        deleteSpace={deleteSpace}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Spaces;
