import React, { useState, Fragment, useEffect, useCallback } from "react";
import AddActivityForm from "./forms/add-activity-form.component";
import EditActivityForm from "./forms/edit-activity-form.component";
import ActivityTable from "./tables/activity-table.component";
import { activityModel } from "./shared/activity.model";
import { ActivityService } from "./shared/activity.service";
import { Row, Col } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Activitys = () => {
  // Setting state
  const [activitys, setActivitys] = useState([]);
  const [currentActivity, setCurrentActivity] = useState(activityModel);
  const [editing, setEditing] = useState(false);

  const { getAccessTokenWithPopup } = useAuth0();

  const loadactivitysData = useCallback(async () => {
    const token = await getAccessTokenWithPopup({
      audience: process.env.REACT_APP_ACTIVITY_API_URL,
    })

    ActivityService.getAll()
      .then((response) => {
        if (response.data) {
          setActivitys(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [getAccessTokenWithPopup]);

  useEffect(() => {
    loadactivitysData();
  }, [loadactivitysData]);
  // CRUD operations
  const addActivity = async (activity) => {

    const token = await getAccessTokenWithPopup({
      audience: process.env.REACT_APP_ACTIVITY_API_URL,
    });
    const createActivity = {
      id: activity.id,
      name: activity.name,
    };

    ActivityService.create(createActivity, token)
      .then((response) => {
        if (response.data) {
          setActivitys([...activitys, response.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteActivity = async (id) => {

    const token = await getAccessTokenWithPopup({
      audience: process.env.REACT_APP_ACTIVITY_API_URL,
    });

    setEditing(false);
    ActivityService.remove(id, token)
      .then((response) => {
        setActivitys(activitys.filter((activity) => activity._id !== id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateActivity = async (id, updatedActivity) => {

    const token = await getAccessTokenWithPopup({
      audience: process.env.REACT_APP_ACTIVITY_API_URL,
    });
    setEditing(false);

    ActivityService.update(id, updatedActivity, token)
      .then((response) => {
        setActivitys(
          activitys.map((activity) =>
            activity._id === id ? updatedActivity : activity
          )
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editRow = (activity) => {
    setEditing(true);

    setCurrentActivity({ ...activity });
  };

  return (
    <div className="container content">
      <h1 className="text-center page-title">Activities</h1>
      <Row className="d-flex justify-content-between">
        <Col md={4}>
          {editing ? (
            <Fragment>
              <h2>Edit activities</h2>
              <EditActivityForm
                editing={editing}
                setEditing={setEditing}
                currentActivity={currentActivity}
                updateActivity={updateActivity}
              />
            </Fragment>
          ) : (
              <Fragment>
                <h2>Add new activity</h2>
                <AddActivityForm addActivity={addActivity} />
              </Fragment>
            )}
        </Col>

        <Col md={8} className="tableCol">
          <ActivityTable
            activitys={activitys}
            editRow={editRow}
            deleteActivity={deleteActivity}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Activitys;
