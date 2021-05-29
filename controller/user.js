const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.login = async (request, response) => {
	try {
		const { loginId, password } = request.body;

		if (loginId && password) {
			const result = await User.findOne({
				$or: [{ email: loginId }, { phone: loginId }],
			});

			if (!result || !(await bcrypt.compare(password, result.password))) {
				response.status(401).json({
					status: 401,
					message: "Unuthorised User",
				});
			} else {
				response.status(200).json({
					user: {
						userId: result._id,
						name: result.name,
					},
					token: jwt.sign({ userId: result._id }, `${process.env.SECRET_KEY}`, {
						expiresIn: "1h",
					}),
				});
			}
		}
	} catch (error) {
		response.status(401).json({
			status: 401,
			message: "Error",
		});
	}
};

module.exports.signup = async (request, response) => {
	try {
		await bcrypt.hash(
			request.body.password,
			12,
			async (error, hashedPassword) => {
				if (error) {
					return response.status(400).send(error.message);
				}
				const signupUser = await User.create({
					user_name: request.body.user_name,
					email: request.body.email,
					phone: request.body.phone,
					password: hashedPassword,
				});

				response.status(201).send("User has been Registered Succesfully");
			}
		);
	} catch (error) {
		res.status(400).send("Something went wrong" + error.message);
	}
};
