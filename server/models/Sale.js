const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'customer_name'
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'customer_phone'
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'customer_email'
  },
  subtotal: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0
  },
  tax: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0
  },
  taxEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'tax_enabled'
  },
  discount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0
  },
  total: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'cash',
    field: 'payment_method'
  },
  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    field: 'payment_status'
  },
  paymentReference: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'payment_reference'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'invoice_number'
  }
}, {
  tableName: 'sales',
  timestamps: true,
  underscored: true
});

module.exports = Sale; 