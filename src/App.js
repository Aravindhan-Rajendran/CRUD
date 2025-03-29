import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (newItem.trim() === "") return;
    if (editIndex !== null) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      // Add new item
      setItems([...items, newItem]);
    }
    setNewItem("");
  };

  const handleEdit = (index) => {
    setNewItem(items[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>React CRUD App</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item..."
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.button}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul style={styles.list}>
        {items.map((item, index) => (
          <li key={index} style={styles.listItem}>
            {item}
            <div>
              <button onClick={() => handleEdit(index)} style={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(index)} style={styles.deleteButton}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "10px",
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#fff",
    marginBottom: "5px",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  editButton: {
    marginRight: "5px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#ffc107",
    color: "white",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
  },
};
