require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();

//middleware
app.use(cors());
app.use(
	express.urlencoded({ extended: false, limit: "30mb", parameterLimit: 100000 })
);
app.use(express.json({ limit: "50mb" }));

//routes
app.use("/", require("./routes"));

//PORT
const PORT = process.env.PORT || 3001;
app.set("port", PORT);

//init http server
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});
