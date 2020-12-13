import React, { useState, useEffect } from "react";

const EditSpaceForm = (props) => {
  const [space, setSpace] = useState(props.currentSpace);

  useEffect(() => {
    setSpace(props.currentSpace);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSpace({ ...space, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        props.updateSpace(space._id, space);
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
        name="Lokacija"
        value={space.lokacija}
        onChange={handleInputChange}
      />
      <label>Namen</label>
      <input
        type="text"
        name="Namen"
        value={space.namen}
        onChange={handleInputChange}
      />
      <label>Prostost</label>
      <input
        type="text"
        name="Prost"
        value={space.prost}
        onChange={handleInputChange}
      />
      <button>Update Space</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditSpaceForm;
