import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

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
    <Form
      onSubmit={(event) => {
        event.preventDefault();

        props.updateSpace(space._id, space);
      }}
    >
      <FormGroup>
        <Label>Oznaka</Label>
        <Input
          type="text"
          name="oznaka"
          value={space.oznaka}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Lokacija</Label>
        <Input
          type="text"
          name="Lokacija"
          value={space.lokacija}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Namen</Label>
        <Input
          type="text"
          name="Namen"
          value={space.namen}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Prostost</Label>
        <Input
          type="text"
          name="Prost"
          value={space.prost}
          onChange={handleInputChange}
        />
      </FormGroup>
      <div className="d-flex justify-content-between">
        <Button className="btn-warning">Update Space</Button>
        <Button onClick={() => props.setEditing(false)} className="btn-primary">
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EditSpaceForm;
