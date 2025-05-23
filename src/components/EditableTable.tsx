import React, { useEffect, useState } from "react";

type Column = {
  key: string;
  label: string;
  editable?: boolean;
  type?: "text" | "date";
};

type EditableTableProps = {
  endpoint: string;
  columns: Column[];
};

const EditableTable: React.FC<EditableTableProps> = ({ endpoint, columns }) => {
  const [data, setData] = useState<any[]>([]);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<any>({});

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setData(data.users)) // Note: `users` is the key in the response
      .catch((err) => console.error("Failed to fetch:", err));
  }, [endpoint]);

  const handleEditClick = (id: number) => {
    setEditRowId(id);
    const row = data.find((item) => item.id === id);
    setEditedRow({ ...row });
  };

  const handleChange = (key: string, value: string) => {
    setEditedRow((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSaveClick = () => {
    const updatedData = data.map((item) =>
      item.id === editRowId ? editedRow : item
    );
    setData(updatedData);
    setEditRowId(null);
  };

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={{ border: "1px solid black", padding: "8px" }}>
              {col.label}
            </th>
          ))}
          <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col.key} style={{ border: "1px solid black", padding: "8px" }}>
                {editRowId === row.id && col.editable ? (
                  col.type === "date" ? (
                    <input
                      type="date"
                      value={editedRow[col.key]?.slice(0, 10) || ""}
                      onChange={(e) => handleChange(col.key, e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      value={editedRow[col.key] || ""}
                      onChange={(e) => handleChange(col.key, e.target.value)}
                    />
                  )
                ) : col.type === "date" ? (
                  new Date(row[col.key]).toLocaleDateString()
                ) : (
                  row[col.key]
                )}
              </td>
            ))}
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {editRowId === row.id ? (
                <button onClick={handleSaveClick}>Save</button>
              ) : (
                <button onClick={() => handleEditClick(row.id)}>Edit</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
