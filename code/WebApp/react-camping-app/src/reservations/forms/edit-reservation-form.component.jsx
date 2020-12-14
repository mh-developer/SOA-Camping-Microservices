import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const EditForm = (props) => {
  const [reservation, set] = useState(props.current);

  useEffect(() => {
    set(props.current);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    set({ ...reservation, [name]: value });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();

        props.update(reservation._id, reservation);
      }}
    >
      <FormGroup>
        <Label>Oznaka</Label>
        <Input
          type="text"
          name="oznaka"
          value={reservation.oznaka}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Lokacija</Label>
        <Input
          type="text"
          name="Lokacija"
          value={reservation.lokacija}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Namen</Label>
        <Input
          type="text"
          name="Namen"
          value={reservation.namen}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Prostost</Label>
        <Input
          type="text"
          name="Prost"
          value={reservation.prost}
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
