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
        if (!activity.name) return;
        props.addActivity(activity);
        setActivity(activityModel);
        console.log("Submit called");
      }}
    >
      <FormGroup>
        <Label>Ime</Label>
        <Input
          type="text"
          name="name"
          value={activity.name}
          placeholder="Ime"
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button type="submit" color="primary">
        Dodaj Novo Aktivnost
      </Button>
    </Form>
  );
};

export default AddActivityForm;
