const PrintJobSchema = {
    _id: "ObjectId", 
    userId: "ObjectId", 
    fileUrl: "String", 
    fileName: "String", 
    pageCount: "Number", 
    printOptions: {
      color: "Boolean", 
      paperSize: "String", 
      copies: "Number" 
    },
    printStatus: "String", 
    paymentStatus: "String", 
    createdAt: "Date",
    updatedAt: "Date"
  };
  
