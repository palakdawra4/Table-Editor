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
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<any>({});

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Fetch error:", err));
  }, [endpoint]);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedRow({ ...data[index] });
  };

  const handleChange = (key: string, value: string) => {
    setEditedRow((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (editIndex === null) return;
    const updated = [...data];
    updated[editIndex] = editedRow;
    setData(updated);
    setEditIndex(null);
  };

  const formatDateForInput = (dateString: string) => {
    // Ensure date string is in YYYY-MM-DD format for input[type=date]
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <table border={1} cellPadding={8} cellSpacing={0} style={{ width: "100%" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.key}>
                {editIndex === idx && col.editable ? (
                  col.type === "date" ? (
                    <input
                      type="date"
                      value={formatDateForInput(editedRow[col.key] || "")}
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
            <td>
              {editIndex === idx ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={() => handleEdit(idx)}>Edit</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
