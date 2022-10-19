import React from 'react';
import Row from './Row'

function Table() {
  return (
    <table className="table">
      <tr>
        <td>Season</td>
        <td>Age</td>
        <td>Team</td>
        <td>Country</td>
        <td>Competition</td>
        <td>Games</td>
        <td>Minutes</td>
        <td>Goals</td>
        <td>Assists</td>
        <td>Goals/90</td>
      </tr>
      <Row></Row>
    </table>
  )
}

export default Table;