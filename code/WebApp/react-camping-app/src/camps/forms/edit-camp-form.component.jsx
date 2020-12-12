import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

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
    <Form
      onSubmit={(event) => {
        event.preventDefault();

        props.updateCamp(camp.Id, camp);
      }}
    >
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          name="Name"
          value={camp.Name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Input
          type="text"
          name="Description"
          value={camp.Description}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Title</Label>
        <Input
          type="text"
          name="Title"
          value={camp.Title}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Phone Number</Label>
        <Input
          type="text"
          name="PhoneNumber"
          value={camp.PhoneNumber}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Location X</Label>
        <Input
          type="text"
          name="LocationX"
          value={camp.LocationX}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Location Y</Label>
        <Input
          type="text"
          name="LocationY"
          value={camp.LocationY}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color="primary">Update camp</Button>
      <Button
        color="white"
        outline
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </Button>
    </Form>
  );
};

export default EditCampForm;
