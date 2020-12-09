import React, { useState } from "react";
import { campModel } from "../shared/camp.model";

const AddCampForm = (props) => {
  const [camp, setCamp] = useState(campModel);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCamp({ ...camp, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!camp.Name) return;

        props.addCamp(camp);
        setCamp(campModel);
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
      <button>Add new camp</button>
    </form>
  );
};

export default AddCampForm;
