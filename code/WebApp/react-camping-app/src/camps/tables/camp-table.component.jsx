import React from "react";

const CampTable = (props) => (
  <table>
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
              <button
                onClick={() => {
                  props.editRow(camp);
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteCamp(camp.Id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No camps</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default CampTable;
