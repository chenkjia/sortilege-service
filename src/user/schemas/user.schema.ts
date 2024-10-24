import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Oracle } from './oracle.schema';
import { Asset } from './asset.schema';

@Schema()
export class User {
  // 微信或抖音提供的用户唯一标识。
  @Prop({ type: String, required: true })
  userId: string;
  // 用户昵称，从平台获取。
  @Prop({ type: String })
  nickName: string;
  // 用户头像URL，从平台获取。
  @Prop({ type: String })
  avatarUrl: string;
  // 用户性别，从平台获取。
  @Prop({ type: String })
  gender: string;
  // 用户所在地区，从平台获取。
  @Prop({ type: String })
  region: string;
  // 用户使用的语言，从平台获取。
  @Prop({ type: String })
  language: string;
  // 用户地理位置信息
  @Prop({
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };
  // 用户生成时间
  @Prop({ type: Date, default: Date.now, required: true })
  createTime: Date;
  // 签诗列表
  @Prop([Oracle])
  oracles: Oracle[];
  // 资产清单
  @Prop(Asset)
  props: Asset;
}

const UserSchema = SchemaFactory.createForClass(User);
// 为 user_id 建立索引
UserSchema.index({ user_id: 1 });

export { UserSchema };
