import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Oracle {
  // 签诗序号
  @Prop({ type: Number })
  index: number;
  // 所求类型
  @Prop({ type: String })
  type: string;
  // 姓名
  @Prop({ type: String })
  fullName: string;
  // 生辰
  @Prop({ type: Date })
  birthday: Date;
  // 性别
  @Prop({ type: String })
  gender: string;
  // 签诗生成时间
  @Prop({ type: Date, default: Date.now, required: true })
  createTime: Date;
  // 是否是求来的签：true表示是求来的签，false表示是录入的签
  @Prop({ type: Boolean })
  isAsked: boolean;
  // 是否完成博杯：true表示求来的签博过杯，false表示未博杯
  @Prop({ type: Boolean })
  isBlessed: boolean;
  // 录入的签使用过解签符
  @Prop({ type: Boolean })
  isInterpreted: boolean;
}

const OracleSchema = SchemaFactory.createForClass(Oracle);

export { OracleSchema };
