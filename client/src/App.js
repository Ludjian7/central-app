import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Material UI imports
import { 
  AppBar, Toolbar, Typography, Container, Paper, Grid, Button, 
  Card, CardContent, CardHeader, List, ListItem, ListItemText,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Divider, CircularProgress, Box
} from '@mui/material';

// Simple styling
const styles = {
  container: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  button: {
    marginTop: '1rem'
  }
};

// Home component
const Home = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('/api/dashboard/summary');
        const data = await response.json();
        if (data.success) {
          setSummary(data.data);
        } else {
          setError('Failed to load data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper style={{ padding: '1rem', backgroundColor: '#fff3f0' }}>
        <Typography color="error">Error: {error}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '1rem' }}
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Paper>
    );
  }

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Sales summary */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} style={{ padding: '1rem' }}>
            <Typography style={styles.title}>
              Sales Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Total Sales</Typography>
                <Typography variant="h5">{summary?.totalSales || 0}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="primary">Paid</Typography>
                <Typography variant="h5" color="primary">{summary?.paidSales || 0}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="warning.main">Pending</Typography>
                <Typography variant="h5" color="warning.main">{summary?.pendingSales || 0}</Typography>
              </Grid>
            </Grid>
            <Divider style={{ margin: '1rem 0' }} />
            <Typography variant="subtitle2">Total Revenue</Typography>
            <Typography variant="h5" color="success.main">
              Rp {summary?.totalRevenue?.toLocaleString() || 0}
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              component={Link}
              to="/sales"
              style={styles.button}
            >
              View Sales
            </Button>
          </Paper>
        </Grid>

        {/* Product summary */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} style={{ padding: '1rem' }}>
            <Typography style={styles.title}>
              Inventory Status
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Total Products</Typography>
                <Typography variant="h5">
                  {summary?.recentSales?.length || 0} items
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="error">Low Stock Items</Typography>
                <Typography variant="h5" color="error">
                  {summary?.lowStockProducts || 0} products
                </Typography>
              </Grid>
            </Grid>
            <Divider style={{ margin: '1rem 0' }} />
            <Button 
              variant="outlined" 
              color="primary" 
              component={Link}
              to="/products"
              style={styles.button}
            >
              View Inventory
            </Button>
          </Paper>
        </Grid>

        {/* Recent sales */}
        <Grid item xs={12}>
          <Paper elevation={2} style={{ padding: '1rem' }}>
            <Typography style={styles.title}>
              Recent Sales
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summary?.recentSales && summary.recentSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>#{sale.id}</TableCell>
                      <TableCell>{sale.customerName}</TableCell>
                      <TableCell>Rp {sale.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <span style={{
                          color: sale.paymentStatus === 'paid' ? 'green' : 'orange',
                          fontWeight: 'bold'
                        }}>
                          {sale.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          component={Link}
                          to={`/sales/${sale.id}`}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

// Sales component
const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('/api/sales');
        const data = await response.json();
        if (data.success) {
          setSales(data.data);
        } else {
          setError('Failed to load sales data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper style={{ padding: '1rem', backgroundColor: '#fff3f0', margin: '1rem' }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom>
        Sales Management
      </Typography>

      <Paper elevation={2} style={{ padding: '1rem', marginBottom: '1rem' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice #</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.invoiceNumber || `INV-${String(sale.id).padStart(6, '0')}`}</TableCell>
                  <TableCell>{sale.customerName}</TableCell>
                  <TableCell>
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>Rp {sale.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <span style={{
                      color: sale.paymentStatus === 'paid' ? 'green' : 
                            sale.paymentStatus === 'canceled' ? 'red' : 'orange',
                      fontWeight: 'bold'
                    }}>
                      {sale.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      component={Link}
                      to={`/sales/${sale.id}`}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

// Sale Detail component
const SaleDetail = () => {
  const saleId = window.location.pathname.split('/').pop();
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSaleDetail = async () => {
      try {
        const response = await fetch(`/api/sales`);
        const data = await response.json();
        
        if (data.success) {
          const foundSale = data.data.find(s => s.id === parseInt(saleId));
          if (foundSale) {
            setSale(foundSale);
          } else {
            setError('Sale not found');
          }
        } else {
          setError('Failed to load sale data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleDetail();
  }, [saleId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !sale) {
    return (
      <Paper style={{ padding: '1rem', backgroundColor: '#fff3f0', margin: '1rem' }}>
        <Typography color="error">Error: {error || 'Sale not found'}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link}
          to="/sales"
          style={{ marginTop: '1rem' }}
        >
          Back to Sales
        </Button>
      </Paper>
    );
  }

  return (
    <Container style={styles.container}>
      <Button 
        variant="outlined" 
        component={Link}
        to="/sales"
        style={{ marginBottom: '1rem' }}
      >
        ← Back to Sales
      </Button>

      <Paper elevation={2} style={{ padding: '1.5rem', marginBottom: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              Invoice #{sale.invoiceNumber || `INV-${String(sale.id).padStart(6, '0')}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Date: {new Date(sale.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
            <Typography variant="body1">
              Status: 
              <span style={{
                color: sale.paymentStatus === 'paid' ? 'green' : 
                      sale.paymentStatus === 'canceled' ? 'red' : 'orange',
                fontWeight: 'bold',
                marginLeft: '0.5rem'
              }}>
                {sale.paymentStatus.toUpperCase()}
              </span>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Payment Method: {sale.paymentMethod}
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ margin: '1rem 0' }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Customer Information</Typography>
            <Typography variant="body1">{sale.customerName}</Typography>
            {sale.customerPhone && <Typography variant="body2">{sale.customerPhone}</Typography>}
            {sale.customerEmail && <Typography variant="body2">{sale.customerEmail}</Typography>}
          </Grid>
        </Grid>

        <Typography variant="h6" style={{ marginTop: '1.5rem' }}>
          Items
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sale.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell align="right">Rp {item.price.toLocaleString()}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">Rp {item.subtotal.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell align="right"><strong>Subtotal</strong></TableCell>
                <TableCell align="right">Rp {sale.subtotal.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell align="right">Tax ({sale.taxEnabled ? '11%' : '0%'})</TableCell>
                <TableCell align="right">Rp {sale.tax.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell align="right">Discount</TableCell>
                <TableCell align="right">Rp {sale.discount.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell align="right"><Typography variant="subtitle1"><strong>Total</strong></Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle1"><strong>Rp {sale.total.toLocaleString()}</strong></Typography></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {sale.notes && (
          <Box mt={2}>
            <Typography variant="subtitle2">Notes:</Typography>
            <Typography variant="body2">{sale.notes}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

// Products component
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          setError('Failed to load products data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper style={{ padding: '1rem', backgroundColor: '#fff3f0', margin: '1rem' }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom>
        Products Inventory
      </Typography>

      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card style={styles.card}>
              <CardHeader 
                title={product.name} 
                subheader={`SKU: ${product.sku}`}
                titleTypographyProps={{ variant: 'h6' }}
              />
              <CardContent>
                <Typography variant="h6" color="primary">
                  Rp {product.price.toLocaleString()}
                </Typography>
                <Box mt={1} display="flex" justifyContent="space-between">
                  <Typography variant="body2">Category: {product.category}</Typography>
                  <Typography 
                    variant="body2" 
                    style={{
                      color: product.stock < 10 ? 'red' : 'green',
                      fontWeight: 'bold'
                    }}
                  >
                    Stock: {product.stock}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// FinancialReports component
const FinancialReports = () => {
  const [financeData, setFinanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const response = await fetch('/api/finance/reports');
        const data = await response.json();
        if (data.success) {
          setFinanceData(data.data);
        } else {
          setError('Failed to load financial data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper style={{ padding: '1rem', backgroundColor: '#fff3f0', margin: '1rem' }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom>
        Financial Reports
      </Typography>

      <Paper elevation={2} style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <Typography variant="h6" gutterBottom>
          Summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2">Total Income</Typography>
            <Typography variant="h5" color="primary">
              Rp {financeData.totalIncome.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2">Total Expenses</Typography>
            <Typography variant="h5" style={{ color: '#f44336' }}>
              Rp {financeData.totalExpenses.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2">Net Profit</Typography>
            <Typography variant="h5" style={{ color: '#4caf50' }}>
              Rp {financeData.netProfit.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} style={{ padding: '1.5rem' }}>
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {financeData.recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>#{transaction.id}</TableCell>
                  <TableCell>
                    <span style={{
                      color: transaction.type === 'sale' ? '#2196f3' : 
                              transaction.type === 'refund' ? '#f44336' : '#ff9800',
                      textTransform: 'capitalize',
                      fontWeight: 'bold'
                    }}>
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell style={{
                    color: transaction.type === 'sale' ? '#4caf50' : '#f44336',
                    fontWeight: 'bold'
                  }}>
                    {transaction.type === 'sale' ? '+' : '-'} 
                    Rp {transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

// Layout component
const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Central Computers
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/sales">Sales</Button>
          <Button color="inherit" component={Link} to="/products">Products</Button>
          <Button color="inherit" component={Link} to="/finance/reports">Finance</Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
      <footer style={{ 
        padding: '1rem', 
        marginTop: '2rem',
        backgroundColor: '#f5f5f5',
        textAlign: 'center'
      }}>
        <Typography variant="body2" color="textSecondary">
          Central Computers Demo - For demonstration purposes only
        </Typography>
      </footer>
    </>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/:id" element={<SaleDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/finance/reports" element={<FinancialReports />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
