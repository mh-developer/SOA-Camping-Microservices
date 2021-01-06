import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const EditForm = (props) => {
  const [checkin, set] = useState(props.current);

  useEffect(() => {
    set(props.current);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    set({ ...checkin, [name]: value });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();

        props.update(checkin._id, checkin);
      }}
    >
      <FormGroup>
        <Label>Ime</Label>
        <Input
          type="text"
          name="title"
          value={checkin.name}
          placeholder="Ime"
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Info</Label>
        <Input
          type="text"
          name="description"
          placeholder="Info"
          value={checkin.no_people}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Datum</Label>
        <Input
          type="text"
          name="Status"
          placeholder="Status"
          value={checkin.date}
          onChange={handleInputChange}
        />
      </FormGroup>

      <div className="d-flex justify-content-between">
        <Button className="btn-warning">Update </Button>
        <Button onClick={() => props.setEditing(false)} className="btn-primary">
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EditForm;
