import mongoose from 'mongoose';
import moment from 'moment-timezone' ;
moment().tz("America/Sao_Paulo").format();


const ViewSchema = new mongoose.Schema({
    idBanner: String,
    accessedAt: { type: Date, default: () => moment.tz('America/Sao_Paulo').toDate() },
});

export default mongoose.model('ViewBanner', ViewSchema);