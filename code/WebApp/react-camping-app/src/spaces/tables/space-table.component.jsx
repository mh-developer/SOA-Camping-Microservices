import React from "react";
import { Table, Button } from "reactstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const SpaceTable = (props) => (
  <Table hover striped="true">
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
      {props.spaces.length > 0 ? (
        props.spaces.map((spaces) => (
          <tr key={spaces._id}>
            <td>{spaces.oznaka}</td>
            <td>{spaces.lokacija}</td>
            <td>{spaces.namen}</td>
            <td>
              <Button
                color="warning"
                size="sm"
                onClick={() => {
                  props.editRow(spaces);
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
                onClick={() => props.deleteSpace(spaces._id)}
                className="button muted-button"
              >
                <FiTrash2 />
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No spaces</td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default SpaceTable;
