/**
 * @typedef {Object} PrintJob
 * @property {string} id
 * @property {string} userId
 * @property {string} fileName
 * @property {number} copies
 * @property {boolean} color
 * @property {'pending' | 'processing' | 'completed' | 'failed'} status
 * @property {Date} timestamp
 * @property {number} totalPages
 * @property {number} cost
 */

/**
 * @typedef {Object} OrderItem
 * @property {string} id
 * @property {string} name
 * @property {number} quantity
 * @property {number} price
 */

/**
 * @typedef {Object} CanteenOrder
 * @property {string} id
 * @property {string} userId
 * @property {OrderItem[]} items
 * @property {'pending' | 'preparing' | 'ready' | 'completed'} status
 * @property {number} totalAmount
 * @property {Date} timestamp
 * @property {number} [tableNumber]
 */

/**
 * @typedef {Object} TableBooking
 * @property {string} id
 * @property {string} userId
 * @property {number} tableNumber
 * @property {Date} startTime
 * @property {Date} endTime
 * @property {'pending' | 'confirmed' | 'completed'} status
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'student' | 'staff' | 'admin'} role
 * @property {number} balance
 */
