import React, { useState } from "react";
import { spaceModel } from "../shared/space.model";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const AddSpaceForm = (props) => {
  const [space, setSpace] = useState(spaceModel);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSpace({ ...space, [name]: value });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (!space.oznaka) return;
        console.log("Submit called");
        props.addSpace(space);
        setSpace(spaceModel);
      }}
    >
      <FormGroup>
        <Label>Oznaka</Label>
        <Input
          type="text"
          name="oznaka"
          value={space.oznaka}
          placeholder="Oznaka"
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Lokacija</Label>
        <Input
          type="text"
          name="lokacija"
          placeholder="Lokacija"
          value={space.lokacija}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Namen</Label>
        <Input
          type="text"
          name="namen"
          placeholder="Namen"
          value={space.namen}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color="primary">Dodaj Parkirno Mesto</Button>
    </Form>
  );
};

export default AddSpaceForm;
