var mongoose = app.db.nosql;

module.exports = mongoose.Schema({
    id: Number,
    tag: String,
    user: Number,
    private: Boolean
});
