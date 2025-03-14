import mongoose from'mongoose';

const BannerSchema = new mongoose.Schema({
  banner_name: { type: String, required: true },
  imagem_desktop: { type: String, required: false },
  imagem_mobile: { type: String, required: false },
  data_start: { type: Date, required: true },
  data_end: { type: Date, required: true },
  link: { type: String, required: false },
  tag_google: { type: String, required: false }, 
  tag_active: { type: Boolean, default: false },
  banner_location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BannerLocation', required: true }], 
});

export default mongoose.model('Banner', BannerSchema);