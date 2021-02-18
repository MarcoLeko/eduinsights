import React from "react";

export function Loader({ show }) {
  return show ? (
    <div className="spinner" style={{ display: "block !important" }}>
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  ) : null;
}
