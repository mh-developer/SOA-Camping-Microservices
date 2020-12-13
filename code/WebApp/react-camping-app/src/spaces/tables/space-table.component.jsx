import React from "react";

const SpaceTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Oznaka</th>
        <th>Lokacija</th>
        <th>Namen</th>
        <th>Actions</th>
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
              <button
                onClick={() => {
                  props.editRow(spaces);
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteSpace(spaces._id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No spaces</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default SpaceTable;
