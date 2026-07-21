import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../images/logo.png";
import '../index.css';
import { API_BASE_URL } from '../config';

export default function Accessories() {
    const navigate = useNavigate();
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // Purchase Modal State
    const [selectedItem, setSelectedItem] = useState(null);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user && user.role === 'admin';

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/accessories`);
                const data = await response.json();
                if (response.ok) {
                    setAccessories(data);
                }
            } catch (error) {
                console.error('Error fetching accessories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAccessories();
    }, []);

    // Filter logic
    const filteredItems = accessories.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleBuyNowClick = (item) => {
        setSelectedItem(item);
        setPurchaseSuccess(false);
        setShowBuyModal(true);
    };

    const handleSimulatePurchase = () => {
        setPurchaseSuccess(true);
        setTimeout(() => {
            setShowBuyModal(false);
            setSelectedItem(null);
            setPurchaseSuccess(false);
        }, 3000);
    };

    const handleInquireClick = (item) => {
        setShowBuyModal(false);
        navigate('/contact', {
            state: {
                prefilledMessage: `Hello, I would like to inquire about buying the accessory: "${item.name}" (Category: ${item.category}, Price: $${item.price.toFixed(2)}). Please guide me on payment and delivery options!`
            }
        });
    };

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            {/* Navbar */}
            <header className="header_section">
                <div className="container">
                    <nav className="navbar navbar-expand-lg custom_nav-container">
                        <Link className="navbar-brand" to="/dashboard">
                            <img src={Logo} alt="Logo" />
                            <span>PawTopia</span>
                        </Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className=""> </span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard"> Home </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about"> About </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/pet_adop"> Pets Category </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/accessories"> Accessories </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link pr-lg-0" to="/contact"> Contact us</Link>
                                </li>
                                {isAdmin && (
                                    <li className="nav-item">
                                        <Link className="nav-link text-warning fw-bold" to="/admin/dashboard">Admin Panel</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <Link to="/" className="btn btn-secondary text-white ms-2">Log out</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Accessories Header Section */}
            <section className="inner_page_head" style={{
                background: 'linear-gradient(135deg, #f7d070, #f1a139)',
                color: '#fff',
                padding: '40px 0',
                textAlign: 'center'
            }}>
                <div className="container_fluid">
                    <h1 className="fw-bold mb-2" style={{ color: '#fff' }}>Pet Accessories & Supplies</h1>
                    <p className="lead mb-0">Premium nutrition, toys, beds, and grooming for your furry companions</p>
                </div>
            </section>

            {/* Filter and Browse Section */}
            <section className="layout_padding" style={{ padding: '40px 0' }}>
                <div className="container">
                    <div className="row mb-4 align-items-center">
                        {/* Search Bar */}
                        <div className="col-md-5 mb-3 mb-md-0">
                            <div className="input-group shadow-sm">
                                <span className="input-group-text bg-white border-end-0 text-muted">
                                    <i className="fa fa-search"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control border-start-0 py-2" 
                                    placeholder="Search accessories (e.g. food, brush, bed)..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Category Filters */}
                        <div className="col-md-7 text-md-end">
                            <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                                {['All', 'Food', 'Toy', 'Collars & Leashes', 'Beds & Bowls', 'Grooming'].map(cat => (
                                    <button 
                                        key={cat} 
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`btn btn-sm px-3 rounded-pill border shadow-sm ${selectedCategory === cat ? 'btn-warning text-dark fw-bold' : 'btn-light text-dark'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Accessories Grid */}
                    {loading ? (
                        <div className="text-center p-5">
                            <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Syncing inventory...</span>
                            </div>
                            <p className="mt-2 text-muted">Loading premium products...</p>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="text-center p-5 bg-white rounded shadow-sm border">
                            <i className="fa fa-shopping-bag fa-4x text-muted mb-3"></i>
                            <h4 className="fw-bold">No Products Found</h4>
                            <p className="text-muted">We couldn't find any accessories matching your search/filters.</p>
                        </div>
                    ) : (
                        <div className="row g-4 justify-content-center">
                            {filteredItems.map(item => (
                                <div className="col-12 col-sm-6 col-md-4" key={item._id}>
                                    <div className="card h-100 shadow-sm border-0 transition-hover" style={{ transition: 'all 0.3s ease', borderRadius: '12px' }}>
                                        <div style={{ height: '220px', overflow: 'hidden', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', background: '#eceeef' }}>
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=500&q=80';
                                                }}
                                            />
                                        </div>
                                        <div className="card-body d-flex flex-column text-dark">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="badge bg-warning text-dark small fw-bold">{item.category}</span>
                                                <h5 className="fw-bold mb-0 text-success">${item.price.toFixed(2)}</h5>
                                            </div>
                                            <h5 className="card-title fw-bold text-dark mb-2">{item.name}</h5>
                                            <p className="card-text text-muted small flex-grow-1">{item.description}</p>
                                            <button 
                                                onClick={() => handleBuyNowClick(item)}
                                                className="btn btn-warning w-100 fw-bold mt-3 text-dark shadow-sm"
                                            >
                                                Buy Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Simulated Buy/Checkout Modal */}
            {showBuyModal && selectedItem && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', padding: '15px'
                }}>
                    <div className="card shadow border-0" style={{ width: '100%', maxWidth: '500px', borderRadius: '12px' }}>
                        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center" style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                            <h5 className="mb-0 fw-bold"><i className="fa fa-shopping-cart me-2"></i> Checkout Summary</h5>
                            <button onClick={() => setShowBuyModal(false)} className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="card-body text-dark">
                            {purchaseSuccess ? (
                                <div className="text-center p-4">
                                    <i className="fa fa-check-circle fa-4x text-success mb-3 animate-bounce"></i>
                                    <h4 className="fw-bold text-success">Order Successful!</h4>
                                    <p className="text-muted">Thank you for shopping with PawTopia! An order confirmation and invoice have been dispatched to your email: <strong>{user.email || 'your email'}</strong></p>
                                </div>
                            ) : (
                                <>
                                    <div className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                                        <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                                        <div className="ms-3">
                                            <h6 className="fw-bold mb-1">{selectedItem.name}</h6>
                                            <span className="badge bg-secondary mb-1">{selectedItem.category}</span>
                                            <div className="fw-bold text-success">${selectedItem.price.toFixed(2)}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="mb-3 small">
                                        <div className="d-flex justify-content-between mb-1">
                                            <span>Subtotal:</span>
                                            <span>${selectedItem.price.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span>Shipping:</span>
                                            <span className="text-success fw-bold">FREE Adoption Promo</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span>Est. Taxes:</span>
                                            <span>$0.00</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between mb-1 fw-bold text-uppercase fs-6">
                                            <span>Total:</span>
                                            <span className="text-success">${selectedItem.price.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {user.firstName ? (
                                        <div className="p-3 bg-light rounded small border mb-3 text-start">
                                            <div className="fw-bold mb-1 text-dark"><i className="fa fa-user me-1"></i> Shipping Recipient:</div>
                                            <div>{user.firstName} {user.lastName}</div>
                                            <div>Email: {user.email}</div>
                                            <div className="text-muted mt-1" style={{ fontSize: '11px' }}>Will ship to registered account profile address.</div>
                                        </div>
                                    ) : (
                                        <div className="alert alert-warning py-2 small">
                                            <i className="fa fa-exclamation-triangle"></i> You are checking out as a guest. Let's pre-fill contact to complete order details.
                                        </div>
                                    )}

                                    <div className="row g-2 mt-2">
                                        <div className="col-6">
                                            <button 
                                                onClick={handleSimulatePurchase}
                                                className="btn btn-warning w-100 fw-bold py-2 text-dark shadow-sm"
                                            >
                                                Confirm Purchase
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button 
                                                onClick={() => handleInquireClick(selectedItem)}
                                                className="btn btn-outline-secondary w-100 fw-bold py-2"
                                            >
                                                Send Inquiry
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="footer_section mt-5" style={{ background: '#333', color: '#fff', padding: '20px 0' }}>
                <div className="container text-center">
                    <p className="mb-0 text-white-50">&copy; All Rights Reserved By PawTopia Accessories Catalog</p>
                </div>
            </footer>
        </div>
    );
}
