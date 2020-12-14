import React from "react";
import { Table, Button } from "reactstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ActivityTable = (props) => (
  <Table hover striped={true}>
    <thead>
      <tr>
        <th>Oznaka</th>
        <th>Lokacija</th>
        <th>Namen</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {props.activitys.length > 0 ? (
        props.activitys.map((activitys) => (
          <tr key={activitys._id}>
            <td>{activitys.oznaka}</td>
            <td>{activitys.lokacija}</td>
            <td>{activitys.namen}</td>
            <td>
              <Button
                color="warning"
                size="sm"
                onClick={() => {
                  props.editRow(activitys);
                }}
                className="button muted-button"
              >
                <FiEdit />
              </Button>
            </td>
            <td>
              <Button
                color="danger"
                size="sm"
                onClick={() => props.deleteActivity(activitys._id)}
                className="button muted-button"
              >
                <FiTrash2 />
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No activitys</td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default ActivityTable;
