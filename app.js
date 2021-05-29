const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectionToDB = require("./connection_to_DB");
const userRouter = require("./routes/user-route");

dotenv.config();

const startServer = () => {
	const server = express();

	server.use(express.json());

	server.use(cors());

	connectionToDB()
		.then((result) => {
			console.log(`Connected to database ${process.env.DATABASE_NAME}`);

			server.listen(process.env.PORT, () => {
				console.log(
					`Server started running on PORT http://localhost:${process.env.PORT}`
				);
			});
		})
		.catch((error) => {
			console.log("Error Connecting to Database", error.message);
		});

	server.use("/api", userRouter);
};

startServer();
