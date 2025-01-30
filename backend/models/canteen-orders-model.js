const OrderSchema = {
    _id: "ObjectId", 
    userId: "ObjectId", 
    items: [
      {
        itemId: "ObjectId", 
        name: "String", 
        quantity: "Number",
        price: "Number"
      }
    ],
    totalAmount: "Number", 
    paymentStatus: "String", 
    orderStatus: "String", 
    estimatedTime: "Date", 
    createdAt: "Date",
    updatedAt: "Date"
  };
  
