import React from "react";
import { Table, Button } from "reactstrap";

const CampTable = (props) => (
  <Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.camps.length > 0 ? (
        props.camps.map((camp) => (
          <tr key={camp.Id}>
            <td>{camp.Name}</td>
            <td>{camp.Description}</td>
            <td>
              <Button
                color="white"
                size="sm"
                onClick={() => {
                  props.editRow(camp);
                }}
                className="button muted-button"
              >
                Edit
              </Button>
              <Button
                color="white"
                size="sm"
                onClick={() => props.deleteCamp(camp.Id)}
                className="button muted-button"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No camps</td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default CampTable;
