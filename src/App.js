import React, { useState, useEffect } from "react";

export default function ProductCRUD() {
  const categoryList = ["Vegetables", "Fruits & Nuts", "Dairy & Creams", "Packaged Food", "Staples"];
  
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    category: categoryList[0],
    isActive: false,
    description: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = formData;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      setProducts([...products, formData]);
    }

    setFormData({ name: "", price: "", oldPrice: "", category: categoryList[0], isActive: false, description: "" });
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{editIndex !== null ? "Edit Product" : "Add Product"}</h2>
      <div style={styles.form}>
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} style={styles.input} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} style={styles.input} required />
        <input type="number" name="oldPrice" placeholder="Old Price" value={formData.oldPrice} onChange={handleChange} style={styles.input} />
        <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
          {categoryList.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <label style={styles.checkboxContainer}>
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
          Is Active
        </label>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} style={styles.textarea}></textarea>
        <button onClick={handleSubmit} style={styles.button}>{editIndex !== null ? "Update" : "Add"}</button>
      </div>

      <h2 style={styles.heading}>Product List</h2>
      <ul style={styles.list}>
        {products.map((product, index) => (
          <li key={index} style={styles.listItem}>
            <div>
              <strong>{product.name}</strong> - ₹{product.price} (Old: ₹{product.oldPrice || "N/A"})  
              <br />
              <span>Category: {product.category}</span> | <span>Status: {product.isActive ? "Active" : "Inactive"}</span>
              <br />
              <span>Description: {product.description}</span>
            </div>
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
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    height: "60px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
    border: "none",
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
    borderRadius: "4px",
    backgroundColor: "#ffc107",
    color: "white",
    cursor: "pointer",
    border: "none",
  },
  deleteButton: {
    padding: "5px 10px",
    borderRadius: "4px",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
    border: "none",
  },
};
