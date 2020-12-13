import React, { useState, Fragment, useEffect, useCallback } from "react";
import AddSpaceForm from "./forms/add-space-form.component";
import EditSpaceForm from "./forms/edit-space-form.component";
import SpaceTable from "./tables/space-table.component";
import { spaceModel } from "./shared/space.model";
import { SpaceService } from "./shared/space.service";

const Spaces = () => {
  // Setting state
  const [spaces, setSpaces] = useState([]);
  const [currentSpace, setCurrentSpace] = useState(spaceModel);
  const [editing, setEditing] = useState(false);

  const loadspacesData = useCallback(() => {
    SpaceService.getAll()
      .then((response) => {
        if (response.data) {
          setSpaces(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    loadspacesData();
  }, [loadspacesData]);
  // CRUD operations
  const addSpace = (space) => {
    const createSpace = {
      oznaka: space.oznaka,
      lokacija: space.lokacija,
      namen: space.namen,
      prost: space.prost,
    };

    SpaceService.create(createSpace)
      .then((response) => {
        if (response.data) {
          setSpaces([...spaces, response.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteSpace = (id) => {
    setEditing(false);
    SpaceService.remove(id)
      .then((response) => {
        setSpaces(spaces.filter((space) => space._id !== id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateSpace = (id, updatedSpace) => {
    setEditing(false);

    SpaceService.update(id, updatedSpace)
      .then((response) => {
        setSpaces(spaces.map((space) => (space._id === id ? updatedSpace : space)));
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
    <div className="container">
      <h1>Spaces</h1>
      <div className="flex-row">
        <div className="flex-large">
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
              <h2>Add space</h2>
              <AddSpaceForm addSpace={addSpace} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View spaces</h2>
          <SpaceTable spaces={spaces} editRow={editRow} deleteSpace={deleteSpace} />
        </div>
      </div>
    </div>
  );
};

export default Spaces;
