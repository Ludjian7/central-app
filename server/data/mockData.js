// Mock data for Central Computers Demo App

// Generate sales data
const generateSales = (count = 20) => {
  const sales = [];
  const paymentMethods = ['cash', 'credit_card', 'transfer', 'digital_wallet'];
  const paymentStatuses = ['paid', 'pending', 'canceled'];
  
  for (let i = 1; i <= count; i++) {
    // Create a date within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    const subtotal = Math.floor(Math.random() * 5000000) + 500000;
    const taxEnabled = Math.random() > 0.3;
    const tax = taxEnabled ? Math.floor(subtotal * 0.11) : 0;
    const discount = Math.floor(Math.random() * 200000);
    const total = subtotal + tax - discount;
    
    sales.push({
      id: i,
      customerName: `Customer ${i}`,
      customerPhone: `08${Math.floor(Math.random() * 1000000000)}`,
      customerEmail: `customer${i}@example.com`,
      subtotal,
      tax,
      taxEnabled,
      discount,
      total,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      notes: Math.random() > 0.7 ? `Note for sale #${i}` : '',
      invoiceNumber: `INV-${String(i).padStart(6, '0')}`,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      items: generateSaleItems(i, Math.floor(Math.random() * 5) + 1)
    });
  }
  
  return sales;
};

// Generate sale items
const generateSaleItems = (saleId, count) => {
  const items = [];
  const products = getProducts();
  
  // Select random products for this sale
  const saleProducts = [];
  while (saleProducts.length < count) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    if (!saleProducts.find(p => p.id === randomProduct.id)) {
      saleProducts.push(randomProduct);
    }
  }
  
  // Create items with the selected products
  for (let i = 0; i < count; i++) {
    const product = saleProducts[i];
    const quantity = Math.floor(Math.random() * 3) + 1;
    items.push({
      id: i + 1,
      saleId,
      productId: product.id,
      quantity,
      price: product.price,
      subtotal: product.price * quantity,
      product
    });
  }
  
  return items;
};

// Products data
const getProducts = () => [
  {
    id: 101,
    name: 'Laptop Acer Aspire 3',
    sku: 'ACR-ASP3-001',
    price: 7500000,
    stock: 15,
    category: 'Laptops'
  },
  {
    id: 102,
    name: 'Printer Canon PIXMA',
    sku: 'CNP-PXM-001',
    price: 1500000,
    stock: 8,
    category: 'Printers'
  },
  {
    id: 103,
    name: 'Mouse Logitech MX Master 3',
    sku: 'LGT-MXM3-001',
    price: 1200000,
    stock: 25,
    category: 'Peripherals'
  },
  {
    id: 104,
    name: 'Keyboard Mechanical RGB',
    sku: 'KBD-MRGB-001',
    price: 850000,
    stock: 20,
    category: 'Peripherals'
  },
  {
    id: 105,
    name: 'Monitor Samsung 24"',
    sku: 'SMG-M24-001',
    price: 2000000,
    stock: 10,
    category: 'Monitors'
  },
  {
    id: 106,
    name: 'SSD Samsung 500GB',
    sku: 'SMG-SSD5-001',
    price: 800000,
    stock: 30,
    category: 'Storage'
  },
  {
    id: 107,
    name: 'HDD Seagate 2TB',
    sku: 'SGT-HDD2-001',
    price: 950000,
    stock: 25,
    category: 'Storage'
  },
  {
    id: 108,
    name: 'RAM Kingston 8GB DDR4',
    sku: 'KGS-RAM8-001',
    price: 450000,
    stock: 40,
    category: 'Memory'
  },
  {
    id: 109,
    name: 'Graphics Card NVIDIA GTX 1660',
    sku: 'NVD-1660-001',
    price: 3500000,
    stock: 5,
    category: 'Graphics Cards'
  },
  {
    id: 110,
    name: 'Processor Intel i5 11th Gen',
    sku: 'INT-I511-001',
    price: 2750000,
    stock: 12,
    category: 'Processors'
  }
];

// Generate finance data for reports
const generateFinanceData = () => {
  const dailyCashFlow = [];
  let totalIncome = 0;
  let totalExpenses = 0;
  
  // Generate data for the last 30 days
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const income = Math.floor(Math.random() * 5000000) + 1000000;
    const expenses = Math.floor(Math.random() * 2000000) + 500000;
    const netCashFlow = income - expenses;
    
    totalIncome += income;
    totalExpenses += expenses;
    
    dailyCashFlow.push({
      date: dateStr,
      income,
      expenses,
      netCashFlow
    });
  }
  
  const netProfit = totalIncome - totalExpenses;
  
  return {
    dailyCashFlow,
    totalIncome,
    totalExpenses,
    netProfit,
    recentTransactions: generateTransactions(10)
  };
};

// Generate random transactions
const generateTransactions = (count = 10) => {
  const transactions = [];
  const types = ['sale', 'expense', 'purchase', 'refund'];
  const descriptions = [
    'Sale #',
    'Inventory purchase',
    'Equipment maintenance',
    'Utility bill payment',
    'Salary payment',
    'Marketing expense',
    'Refund for sale #',
    'Software subscription'
  ];
  
  const today = new Date();
  
  for (let i = 1; i <= count; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    
    const type = types[Math.floor(Math.random() * types.length)];
    let description;
    
    if (type === 'sale') {
      description = `Sale #${String(i).padStart(6, '0')}`;
    } else if (type === 'refund') {
      description = `Refund for sale #${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
    } else {
      description = descriptions[Math.floor(Math.random() * descriptions.length)];
    }
    
    transactions.push({
      id: i,
      type,
      amount: Math.floor(Math.random() * 2000000) + 100000,
      description,
      date: date.toISOString()
    });
  }
  
  return transactions;
};

module.exports = {
  sales: generateSales(20),
  products: getProducts(),
  financeData: generateFinanceData(),
  
  // Helper generators - exposed to allow dynamic data generation
  generateSales,
  generateSaleItems,
  generateFinanceData,
  generateTransactions
};
