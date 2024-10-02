import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'
import { TStaff } from '../types/modes';

const saltRounds = 10;
const staffSchema = new Schema<TStaff>({
  first_name: {
    type: String,
    required: true,
    maxLength: 50
  },
  last_name: {
    type: String,
    required: true,
    maxLength: 50
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 150
  },
  /* Khóa tài khoản */
  active: {
    type: Boolean,
    default: true,
    require: true
  },
  password: {
    type: String,
    maxLength: 255,
    require: false,
    default: null
  }
},
{
  timestamps: true, //Tạo tự động thêm 2 trường createAt, updateAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

staffSchema.pre('save', async function (next) {
  const staff = this;

  const hash = bcrypt.hashSync(staff.password, saltRounds);

  staff.password = hash;

  next();
});
const Staff = model<TStaff>('Staff', staffSchema);

export default Staff
