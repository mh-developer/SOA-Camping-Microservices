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
        if (!reservations.oznaka) return;

        props.addReservation(reservations);
        setReservation(reservationModel);
      }}
    >
      <FormGroup>
        <Label>Oznaka</Label>
        <Input
          type="text"
          name="oznaka"
          value={reservations.oznaka}
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
          value={reservations.lokacija}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Namen</Label>
        <Input
          type="text"
          name="namen"
          placeholder="Namen"
          value={reservations.namen}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color="primary">Dodaj Parkirno Mesto</Button>
    </Form>
  );
};

export default AddReservationForm;
