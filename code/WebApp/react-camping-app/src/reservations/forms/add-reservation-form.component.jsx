import React, { useState } from "react";
import { reservationModel } from "../shared/reservation.model";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const AddReservationForm = (props) => {
  const [reservations, setReservation] = useState(reservationModel);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setReservation({ ...reservations, [name]: value });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (!reservations.title) return;

        props.addReservation(reservations);
        setReservation(reservationModel);
      }}
    >
      <FormGroup>
        <Label>Naslov</Label>
        <Input
          type="text"
          name="title"
          value={reservations.title}
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
          value={reservations.description}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Od:</Label>
        <Input
          type="text"
          name="from_date"
          placeholder="Od:"
          value={reservations.from_date}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Do:</Label>
        <Input
          type="text"
          name="to_date"
          placeholder="Do:"
          value={reservations.to_date}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Nacin Kampiranja</Label>
        <Input
          type="text"
          name="type_of_camping"
          placeholder="Nacin Kampiranja"
          value={reservations.type_of_camping}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Status</Label>
        <Input
          type="text"
          name="status"
          placeholder="Status"
          value={reservations.status}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color="primary">Dodaj Parkirno Mesto</Button>
    </Form>
  );
};

export default AddReservationForm;
