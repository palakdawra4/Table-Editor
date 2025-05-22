// import React from "react";
import EditableTable from "./components/EditableTable";

const App = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name", editable: true},
    { key: "email", label: "Email", editable: true},
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Editable Table Example</h1>
      <EditableTable
        endpoint="https://jsonplaceholder.typicode.com/users"
        columns={columns}
      />
    </div>
  );
};

export default App;
