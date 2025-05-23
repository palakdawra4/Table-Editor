import React from "react";
import EditableTable from "./components/EditableTable";

const App: React.FC = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "firstName", label: "First Name", editable: true },
    { key: "lastName", label: "Last Name", editable: true },
    { key: "maidenName", label: "Maiden Name", editable: true },
    { key: "email", label: "Email", editable: true },
    { key: "birthDate", label: "Birth Date", editable: true, type: "date" }
  ];

  return (
    <div>
      <h2>User Table</h2>
      <EditableTable
        endpoint="https://dummyjson.com/users"
        columns={columns}
      />
    </div>
  );
};

export default App;
