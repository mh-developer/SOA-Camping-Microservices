import React, { useState } from "react";
import { activityModel } from "../shared/activity.model";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const AddActivityForm = (props) => {
  const [activity, setActivity] = useState(activityModel);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setActivity({ ...activity, [name]: value });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (!activity.oznaka) return;

        props.addActivity(activity);
        setActivity(activityModel);
      }}
    >
      <FormGroup>
        <Label>Oznaka</Label>
        <Input
          type="text"
          name="oznaka"
          value={activity.oznaka}
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
          value={activity.lokacija}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Namen</Label>
        <Input
          type="text"
          name="namen"
          placeholder="Namen"
          value={activity.namen}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color="primary">Dodaj Parkirno Mesto</Button>
    </Form>
  );
};

export default AddActivityForm;
