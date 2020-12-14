import React from "react";
import { Table, Button } from "reactstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CampTable = (props) => (
  <Table hover striped={true}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
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
                color="warning"
                size="sm"
                onClick={() => {
                  props.editRow(camp);
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
                onClick={() => props.deleteCamp(camp.Id)}
                className="button muted-button"
              >
                <FiTrash2 />
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
