const mongoose = require('mongoose');
module.exports = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('DB connected')).catch(err => console.error(err));
}