import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
    _id?: mongoose.ObjectId;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const userModel = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default userModel;
