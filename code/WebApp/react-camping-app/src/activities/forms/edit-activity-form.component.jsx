import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const EditActivityForm = (props) => {
  const [activity, setActivity] = useState(props.currentActivity);

  useEffect(() => {
    setActivity(props.currentActivity);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setActivity({ ...activity, [name]: value });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();

        props.updateActivity(activity._id, activity);
      }}
    >
      <FormGroup>
        <Label>Ime</Label>
        <Input
          type="text"
          name="name"
          value={activity.name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <div className="d-flex justify-content-between">
        <Button className="btn-warning">Update Activity</Button>
        <Button onClick={() => props.setEditing(false)} className="btn-primary">
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EditActivityForm;
