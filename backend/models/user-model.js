const UserSchema = {
    _id: "ObjectId", 
    name: "String", 
    email: "String", 
    password: "String", 
    role: "String", 
    preferences: {
      favoriteFood: ["String"], 
      printSettings: {
        defaultColor: "Boolean", 
        defaultPaperSize: "String" 
      }
    },
    orderHistory: ["ObjectId"], 
    printHistory: ["ObjectId"], 
    paymentHistory: ["ObjectId"], 
    createdAt: "Date",
    updatedAt: "Date"
  };
  
