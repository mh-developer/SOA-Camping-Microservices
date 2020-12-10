import React, { useState, useEffect } from "react";

const EditCampForm = (props) => {
  const [camp, setCamp] = useState(props.currentCamp);

  useEffect(() => {
    setCamp(props.currentCamp);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCamp({ ...camp, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        props.updateCamp(camp.Id, camp);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="Name"
        value={camp.Name}
        onChange={handleInputChange}
      />
      <label>Description</label>
      <input
        type="text"
        name="Description"
        value={camp.Description}
        onChange={handleInputChange}
      />
      <label>Title</label>
      <input
        type="text"
        name="Title"
        value={camp.Title}
        onChange={handleInputChange}
      />
      <label>Phone Number</label>
      <input
        type="text"
        name="PhoneNumber"
        value={camp.PhoneNumber}
        onChange={handleInputChange}
      />
      <label>Location X</label>
      <input
        type="text"
        name="LocationX"
        value={camp.LocationX}
        onChange={handleInputChange}
      />
      <label>Location Y</label>
      <input
        type="text"
        name="LocationY"
        value={camp.LocationY}
        onChange={handleInputChange}
      />
      <button>Update camp</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditCampForm;
