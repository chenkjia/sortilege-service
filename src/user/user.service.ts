import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import Client from '@open-dy/open_api_sdk';

const APP_ID = process.env.APP_ID
const APP_SECRET = process.env.APP_SECRET
const client = new Client({ clientKey: APP_ID, clientSecret: APP_SECRET });
console.log(APP_ID)
interface AppsJscode2sessionResponse {
  error: string,
  sessionKey: string,
  openid: string,
  unionid: string,
  anonymousOpenid: string
}
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, user: User): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  async findOne(user): Promise<User | null> {
    return this.userModel.findOne(user).exec();
  }

  // async getUserInfo(sessions): Promise<User | null> {
  //   return this.userModel.findOne(user).exec();
  // }
  async getOpenId(sessions)  {
    const res = await client.appsJscode2session({
      appid: APP_ID,
      secret: APP_SECRET,
      ...sessions
    });
    return res.openid
  }


  async login(user: User): Promise<User> {
    // const newUser = new this.userModel(user);
    const a = await this.findOne(user);
    if (a) {
      return a
    } else {
      return this.create(user)
    }
  }
}
