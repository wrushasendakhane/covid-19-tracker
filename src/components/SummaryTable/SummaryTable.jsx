import React from "react";
import "./SummaryTable.css";
import numeral from "numeral";
function SummaryTable({ data }) {
  return (
    <div className="summaryTable">
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.country}>
              <td>{item.country}</td>
              <td>{numeral(item.cases).format(0, 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(SummaryTable);
