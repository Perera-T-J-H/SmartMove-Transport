import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card, Modal, Form, Alert } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';

const InventoryManagementPage = ({ currentUser }) => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', price: '', img: '' });
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  const openCreateModal = () => {
    setFormData({ id: '', name: '', price: '', img: '' });
    setIsEditing(false);
    setValidationError('');
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setFormData({ ...product, price: product.price.toString() });
    setIsEditing(true);
    setValidationError('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you certain you want to remove this catalog product item?")) {
      try {
        await deleteProduct(id, currentUser.role);
        loadProducts();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const parsedPrice = parseFloat(formData.price);

    if (!formData.name.trim() || !formData.img.trim()) {
      setValidationError("Product Name and Image URL pathways are strictly required.");
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setValidationError("Please enter a valid numeric value greater than 0 for pricing.");
      return;
    }

    try {
      if (isEditing) {
        await updateProduct(
          { id: formData.id, name: formData.name, price: parsedPrice, img: formData.img },
          currentUser.role
        );
      } else {
        await createProduct(
          { name: formData.name, price: parsedPrice, img: formData.img },
          currentUser.role
        );
      }
      setShowModal(false);
      loadProducts();
    } catch (err) {
      setValidationError(err.message);
    }
  };

  return (
    <div className="d-flex w-100">
      <AdminSidebar />
      <Container fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark m-0">Catalog Inventory Management</h2>
          </div>
          <Button style={{ backgroundColor: '#c58d5e', border: '0' }} className="rounded-0 px-4 py-2" onClick={openCreateModal}>
            + Create New Product
          </Button>
        </div>

        <Card className="border-0 shadow-sm rounded-3 p-3 bg-white">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr className="small text-muted text-uppercase" style={{ fontSize: '12px' }}>
                  <th>ID</th>
                  <th>Preview</th>
                  <th>Product Title</th>
                  <th>Price Point</th>
                  <th className="text-end px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td className="text-muted font-monospace fw-semibold">#{prod.id}</td>
                    <td>
                      <img src={prod.img} alt="" className="rounded border bg-light p-1" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
                    </td>
                    <td className="fw-medium text-dark">{prod.name}</td>
                    <td className="fw-bold text-secondary">Rs. {prod.price.toFixed(2)}</td>
                    <td className="text-end px-4">
                      <Button variant="link" className="text-primary p-0 me-3 text-decoration-none small fw-semibold" onClick={() => openEditModal(prod)}>Update</Button>
                      <Button variant="link" className="text-danger p-0 text-decoration-none small fw-semibold" onClick={() => handleDelete(prod.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="rounded-0">
        <Form onSubmit={handleSaveProduct}>
          <Modal.Header closeButton className="border-0 bg-light">
            <Modal.Title className="fw-bold fs-5 text-dark">{isEditing ? 'Update Product Details' : 'Create New Inventory Item'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            {validationError && <Alert variant="danger" className="py-2 small rounded-0">{validationError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-semibold">Product Name</Form.Label>
              <Form.Control type="text" className="rounded-0" placeholder="e.g. Cleansing Serum" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-semibold">Price (Rs.)</Form.Label>
              <Form.Control type="number" step="0.01" className="rounded-0" placeholder="e.g. 3500.00" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="small text-muted fw-semibold">Image Asset Link URL</Form.Label>
              <Form.Control type="text" className="rounded-0" placeholder="/Product1.jpg" value={formData.img} onChange={(e) => setFormData({...formData, img: e.target.value})} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 bg-light p-2">
            <Button variant="secondary" className="rounded-0 btn-sm px-3" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" style={{ backgroundColor: '#c58d5e', border: '0' }} className="rounded-0 btn-sm px-4">{isEditing ? 'Save Changes' : 'Publish Product'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryManagementPage;