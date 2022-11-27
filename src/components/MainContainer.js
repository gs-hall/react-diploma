import React from "react";

export default function MainContainer(props) {
  return (
    <main className="container">
      <div class="row">
        <div class="col">
          { props.children }
        </div>
      </div>
    </main>
  );
};