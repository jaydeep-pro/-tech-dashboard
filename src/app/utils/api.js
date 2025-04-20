// Utility functions to handle CRUD operations with JSON data

// Users
export const getUsers = async () => {
  const users = await import('../api/users.json');
  return users.default;
};

export const getUserById = async id => {
  const users = await getUsers();
  return users.users.find(user => user.id === id);
};

// Notifications
export const getNotifications = async () => {
  const notifications = await import('../api/notifications.json');
  return notifications.default;
};

export const getUnreadNotificationsCount = async () => {
  const notifications = await getNotifications();
  return notifications.notifications.filter(notification => !notification.read).length;
};

export const markNotificationAsRead = async id => {
  const notifications = await getNotifications();
  const updatedNotifications = notifications.notifications.map(notification =>
    notification.id === id ? { ...notification, read: true } : notification
  );
  // In a real application, you would save this back to the server
  return updatedNotifications;
};

// Messages
export const getMessages = async () => {
  const messages = await import('../api/messages.json');
  return messages.default;
};

export const getUnreadMessagesCount = async () => {
  const messages = await getMessages();
  return messages.messages.filter(message => !message.read).length;
};

export const markMessageAsRead = async id => {
  const messages = await getMessages();
  const updatedMessages = messages.messages.map(message =>
    message.id === id ? { ...message, read: true } : message
  );
  // In a real application, you would save this back to the server
  return updatedMessages;
};

// Generic CRUD operations
export const createItem = async (collection, item) => {
  const data = await import(`../api/${collection}.json`);
  const newItem = {
    id: Math.max(...data[collection].map(i => i.id)) + 1,
    ...item,
    createdAt: new Date().toISOString(),
  };
  data[collection].push(newItem);
  // In a real application, you would save this back to the server
  return newItem;
};

export const updateItem = async (collection, id, updates) => {
  const data = await import(`../api/${collection}.json`);
  const updatedItems = data[collection].map(item =>
    item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
  );
  // In a real application, you would save this back to the server
  return updatedItems.find(item => item.id === id);
};

export const deleteItem = async (collection, id) => {
  const data = await import(`../api/${collection}.json`);
  const filteredItems = data[collection].filter(item => item.id !== id);
  // In a real application, you would save this back to the server
  return true;
};

export const getStats = () => {
  return [
    {
      title: 'Total Project',
      value: '6,784',
      change: '10%',
      changeType: 'increase',
      todayValue: '+$150 today',
    },
    {
      title: 'In Progress',
      value: '1,920',
      change: '10%',
      changeType: 'increase',
      todayValue: '+$150 today',
    },
    {
      title: 'Finished',
      value: '4,412',
      change: '10%',
      changeType: 'increase',
      todayValue: '+$150 today',
    },
    {
      title: 'Unfinished',
      value: '329',
      change: '10%',
      changeType: 'increase',
      todayValue: '+$150 today',
    },
  ];
};

export const getRevenueData = () => {
  return {
    target: {
      percentage: '75.55%',
      change: '+10%',
      earnToday: '$240',
      values: {
        target: '$20k',
        revenue: '$16k',
        today: '$1.5k',
      },
    },
    monthlyData: {
      revenue: 1240,
      sales: '30%',
      data: [
        // Monthly data points for Jan-Dec
        { month: 'Jan', revenue: 600, sales: 500 },
        { month: 'Feb', revenue: 700, sales: 600 },
        { month: 'Mar', revenue: 800, sales: 750 },
        { month: 'Apr', revenue: 750, sales: 800 },
        { month: 'May', revenue: 900, sales: 850 },
        { month: 'Jun', revenue: 950, sales: 900 },
        { month: 'Jul', revenue: 1000, sales: 800 },
        { month: 'Aug', revenue: 900, sales: 750 },
        { month: 'Sep', revenue: 850, sales: 900 },
        { month: 'Oct', revenue: 950, sales: 850 },
        { month: 'Nov', revenue: 900, sales: 950 },
        { month: 'Dec', revenue: 1000, sales: 900 },
      ],
    },
  };
};

export const getSalesSource = () => {
  return {
    total: '$75.5k',
    change: '+10%',
    sources: [
      { name: 'Official Website', value: '$10,000' },
      { name: 'Offline Store', value: '$10,000' },
      { name: 'Amazon Store', value: '$10,000' },
      { name: 'Reseller', value: '$10,000' },
    ],
  };
};

export const getTopProducts = () => {
  return [
    { name: 'Logic+ Wireless Mouse', price: '$1,240', category: 'Mouse' },
    { name: 'PS Wireless Controller', price: '$1,189', category: 'Smartphone' },
    { name: 'Ximi Mechanical Keyboard', price: '$1,100', category: 'Smartphone' },
    { name: 'Audia Tech Earphone', price: '$908', category: 'Earphone' },
    { name: 'Sams S14 Pro', price: '$900', category: 'Tablet' },
    { name: 'Sams A13 5G', price: '$870', category: 'Smartphone' },
    { name: 'Jsound P01 TWS', price: '$870', category: 'Earphone' },
  ];
};

export const getTopCategories = () => {
  return [
    { name: 'Smartphone', value: '1,509', change: '+12%' },
    { name: 'Tablet', value: '1,460', change: '-5%' },
    { name: 'Earphone', value: '1,229', change: '0%' },
    { name: 'Laptop & PC', value: '982', change: '+19%' },
    { name: 'Mouse', value: '791', change: '-25%' },
    { name: 'Hardisk & USB Drive', value: '679', change: '+11%' },
    { name: 'Camera', value: '679', change: '+11%' },
  ];
};

// Generate more orders for pagination
const generateOrders = count => {
  const statuses = ['Processing', 'Shiped', 'Delivered'];
  const products = [
    'Handmade Pouch',
    'Smartwatch E2',
    'Smartwatch E1',
    'Headphone G1 Pro',
    'Iphone X',
    'MacBook Pro',
    'iPad Air',
    'AirPods Pro',
    'Gaming Mouse',
    'Mechanical Keyboard',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    product: products[Math.floor(Math.random() * products.length)],
    additionalProducts: Math.floor(Math.random() * 4),
    customer: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    total: `$${(Math.random() * 1000).toFixed(2)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

let ordersData = generateOrders(100);

export const getRecentOrders = (page = 1, limit = 5, filters = {}) => {
  let filteredOrders = [...ordersData];

  // Apply filters
  if (filters.dateRange) {
    const [startDate, endDate] = filters.dateRange;
    filteredOrders = filteredOrders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
  }

  if (filters.status) {
    filteredOrders = filteredOrders.filter(
      order => order.status.toLowerCase() === filters.status.toLowerCase()
    );
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredOrders = filteredOrders.filter(
      order =>
        order.product.toLowerCase().includes(searchLower) ||
        order.customer.toLowerCase().includes(searchLower) ||
        order.email.toLowerCase().includes(searchLower)
    );
  }

  // Calculate pagination
  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    newOrders: 2,
    orders: filteredOrders.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: totalOrders,
      itemsPerPage: limit,
    },
  };
};

export const deleteOrder = orderId => {
  ordersData = ordersData.filter(order => order.id !== orderId);
  return true;
};

export const updateOrderStatus = (orderId, newStatus) => {
  ordersData = ordersData.map(order =>
    order.id === orderId ? { ...order, status: newStatus } : order
  );
  return ordersData.find(order => order.id === orderId);
};

export const getCustomerGrowth = () => {
  return {
    total: 1240,
    growth: '30%',
    countries: [
      { name: 'USA', customers: '1,240', percentage: '80%' },
      { name: 'Japan', customers: '1,240', percentage: '60%' },
      { name: 'France', customers: '1,240', percentage: '49%' },
      { name: 'Germany', customers: '1,240', percentage: '100%' },
      { name: 'South Korea', customers: '1,240', percentage: '50%' },
      { name: 'China', customers: '1,240', percentage: '20%' },
    ],
  };
};
