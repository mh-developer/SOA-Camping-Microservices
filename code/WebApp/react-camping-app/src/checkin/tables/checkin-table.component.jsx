import React from "react";
import { Table, Button } from "reactstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CheckinTable = (props) => (
  <Table hover striped={true}>
    <thead>
      <tr>
        <th>Ime</th>
        <th>Info</th>
        <th>Status</th>

      </tr>
    </thead>
    <tbody>
      {props.checkin.length > 0 ? (
        props.checkin.map((checkin, i) => (
          <tr key={i}>
            {console.log(checkin)}
            <td>{checkin.name}</td>
            <td>{checkin.no_people}</td>
            <td>{checkin.date}</td>
            <td>
              <Button
                color="warning"
                size="sm"
                onClick={() => {
                  props.editRow(checkin);
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
                onClick={() => props.deleteCheckin(checkin._id)}
                className="button muted-button"
              >
                <FiTrash2 />
              </Button>
            </td>
          </tr>
        ))
      ) : (
          <tr>
            <td colSpan={3}>No Checkins</td>
          </tr>
        )}
    </tbody>
  </Table>
);

export default CheckinTable;
