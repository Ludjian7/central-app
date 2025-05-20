// Simplified mock data for Vercel serverless functions

// Products data
const products = [
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
  }
];

// Sales data
const sales = [
  {
    id: 1,
    customerName: 'Customer 1',
    subtotal: 9000000,
    tax: 990000,
    taxEnabled: true,
    discount: 100000,
    total: 9890000,
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    createdAt: new Date().toISOString(),
    items: [
      {
        id: 1,
        productId: 101,
        quantity: 1,
        price: 7500000,
        subtotal: 7500000,
        product: products[0]
      },
      {
        id: 2,
        productId: 103,
        quantity: 2,
        price: 1200000,
        subtotal: 2400000,
        product: products[2]
      }
    ]
  },
  {
    id: 2,
    customerName: 'Customer 2',
    subtotal: 1500000,
    tax: 0,
    taxEnabled: false,
    discount: 50000,
    total: 1450000,
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    createdAt: new Date().toISOString(),
    items: [
      {
        id: 1,
        productId: 102,
        quantity: 1,
        price: 1500000,
        subtotal: 1500000,
        product: products[1]
      }
    ]
  },
  {
    id: 3,
    customerName: 'Customer 3',
    subtotal: 850000,
    tax: 93500,
    taxEnabled: true,
    discount: 0,
    total: 943500,
    paymentMethod: 'transfer',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString(),
    items: [
      {
        id: 1,
        productId: 104,
        quantity: 1,
        price: 850000,
        subtotal: 850000,
        product: products[3]
      }
    ]
  }
];

// Finance data
const financeData = {
  dailyCashFlow: [
    {
      date: new Date().toISOString().split('T')[0],
      income: 11340000,
      expenses: 5000000,
      netCashFlow: 6340000
    },
    {
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      income: 9500000,
      expenses: 4500000,
      netCashFlow: 5000000
    },
    {
      date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
      income: 8200000,
      expenses: 3800000,
      netCashFlow: 4400000
    }
  ],
  totalIncome: 29040000,
  totalExpenses: 13300000,
  netProfit: 15740000,
  recentTransactions: [
    {
      id: 1,
      type: 'sale',
      amount: 9890000,
      description: 'Sale #000001',
      date: new Date().toISOString()
    },
    {
      id: 2,
      type: 'expense',
      amount: 5000000,
      description: 'Inventory purchase',
      date: new Date().toISOString()
    },
    {
      id: 3,
      type: 'sale',
      amount: 1450000,
      description: 'Sale #000002',
      date: new Date(Date.now() - 86400000).toISOString()
    }
  ]
};

module.exports = {
  products,
  sales,
  financeData
}; 