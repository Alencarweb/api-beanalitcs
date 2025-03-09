import mongoose from'mongoose';

const BannerSchema = new mongoose.Schema({
  banner_name: { type: String, required: true },
  imagem_desktop: { type: String, required: true },
  imagem_mobile: { type: String, required: true },
  data_start: { type: Date, required: true },
  data_end: { type: Date, required: true },
  link: { type: String, required: true },
  tag_google: { type: String, required: false }, // Código do Google Tag Manager
  tag_active: { type: Boolean, default: true },
  banner_location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BannerLocation', required: true }], // Referência ao local do banner
});

export default mongoose.model('Banner', BannerSchema);