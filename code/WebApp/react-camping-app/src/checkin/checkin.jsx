import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useState, Fragment, useEffect, useCallback } from "react";
import CheckinTable from "./tables/checkin-table.component"
import { Row, Col } from "reactstrap";
import { checkinModel } from "./shared/checkin.model";
import { CheckinService } from "./shared/checkin.service"
import { useAuth0 } from "@auth0/auth0-react";
import EditCheckinForm from "./forms/edit-checkin-form.component";
import AddCheckinForm from "./forms/add-checkin-form.component";
const Checkin = () => {

    const [checkin, setCheckin] = useState([]);
    const [currentCheckin, setCurrentCheckin] = useState(
        checkinModel
    );
    const [editing, setEditing] = useState(false);
    const { getAccessTokenWithPopup } = useAuth0();

    const loadCheckinsData = useCallback(async () => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_RESERVATIONS_API_URL,
        });

        CheckinService.getAll(token)
            .then((response) => {
                if (response.data) {
                    setCheckin(response.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, [getAccessTokenWithPopup]);

    useEffect(() => {
        loadCheckinsData();
    }, [loadCheckinsData]);

    const addCheckin = async (checkin) => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_CHECKIN_API_URL,
        });
        const createCheckin = {
            title: checkin.title,
            description: checkin.description,
            from_date: checkin.from_date,
            to_date: checkin.to_date,
            type_of_camping: checkin.type_of_camping,
            status: checkin.status,
        };

        CheckinService.create(createCheckin, token)
            .then((response) => {
                if (response.data) {
                    setCheckin([...checkin, response.data]);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteCheckin = async (id) => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_CHECKIN_API_URL,
        });
        setEditing(false);
        CheckinService.remove(id, token)
            .then((response) => {
                setCheckin(
                    checkin.filter(
                        (checkin) => checkin._id.$oid !== id
                    )
                );
            })
            .catch((e) => {
                console.log(e);
            });
    };


    const editRow = (checkin) => {
        setEditing(true);

        setCurrentCheckin({ ...checkin });
    };

    const updateCheckin = async (id, updateCheckin) => {
        const token = await getAccessTokenWithPopup({
            audience: process.env.REACT_APP_CHECKIN_API_URL,
        });
        setEditing(false);
        console.log(id);
        console.log(updateCheckin);
        CheckinService.update(id, updateCheckin, token)
            .then((response) => {
                setCheckin(
                    checkin.map((checkin) =>
                        checkin._id.$oid === id
                            ? updateCheckin
                            : checkin
                    )
                );
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="container content">
            <h1 className="text-center page-title">Checkin</h1>
            <Row className="d-flex justify-content-between">
                <Col md={4}>
                    {editing ? (
                        <Fragment>
                            <h2>Edit reservation</h2>
                            <EditCheckinForm
                                editing={editing}
                                setEditing={setEditing}
                                currentCheckin={currentCheckin}
                                updateCheckin={updateCheckin}
                            />
                        </Fragment>
                    ) : (
                            <Fragment>
                                <h2>Add new checkin</h2>
                                <AddCheckinForm
                                    addCheckin={addCheckin}
                                />
                            </Fragment>
                        )}
                </Col>
                <Col md={8} className="tableCol">
                    <CheckinTable
                        checkin={checkin}
                        editRow={editRow}
                        deleteCheckin={deleteCheckin}

                    />
                </Col>
            </Row>
        </div>
    );
};

const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    textAlign: "center",
    fontFamily: "Arial"
};

export default Checkin;
