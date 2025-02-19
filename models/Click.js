import mongoose from 'mongoose';
import moment from 'moment-timezone' ;

moment().tz("America/Sao_Paulo").format();

const ClickSchema = new mongoose.Schema({
    url: String,
    createdAt: { type: Date, default: () => moment.tz('America/Sao_Paulo').toDate() },
});

export default mongoose.model('Click', ClickSchema);