import mongoose from 'mongoose';

const BannerLocationSchema = new mongoose.Schema({
  location_area: { type: String, required: true, unique: true },
});

export default mongoose.model('BannerLocation', BannerLocationSchema);