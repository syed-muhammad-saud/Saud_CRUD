import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`http://localhost:5000/users/${formData._id}`, formData);
        setMessage("User updated successfully!");
      } else {
        await axios.post("http://localhost:5000/users", formData);
        setMessage("User added successfully!");
      }
      setFormData({ name: "", email: "", phone: "" });
      fetchUsers();
    } catch (error) {
      setMessage("Error occurred while saving data!");
    }
  };

  const handleEdit = (user) => setFormData(user);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setMessage("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      setMessage("Error occurred while deleting user!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Management CRUD</h1>

      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {formData._id ? "Update" : "Add"} User
            </button>
          </form>
        </div>
      </div>

      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
