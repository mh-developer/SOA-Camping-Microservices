import React, { useState, Fragment, useEffect, useCallback } from "react";
import AddCampForm from "./forms/add-camp-form.component";
import EditCampForm from "./forms/edit-camp-form.component";
import CampTable from "./tables/camp-table.component";
import { campModel } from "./shared/camp.model";
import { CampService } from "./shared/camps.service";
import { Row, Col } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Camps = () => {
    // Setting state
    const [camps, setCamps] = useState([]);
    const [currentCamp, setCurrentCamp] = useState(campModel);
    const [editing, setEditing] = useState(false);
    const { getAccessTokenWithPopup } = useAuth0();

    const loadCampsData = useCallback(async () => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_CAMPS_API_URL,
        });

        CampService.getAll(token)
            .then((response) => {
                if (response.data) {
                    setCamps(response.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, [getAccessTokenWithPopup]);

    useEffect(() => {
        loadCampsData();
    }, [loadCampsData]);

    // CRUD operations
    const addCamp = async (camp) => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_CAMPS_API_URL,
        });
        const createCamp = {
            Name: camp.Name,
            Description: camp.Description,
            Title: camp.Title,
            PhoneNumber: camp.PhoneNumber,
            LocationX: camp.LocationX,
            LocationY: camp.LocationY,
        };

        CampService.create(createCamp, token)
            .then((response) => {
                if (response.data) {
                    setCamps([...camps, response.data]);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteCamp = async (id) => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_CAMPS_API_URL,
        });
        setEditing(false);
        CampService.remove(id, token)
            .then((response) => {
                setCamps(camps.filter((camp) => camp.Id !== id));
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateCamp = async (id, updatedCamp) => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_CAMPS_API_URL,
        });
        setEditing(false);

        CampService.update(id, updatedCamp, token)
            .then((response) => {
                setCamps(
                    camps.map((camp) => (camp.Id === id ? updatedCamp : camp))
                );
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const editRow = (camp) => {
        setEditing(true);

        setCurrentCamp({ ...camp });
    };

    return (
        <div className="container content">
            <h1 className="text-center page-title">Camps</h1>
            <Row className="d-flex justify-content-between">
                <Col md={4}>
                    {editing ? (
                        <Fragment>
                            <h2>Edit camp</h2>
                            <EditCampForm
                                editing={editing}
                                setEditing={setEditing}
                                currentCamp={currentCamp}
                                updateCamp={updateCamp}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h2>Add camp</h2>
                            <AddCampForm addCamp={addCamp} />
                        </Fragment>
                    )}
                </Col>

                <Col md={8} className="tableCol">
                    <CampTable
                        camps={camps}
                        editRow={editRow}
                        deleteCamp={deleteCamp}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Camps;
