import mongoose from 'mongoose';
import moment from 'moment-timezone' ;
moment().tz("America/Sao_Paulo").format();


const AccessSchema = new mongoose.Schema({
    url: String,
    referrer: String,
    browser: String,
    os: String,
    device: String,
    ip: String,
    userAgent: String,
    accessedAt: { type: Date, default: () => moment.tz('America/Sao_Paulo').toDate() },
});

export default mongoose.model('Access', AccessSchema);