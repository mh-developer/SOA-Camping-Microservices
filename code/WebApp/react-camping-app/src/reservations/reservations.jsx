import React, { useState, Fragment, useEffect, useCallback } from "react";
import AddReservationForm from "./forms/add-reservation-form.component";
import EditReservationForm from "./forms/edit-reservation-form.component";
import ReservationTable from "./tables/reservation-table.component";
import { reservationModel } from "./shared/reservation.model";
import { ReservationService } from "./shared/reservation.service";
import { Row, Col } from "reactstrap";

const Reservations = () => {
  // Setting state
  const [reservations, setReservations] = useState([]);
  const [currentReservation, setCurrentReservation] = useState(
    reservationModel
  );
  const [editing, setEditing] = useState(false);

  const loadreservationsData = useCallback(() => {
    ReservationService.getAll()
      .then((response) => {
        if (response.data) {
          setReservations(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    loadreservationsData();
  }, [loadreservationsData]);
  // CRUD operations
  const addReservation = (reservation) => {
    const createReservation = {
      title: reservation.title,
      description: reservation.description,
      from_date: reservation.from_date,
      to_date: reservation.to_date,
      type_of_camping: reservation.type_of_camping,
      status: reservation.status,
    };

    ReservationService.create(createReservation)
      .then((response) => {
        if (response.data) {
          setReservations([...reservations, response.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteReservation = (id) => {
    setEditing(false);
    ReservationService.remove(id)
      .then((response) => {
        setReservations(
          reservations.filter((reservation) => reservation._id.$oid !== id)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateReservation = (id, updatedReservation) => {
    setEditing(false);
    console.log(id);
    console.log(updateReservation);
    ReservationService.update(id, updatedReservation)
      .then((response) => {
        setReservations(
          reservations.map((reservation) =>
            reservation._id.$oid === id ? updatedReservation : reservation
          )
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editRow = (reservation) => {
    setEditing(true);

    setCurrentReservation({ ...reservation });
  };

  return (
    <div className="container content">
      <h1 className="text-center page-title">Reservations</h1>
      <Row className="d-flex justify-content-between">
        <Col md={4}>
          {editing ? (
            <Fragment>
              <h2>Edit reservation</h2>
              <EditReservationForm
                editing={editing}
                setEditing={setEditing}
                currentReservation={currentReservation}
                updateReservation={updateReservation}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add new reservation</h2>
              <AddReservationForm addReservation={addReservation} />
            </Fragment>
          )}
        </Col>

        <Col md={8} className="tableCol">
          <ReservationTable
            reservations={reservations}
            editRow={editRow}
            deleteReservation={deleteReservation}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Reservations;
