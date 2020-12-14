import React from "react";
import { Table, Button } from "reactstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ReservationTable = (props) => (
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
      {props.reservations.length > 0 ? (
        props.reservations.map((reservations) => (
          <tr key={reservations._id}>
            <td>{reservations.oznaka}</td>
            <td>{reservations.lokacija}</td>
            <td>{reservations.namen}</td>
            <td>
              <Button
                color="warning"
                size="sm"
                onClick={() => {
                  props.editRow(reservations);
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
                onClick={() => props.deleteReservation(reservations._id)}
                className="button muted-button"
              >
                <FiTrash2 />
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No reservations</td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default ReservationTable;
