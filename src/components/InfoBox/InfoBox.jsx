import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import numeral from "numeral";
import "./InfoBox.css";
function InfoBox({ title, cases, total, active, isRed, onSelect }) {
  return (
    <div className="infoBox">
      <Card
        onClick={onSelect}
        className={`infoBox ${active && "infoBox--selected"} ${
          isRed && "infoBox--red"
        }`}
      >
        <CardContent>
          <Typography color="textSecondary">{title}</Typography>
          <h2
            className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}
          >{`+${numeral(cases).format("0a")}`}</h2>
          <Typography
            className="infoBox__total"
            color="textSecondary"
          >{`+${numeral(total).format("0a")} Total`}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
