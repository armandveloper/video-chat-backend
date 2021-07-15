import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
	googleID: string;
	displayName: string;
	firstName: string;
	lastName: string;
	image?: string;
}

const userSchema = new Schema(
	{
		googleID: {
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

export default model('User', userSchema);
