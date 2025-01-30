const express=require('express');
const app = express();
const indexRouter = require("./routers/index-router");
const servicesRouter = require("./routers/service-router");
const studentsRouter = require("./routers/student-router");
const productsRouter = require("./routers/product-router");


require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/nirmaan",indexRouter);
app.use("/nirmaan/services",servicesRouter);
app.use("/nirmaan/students",studentsRouter);
app.use("/nirmaan/products",productsRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});