import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Asset {
  // 解签符
  @Prop({ type: Number })
  interpretingProp: number;

  // 硬爱杯（赢得的道具）
  @Prop({ type: Number })
  winningProp: number;

  // 硬嫑杯（未赢得的道具）
  @Prop({ type: Number })
  losingProp: number;

  // 大香
  @Prop({ type: Number })
  bigIncense: number;

  // 小香
  @Prop({ type: Number })
  smallIncense: number;
}

const AssetSchema = SchemaFactory.createForClass(Asset);

export { AssetSchema };
