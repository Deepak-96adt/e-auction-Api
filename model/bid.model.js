import mongoose from 'mongoose';

const BidSchema = mongoose.Schema({
  _id: Number,
  p_id:Number,
  bidprice:Number,
  user_email:String,
  created_at:String
});

const BidSchemaModel = mongoose.model('e-auction-bid_data',BidSchema);

export default BidSchemaModel