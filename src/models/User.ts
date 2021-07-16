import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
	uid: string;
	email: string;
	displayName: string;
	firstName: string;
	lastName: string;
	picture: string;
}

const userSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
		},
		displayName: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		image: String,
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

userSchema.methods.toJSON = function () {
	const { _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

export default model('User', userSchema);
