import React, { useState, Fragment, useEffect, useCallback } from "react";
import AddCampForm from "./forms/add-camp-form.component";
import EditCampForm from "./forms/edit-camp-form.component";
import CampTable from "./tables/camp-table.component";
import { campModel } from "./shared/camp.model";
import { CampService } from "./shared/camps.service";

const Camps = () => {
  // Setting state
  const [camps, setCamps] = useState([]);
  const [currentCamp, setCurrentCamp] = useState(campModel);
  const [editing, setEditing] = useState(false);

  const loadCampsData = useCallback(() => {
    CampService.getAll()
      .then((response) => {
        if (response.data) {
          setCamps(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    loadCampsData();
  }, [loadCampsData]);
  // CRUD operations
  const addCamp = (camp) => {
    const createCamp = {
      Name: camp.Name,
      Description: camp.Description,
      Title: camp.Title,
      PhoneNumber: camp.PhoneNumber,
      LocationX: camp.LocationX,
      LocationY: camp.LocationY,
    };

    CampService.create(createCamp)
      .then((response) => {
        if (response.data) {
          setCamps([...camps, response.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteCamp = (id) => {
    setEditing(false);
    CampService.remove(id)
      .then((response) => {
        setCamps(camps.filter((camp) => camp.Id !== id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateCamp = (id, updatedCamp) => {
    setEditing(false);

    CampService.update(id, updatedCamp)
      .then((response) => {
        setCamps(camps.map((camp) => (camp.Id === id ? updatedCamp : camp)));
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
    <div className="container">
      <h1>Camps</h1>
      <div className="flex-row">
        <div className="flex-large">
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
        </div>
        <div className="flex-large">
          <h2>View camps</h2>
          <CampTable camps={camps} editRow={editRow} deleteCamp={deleteCamp} />
        </div>
      </div>
    </div>
  );
};

export default Camps;
