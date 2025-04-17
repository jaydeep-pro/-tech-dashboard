// Utility functions to handle CRUD operations with JSON data

// Users
export const getUsers = async () => {
  const users = await import("../api/users.json");
  return users.default;
};

export const getUserById = async (id) => {
  const users = await getUsers();
  return users.users.find((user) => user.id === id);
};

// Notifications
export const getNotifications = async () => {
  const notifications = await import("../api/notifications.json");
  return notifications.default;
};

export const getUnreadNotificationsCount = async () => {
  const notifications = await getNotifications();
  return notifications.notifications.filter(
    (notification) => !notification.read
  ).length;
};

export const markNotificationAsRead = async (id) => {
  const notifications = await getNotifications();
  const updatedNotifications = notifications.notifications.map((notification) =>
    notification.id === id ? { ...notification, read: true } : notification
  );
  // In a real application, you would save this back to the server
  return updatedNotifications;
};

// Messages
export const getMessages = async () => {
  const messages = await import("../api/messages.json");
  return messages.default;
};

export const getUnreadMessagesCount = async () => {
  const messages = await getMessages();
  return messages.messages.filter((message) => !message.read).length;
};

export const markMessageAsRead = async (id) => {
  const messages = await getMessages();
  const updatedMessages = messages.messages.map((message) =>
    message.id === id ? { ...message, read: true } : message
  );
  // In a real application, you would save this back to the server
  return updatedMessages;
};

// Generic CRUD operations
export const createItem = async (collection, item) => {
  const data = await import(`../api/${collection}.json`);
  const newItem = {
    id: Math.max(...data[collection].map((i) => i.id)) + 1,
    ...item,
    createdAt: new Date().toISOString(),
  };
  data[collection].push(newItem);
  // In a real application, you would save this back to the server
  return newItem;
};

export const updateItem = async (collection, id, updates) => {
  const data = await import(`../api/${collection}.json`);
  const updatedItems = data[collection].map((item) =>
    item.id === id
      ? { ...item, ...updates, updatedAt: new Date().toISOString() }
      : item
  );
  // In a real application, you would save this back to the server
  return updatedItems.find((item) => item.id === id);
};

export const deleteItem = async (collection, id) => {
  const data = await import(`../api/${collection}.json`);
  const filteredItems = data[collection].filter((item) => item.id !== id);
  // In a real application, you would save this back to the server
  return true;
};
