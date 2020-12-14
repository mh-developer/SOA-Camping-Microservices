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
        <Label>Naslov</Label>
        <Input
          type="text"
          name="title"
          value={reservation.title}
          placeholder="Naslov"
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Opis</Label>
        <Input
          type="text"
          name="description"
          placeholder="Opis"
          value={reservation.description}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Od:</Label>
        <Input
          type="text"
          name="from_date"
          placeholder="Od:"
          value={reservation.from_date}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Do:</Label>
        <Input
          type="text"
          name="to_date"
          placeholder="Do:"
          value={reservation.to_date}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Nacin Kampiranja</Label>
        <Input
          type="text"
          name="type_of_camping"
          placeholder="Nacin Kampiranja"
          value={reservation.type_of_camping}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Status</Label>
        <Input
          type="text"
          name="status"
          placeholder="Status"
          value={reservation.status}
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
