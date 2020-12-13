import React, { useState } from "react";
import { spaceModel } from "../shared/space.model";

const AddSpaceForm = (props) => {
  const [space, setSpace] = useState(spaceModel);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSpace({ ...space, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!space.oznaka) return;

        props.addSpace(space);
        setSpace(spaceModel);
      }}
    >
      <label>Oznaka</label>
      <input
        type="text"
        name="oznaka"
        value={space.oznaka}
        onChange={handleInputChange}
      />
      <label>Lokacija</label>
      <input
        type="text"
        name="lokacija"
        value={space.lokacija}
        onChange={handleInputChange}
      />
      <label>Namen</label>
      <input
        type="text"
        name="namen"
        value={space.namen}
        onChange={handleInputChange}
      />
      <button>Dodaj Parkirno Mesto</button>
    </form>
  );
};

export default AddSpaceForm;
