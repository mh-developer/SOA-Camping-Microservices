import React, { useState } from "react";
import { checkinModel } from "../shared/checkin.model";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const AddCheckinForm = (props) => {
  const [checkin, setCheckin] = useState(checkinModel);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCheckin({ ...checkin, [name]: value });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (!checkin.name) return;

        props.addCheckin(checkin);
        setCheckin(checkinModel);
      }}
    >
      <FormGroup>
        <Label>Ime</Label>
        <Input
          type="text"
          name="name"
          value={checkin.name}
          placeholder="Ime"
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Info</Label>
        <Input
          type="text"
          name="no_people"
          placeholder="Info"
          value={checkin.no_people}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>Datum</Label>
        <Input
          type="text"
          name="date"
          placeholder="Status"
          value={checkin.date}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color="primary">Dodaj checkin</Button>
    </Form>
  );
};

export default AddCheckinForm;
