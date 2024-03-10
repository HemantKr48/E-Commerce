import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken"
export const registerController = async (req,res) => {
	try {
		const { name, email, password, phone, address } = req.body;

		//validations
		if (!name) {
			return res.send({ error: "Name is required" });
		}

		if (!email) {
			return res.send({ error: "Email is required" });
		}

		if (!password) {
			return res.send({ error: "Password is required" });
		}

		if (!phone) {
			return res.send({ error: "Phone is required" });
		}

		if (!address) {
			return res.send({ error: "Address is required" });
		}
        console.log(phone);
		//check user
		const existinguser = await userModel.findOne({ email });

		//existing User
		if (existinguser) {
			return res
				.status(200)
				.send({ success: true, message: "Already Register please login" });
		}

		const hashedPassword = await hashPassword(password);

		const user =await new userModel({
			name,
			email,
            address,
            phone,
			password: hashedPassword,
		}).save();
        console.log(user);
		res.status(201).send({
			success: true,
			message: "User Registered successfully",
			user,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({
			success: false,
			message: "Error in Registration",
			err,
		});
	}
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({success:false,message: "Invalid  email or password"})
        }

        //check user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({success:false,message: "Email is not registered"})
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({success:false,message: "Invalid password"})
        }
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address:user.address
            },
            token,
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success:false, message:"Error in login", err:err });
    }
}


//testcontroller

export const testController = (req, res) => {
	try {
		res.send("Protected Routes");
	}
	catch (err) {
		console.log(err);
		res.send({ err });
	}
}