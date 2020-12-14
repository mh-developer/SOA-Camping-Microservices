import React, { useState } from "react";
import { campModel } from "../shared/camp.model";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const AddCampForm = (props) => {
  const [camp, setCamp] = useState(campModel);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCamp({ ...camp, [name]: value });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (!camp.Name) return;

        props.addCamp(camp);
        setCamp(campModel);
      }}
    >
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          placeholder="Name"
          name="Name"
          value={camp.Name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Input
          type="text"
          placeholder="Description"
          name="Description"
          value={camp.Description}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Title</Label>
        <Input
          type="text"
          placeholder="Title"
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
          placeholder="Phone Number"
          value={camp.PhoneNumber}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Location X</Label>
        <Input
          type="text"
          placeholder="LocationX"
          name="LocationX"
          value={camp.LocationX}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Location Y</Label>
        <Input
          type="text"
          placeholder="LocationY"
          name="LocationY"
          value={camp.LocationY}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color="primary">Add new camp</Button>
    </Form>
  );
};

export default AddCampForm;
