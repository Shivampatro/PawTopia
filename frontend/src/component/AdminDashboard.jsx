import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from "../images/logo.png";
import '../index.css';
import { API_BASE_URL } from '../config';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    // States for data lists
    const [pets, setPets] = useState([]);
    const [accessories, setAccessories] = useState([]);
    const [users, setUsers] = useState([]);
    const [enquiries, setEnquiries] = useState([]);

    // States for Forms
    const [petForm, setPetForm] = useState({ id: '', name: '', age: '', gender: 'Male', category: 'Rescue Dog', image: '', description: '', price: 'Free' });
    const [accessoryForm, setAccessoryForm] = useState({ id: '', name: '', price: '', description: '', category: 'Food', image: '' });

    // Modals visibility
    const [showPetModal, setShowPetModal] = useState(false);
    const [showAccModal, setShowAccModal] = useState(false);
    const [petModalMode, setPetModalMode] = useState('add'); // 'add' or 'edit'
    const [accModalMode, setAccModalMode] = useState('add'); // 'add' or 'edit'

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    // Authentication Guard
    useEffect(() => {
        if (!token || currentUser.role !== 'admin') {
            navigate('/admin-login');
        } else {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const getHeaders = () => {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Pets
            const resPets = await fetch(`${API_BASE_URL}/api/pets`);
            const dataPets = await resPets.json();
            if (resPets.ok) setPets(dataPets);

            // Fetch Accessories
            const resAcc = await fetch(`${API_BASE_URL}/api/accessories`);
            const dataAcc = await resAcc.json();
            if (resAcc.ok) setAccessories(dataAcc);

            // Fetch Enquiries
            const resEnq = await fetch(`${API_BASE_URL}/api/contact`);
            const dataEnq = await resEnq.json();
            if (resEnq.ok) setEnquiries(dataEnq.submissions || []);

            // Fetch Users
            const resUsers = await fetch(`${API_BASE_URL}/api/auth/users`, { headers: getHeaders() });
            const dataUsers = await resUsers.json();
            if (resUsers.ok) setUsers(dataUsers.users || []);

        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setErrorMsg('Failed to load dashboard data. Check backend server.');
        } finally {
            setLoading(false);
        }
    };

    // Auto-clear messages
    useEffect(() => {
        if (successMsg || errorMsg) {
            const timer = setTimeout(() => {
                setSuccessMsg('');
                setErrorMsg('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [successMsg, errorMsg]);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    // ==========================================
    // PET CRUD Handlers
    // ==========================================
    const openAddPetModal = () => {
        setPetForm({ id: '', name: '', age: '', gender: 'Male', category: 'Rescue Dog', image: '', description: '', price: 'Free' });
        setPetModalMode('add');
        setShowPetModal(true);
    };

    const openEditPetModal = (pet) => {
        setPetForm({
            id: pet._id,
            name: pet.name,
            age: pet.age,
            gender: pet.gender,
            category: pet.category,
            image: pet.image,
            description: pet.description || '',
            price: pet.price || 'Free'
        });
        setPetModalMode('edit');
        setShowPetModal(true);
    };

    const handlePetSubmit = async (e) => {
        e.preventDefault();
        const url = petModalMode === 'add' 
            ? `${API_BASE_URL}/api/pets` 
            : `${API_BASE_URL}/api/pets/${petForm.id}`;
        
        const method = petModalMode === 'add' ? 'POST' : 'PUT';

        try {
            const response = await fetch(url, {
                method,
                headers: getHeaders(),
                body: JSON.stringify(petForm),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || 'Action failed');
                return;
            }

            setSuccessMsg(petModalMode === 'add' ? 'Pet added successfully!' : 'Pet updated successfully!');
            setShowPetModal(false);
            fetchData();
        } catch (err) {
            console.error(err);
            setErrorMsg('Server connection error.');
        }
    };

    const handleDeletePet = async (id) => {
        if (!window.confirm('Are you sure you want to delete this pet record?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/pets/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMsg(data.message || 'Delete failed');
                return;
            }

            setSuccessMsg('Pet record deleted successfully!');
            fetchData();
        } catch (err) {
            console.error(err);
            setErrorMsg('Server error while deleting pet.');
        }
    };

    // ==========================================
    // ACCESSORIES CRUD Handlers
    // ==========================================
    const openAddAccModal = () => {
        setAccessoryForm({ id: '', name: '', price: '', description: '', category: 'Food', image: '' });
        setAccModalMode('add');
        setShowAccModal(true);
    };

    const openEditAccModal = (acc) => {
        setAccessoryForm({
            id: acc._id,
            name: acc.name,
            price: acc.price,
            description: acc.description,
            category: acc.category,
            image: acc.image
        });
        setAccModalMode('edit');
        setShowAccModal(true);
    };

    const handleAccSubmit = async (e) => {
        e.preventDefault();
        const url = accModalMode === 'add' 
            ? `${API_BASE_URL}/api/accessories` 
            : `${API_BASE_URL}/api/accessories/${accessoryForm.id}`;
        
        const method = accModalMode === 'add' ? 'POST' : 'PUT';

        try {
            const response = await fetch(url, {
                method,
                headers: getHeaders(),
                body: JSON.stringify(accessoryForm),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || 'Action failed');
                return;
            }

            setSuccessMsg(accModalMode === 'add' ? 'Accessory added successfully!' : 'Accessory updated successfully!');
            setShowAccModal(false);
            fetchData();
        } catch (err) {
            console.error(err);
            setErrorMsg('Server connection error.');
        }
    };

    const handleDeleteAcc = async (id) => {
        if (!window.confirm('Are you sure you want to delete this accessory?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/accessories/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMsg(data.message || 'Delete failed');
                return;
            }

            setSuccessMsg('Accessory deleted successfully!');
            fetchData();
        } catch (err) {
            console.error(err);
            setErrorMsg('Server error while deleting accessory.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa', display: 'flex', flexDirection: 'column' }}>
            {/* Admin Header */}
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-2 shadow">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 d-flex align-items-center" to="/dashboard">
                        <img src={Logo} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
                        <span className="fw-bold">PawTopia Admin</span>
                    </Link>
                    <div className="navbar-nav d-flex flex-row align-items-center">
                        <span className="text-white-50 me-3 d-none d-sm-inline">Logged in as: <strong>{currentUser.firstName}</strong></span>
                        <Link to="/dashboard" className="btn btn-outline-info btn-sm me-2">Client View</Link>
                        <button onClick={handleLogout} className="btn btn-danger btn-sm">Log out</button>
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar Nav */}
                    <nav className="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse border-end" style={{ minHeight: 'calc(100vh - 56px)', paddingTop: '20px' }}>
                        <div className="position-sticky sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <button 
                                        onClick={() => setActiveTab('overview')} 
                                        className={`nav-link w-100 text-start border-0 py-2 px-3 rounded ${activeTab === 'overview' ? 'bg-primary text-white' : 'bg-transparent text-dark'}`}
                                        style={{ fontWeight: '500' }}
                                    >
                                        <i className="fa fa-dashboard me-2"></i> Overview
                                    </button>
                                </li>
                                <li className="nav-item mb-2">
                                    <button 
                                        onClick={() => setActiveTab('pets')} 
                                        className={`nav-link w-100 text-start border-0 py-2 px-3 rounded ${activeTab === 'pets' ? 'bg-primary text-white' : 'bg-transparent text-dark'}`}
                                        style={{ fontWeight: '500' }}
                                    >
                                        <i className="fa fa-paw me-2"></i> Manage Pets
                                    </button>
                                </li>
                                <li className="nav-item mb-2">
                                    <button 
                                        onClick={() => setActiveTab('accessories')} 
                                        className={`nav-link w-100 text-start border-0 py-2 px-3 rounded ${activeTab === 'accessories' ? 'bg-primary text-white' : 'bg-transparent text-dark'}`}
                                        style={{ fontWeight: '500' }}
                                    >
                                        <i className="fa fa-shopping-bag me-2"></i> Manage Accessories
                                    </button>
                                </li>
                                <li className="nav-item mb-2">
                                    <button 
                                        onClick={() => setActiveTab('enquiries')} 
                                        className={`nav-link w-100 text-start border-0 py-2 px-3 rounded ${activeTab === 'enquiries' ? 'bg-primary text-white' : 'bg-transparent text-dark'}`}
                                        style={{ fontWeight: '500' }}
                                    >
                                        <i className="fa fa-envelope me-2"></i> Enquiries ({enquiries.length})
                                    </button>
                                </li>
                                <li className="nav-item mb-2">
                                    <button 
                                        onClick={() => setActiveTab('users')} 
                                        className={`nav-link w-100 text-start border-0 py-2 px-3 rounded ${activeTab === 'users' ? 'bg-primary text-white' : 'bg-transparent text-dark'}`}
                                        style={{ fontWeight: '500' }}
                                    >
                                        <i className="fa fa-users me-2"></i> Users ({users.length})
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Main Content Area */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
                        {/* Messages Notifications */}
                        {successMsg && <div className="alert alert-success shadow-sm">{successMsg}</div>}
                        {errorMsg && <div className="alert alert-danger shadow-sm">{errorMsg}</div>}

                        {loading ? (
                            <div className="text-center p-5 mt-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading dashboard...</span>
                                </div>
                                <p className="mt-2 text-muted">Synchronizing databases...</p>
                            </div>
                        ) : (
                            <>
                                {/* TAB 1: OVERVIEW */}
                                {activeTab === 'overview' && (
                                    <div>
                                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom">
                                            <h1 className="h2 text-dark font-weight-bold">Dashboard Overview</h1>
                                            <div className="text-muted">Status: Live Sync</div>
                                        </div>

                                        {/* Statistics Row */}
                                        <div className="row g-3 mb-4">
                                            <div className="col-12 col-sm-6 col-lg-3">
                                                <div className="card shadow-sm border-0 bg-primary text-white">
                                                    <div className="card-body d-flex justify-content-between align-items-center p-4">
                                                        <div>
                                                            <h3 className="fw-bold mb-1">{pets.length}</h3>
                                                            <div className="small text-white-50 text-uppercase">Total Pets</div>
                                                        </div>
                                                        <i className="fa fa-paw fa-3x text-white-50"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-lg-3">
                                                <div className="card shadow-sm border-0 bg-success text-white">
                                                    <div className="card-body d-flex justify-content-between align-items-center p-4">
                                                        <div>
                                                            <h3 className="fw-bold mb-1">{accessories.length}</h3>
                                                            <div className="small text-white-50 text-uppercase">Accessories</div>
                                                        </div>
                                                        <i className="fa fa-shopping-bag fa-3x text-white-50"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-lg-3">
                                                <div className="card shadow-sm border-0 bg-warning text-white">
                                                    <div className="card-body d-flex justify-content-between align-items-center p-4">
                                                        <div>
                                                            <h3 className="fw-bold mb-1">{enquiries.length}</h3>
                                                            <div className="small text-white-50 text-uppercase">User Enquiries</div>
                                                        </div>
                                                        <i className="fa fa-envelope fa-3x text-white-50"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-lg-3">
                                                <div className="card shadow-sm border-0 bg-info text-white">
                                                    <div className="card-body d-flex justify-content-between align-items-center p-4">
                                                        <div>
                                                            <h3 className="fw-bold mb-1">{users.length}</h3>
                                                            <div className="small text-white-50 text-uppercase">Registered Users</div>
                                                        </div>
                                                        <i className="fa fa-users fa-3x text-white-50"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quick Logs */}
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <div className="card shadow-sm border-0">
                                                    <div className="card-header bg-white py-3 fw-bold border-bottom">Recent Enquiries</div>
                                                    <div className="card-body p-0">
                                                        <div className="list-group list-group-flush">
                                                            {enquiries.slice(0, 3).map((enq, index) => (
                                                                <div className="list-group-item p-3" key={index}>
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <h6 className="mb-1 fw-bold text-dark">{enq.name}</h6>
                                                                        <small className="text-muted">{new Date(enq.createdAt).toLocaleDateString()}</small>
                                                                    </div>
                                                                    <p className="mb-0 text-muted small">{enq.message.substring(0, 80)}...</p>
                                                                </div>
                                                            ))}
                                                            {enquiries.length === 0 && <p className="text-center p-4 mb-0 text-muted">No messages received yet.</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="card shadow-sm border-0">
                                                    <div className="card-header bg-white py-3 fw-bold border-bottom">System Quick Links</div>
                                                    <div className="card-body p-4 text-center">
                                                        <div className="row">
                                                            <div className="col-6 mb-2">
                                                                <button onClick={openAddPetModal} className="btn btn-outline-primary w-100 py-3"><i className="fa fa-plus-circle me-1"></i> Add New Pet</button>
                                                            </div>
                                                            <div className="col-6 mb-2">
                                                                <button onClick={openAddAccModal} className="btn btn-outline-success w-100 py-3"><i className="fa fa-plus-circle me-1"></i> Add Accessory</button>
                                                            </div>
                                                            <div className="col-12 mt-2">
                                                                <Link to="/pet_adop" className="btn btn-light w-100 py-2 border">View Adoption Page</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 2: MANAGE PETS */}
                                {activeTab === 'pets' && (
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center pt-2 pb-2 mb-3 border-bottom">
                                            <h2 className="h4 font-weight-bold">Pets Registry</h2>
                                            <button onClick={openAddPetModal} className="btn btn-primary btn-sm"><i className="fa fa-plus me-1"></i> Add New Pet</button>
                                        </div>

                                        <div className="table-responsive bg-white rounded shadow-sm">
                                            <table className="table table-hover align-middle mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>Age</th>
                                                        <th>Gender</th>
                                                        <th>Price/Fee</th>
                                                        <th className="text-end">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pets.map(pet => (
                                                        <tr key={pet._id}>
                                                            <td>
                                                                <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', overflow: 'hidden' }}>
                                                                    <img 
                                                                        src={
                                                                            pet.image.startsWith('http') 
                                                                                ? pet.image 
                                                                                : `https://raw.githubusercontent.com/jayeshbhavsar03/pawtopia/main/src/images/${pet.image}`
                                                                        } 
                                                                        alt={pet.name} 
                                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                        onError={(e) => {
                                                                            e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&q=80';
                                                                        }}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="fw-bold">{pet.name}</td>
                                                            <td><span className="badge bg-secondary">{pet.category}</span></td>
                                                            <td>{pet.age}</td>
                                                            <td>{pet.gender}</td>
                                                            <td>{pet.price}</td>
                                                            <td className="text-end">
                                                                <button onClick={() => openEditPetModal(pet)} className="btn btn-info btn-sm me-1"><i className="fa fa-edit"></i></button>
                                                                <button onClick={() => handleDeletePet(pet._id)} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {pets.length === 0 && (
                                                        <tr>
                                                            <td colSpan="7" className="text-center py-4 text-muted">No pets available.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 3: MANAGE ACCESSORIES */}
                                {activeTab === 'accessories' && (
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center pt-2 pb-2 mb-3 border-bottom">
                                            <h2 className="h4 font-weight-bold">Accessories Inventory</h2>
                                            <button onClick={openAddAccModal} className="btn btn-success btn-sm"><i className="fa fa-plus me-1"></i> Add Accessory</button>
                                        </div>

                                        <div className="table-responsive bg-white rounded shadow-sm">
                                            <table className="table table-hover align-middle mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>Price</th>
                                                        <th>Description</th>
                                                        <th className="text-end">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {accessories.map(acc => (
                                                        <tr key={acc._id}>
                                                            <td>
                                                                <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', overflow: 'hidden' }}>
                                                                    <img 
                                                                        src={acc.image} 
                                                                        alt={acc.name} 
                                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                        onError={(e) => {
                                                                            e.target.src = 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=100&q=80';
                                                                        }}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="fw-bold">{acc.name}</td>
                                                            <td><span className="badge bg-success">{acc.category}</span></td>
                                                            <td className="fw-bold">${acc.price.toFixed(2)}</td>
                                                            <td className="text-truncate" style={{ maxWidth: '250px' }}>{acc.description}</td>
                                                            <td className="text-end">
                                                                <button onClick={() => openEditAccModal(acc)} className="btn btn-info btn-sm me-1"><i className="fa fa-edit"></i></button>
                                                                <button onClick={() => handleDeleteAcc(acc._id)} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {accessories.length === 0 && (
                                                        <tr>
                                                            <td colSpan="6" className="text-center py-4 text-muted">No accessories in inventory.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 4: ENQUIRIES */}
                                {activeTab === 'enquiries' && (
                                    <div>
                                        <div className="pt-2 pb-2 mb-3 border-bottom">
                                            <h2 className="h4 font-weight-bold">User Contact Enquiries</h2>
                                        </div>

                                        <div className="bg-white rounded shadow-sm p-3">
                                            {enquiries.map((enq, index) => (
                                                <div className="card mb-3 border border-light" key={enq._id || index}>
                                                    <div className="card-header d-flex justify-content-between align-items-center bg-light">
                                                        <div>
                                                            <strong className="text-dark">{enq.name}</strong> 
                                                            <span className="text-muted small ms-2">&lt;{enq.email}&gt;</span>
                                                            {enq.phoneNumber && <span className="text-muted small ms-2">| Phone: {enq.phoneNumber}</span>}
                                                        </div>
                                                        <span className="small text-muted">{new Date(enq.createdAt).toLocaleString()}</span>
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="card-text text-dark" style={{ whiteSpace: 'pre-line' }}>{enq.message}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {enquiries.length === 0 && <p className="text-center text-muted py-5">No enquiries available.</p>}
                                        </div>
                                    </div>
                                )}

                                {/* TAB 5: REGISTERED USERS */}
                                {activeTab === 'users' && (
                                    <div>
                                        <div className="pt-2 pb-2 mb-3 border-bottom">
                                            <h2 className="h4 font-weight-bold">Registered Users Panel</h2>
                                        </div>

                                        <div className="table-responsive bg-white rounded shadow-sm">
                                            <table className="table table-hover align-middle mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Role</th>
                                                        <th>Registration Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map(user => (
                                                        <tr key={user._id}>
                                                            <td className="fw-bold">{user.firstName} {user.lastName}</td>
                                                            <td>{user.email}</td>
                                                            <td>
                                                                <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                                                    {user.role}
                                                                </span>
                                                            </td>
                                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                                        </tr>
                                                    ))}
                                                    {users.length === 0 && (
                                                        <tr>
                                                            <td colSpan="4" className="text-center py-4 text-muted">No users found.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>

            {/* PETS MODAL OVERLAY */}
            {showPetModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', padding: '15px'
                }}>
                    <div className="card shadow" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">{petModalMode === 'add' ? 'Add New Pet' : 'Edit Pet Details'}</h5>
                            <button onClick={() => setShowPetModal(false)} className="btn-close btn-close-white" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handlePetSubmit}>
                            <div className="card-body text-dark">
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <label className="form-label small mb-1 fw-bold">Name *</label>
                                        <input type="text" className="form-control" value={petForm.name} onChange={(e) => setPetForm({ ...petForm, name: e.target.value })} required />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <label className="form-label small mb-1 fw-bold">Age *</label>
                                        <input type="text" className="form-control" placeholder="e.g. 2 Month" value={petForm.age} onChange={(e) => setPetForm({ ...petForm, age: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <label className="form-label small mb-1 fw-bold">Gender *</label>
                                        <select className="form-select" value={petForm.gender} onChange={(e) => setPetForm({ ...petForm, gender: e.target.value })}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <label className="form-label small mb-1 fw-bold">Category *</label>
                                        <select className="form-select" value={petForm.category} onChange={(e) => setPetForm({ ...petForm, category: e.target.value })}>
                                            <option value="Rescue Dog">Rescue Dog</option>
                                            <option value="Breed Dog">Breed Dog</option>
                                            <option value="Rescue Cat">Rescue Cat</option>
                                            <option value="Breed Cat">Breed Cat</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small mb-1 fw-bold">Image URL or Local Asset Name (e.g. ap1.jpg) *</label>
                                    <input type="text" className="form-control" value={petForm.image} onChange={(e) => setPetForm({ ...petForm, image: e.target.value })} required placeholder="URL or ap1.jpg" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small mb-1 fw-bold">Adoption Price/Fee</label>
                                    <input type="text" className="form-control" value={petForm.price} onChange={(e) => setPetForm({ ...petForm, price: e.target.value })} placeholder="e.g. Free or $100" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small mb-1 fw-bold">Description</label>
                                    <textarea className="form-control" rows="3" value={petForm.description} onChange={(e) => setPetForm({ ...petForm, description: e.target.value })}></textarea>
                                </div>
                            </div>
                            <div className="card-footer bg-light d-flex justify-content-end">
                                <button type="button" onClick={() => setShowPetModal(false)} className="btn btn-secondary btn-sm me-2">Cancel</button>
                                <button type="submit" className="btn btn-primary btn-sm">{petModalMode === 'add' ? 'Add Pet' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ACCESSORIES MODAL OVERLAY */}
            {showAccModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', padding: '15px'
                }}>
                    <div className="card shadow" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">{accModalMode === 'add' ? 'Add New Accessory' : 'Edit Accessory Details'}</h5>
                            <button onClick={() => setShowAccModal(false)} className="btn-close btn-close-white" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleAccSubmit}>
                            <div className="card-body text-dark">
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <label className="form-label small mb-1 fw-bold">Name *</label>
                                        <input type="text" className="form-control" value={accessoryForm.name} onChange={(e) => setAccessoryForm({ ...accessoryForm, name: e.target.value })} required />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <label className="form-label small mb-1 fw-bold">Price ($) *</label>
                                        <input type="number" step="0.01" className="form-control" value={accessoryForm.price} onChange={(e) => setAccessoryForm({ ...accessoryForm, price: parseFloat(e.target.value) || 0 })} required />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small mb-1 fw-bold">Category *</label>
                                    <select className="form-select" value={accessoryForm.category} onChange={(e) => setAccessoryForm({ ...accessoryForm, category: e.target.value })}>
                                        <option value="Food">Food</option>
                                        <option value="Toy">Toy</option>
                                        <option value="Collars & Leashes">Collars & Leashes</option>
                                        <option value="Beds & Bowls">Beds & Bowls</option>
                                        <option value="Grooming">Grooming</option>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small mb-1 fw-bold">Image URL *</label>
                                    <input type="text" className="form-control" value={accessoryForm.image} onChange={(e) => setAccessoryForm({ ...accessoryForm, image: e.target.value })} required placeholder="e.g. Unsplash URL" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small mb-1 fw-bold">Description *</label>
                                    <textarea className="form-control" rows="3" value={accessoryForm.description} onChange={(e) => setAccessoryForm({ ...accessoryForm, description: e.target.value })} required></textarea>
                                </div>
                            </div>
                            <div className="card-footer bg-light d-flex justify-content-end">
                                <button type="button" onClick={() => setShowAccModal(false)} className="btn btn-secondary btn-sm me-2">Cancel</button>
                                <button type="submit" className="btn btn-success btn-sm">{accModalMode === 'add' ? 'Add Accessory' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
