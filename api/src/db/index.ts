const mongoose = require("mongoose");

const initDB = () => {
    // const url = process.env.DB_CONNECTION_URL;
    const url = process.env.DB_CONNECTION_URL;
    mongoose.connection.once("open", () => {
        console.log("> Connected to database");
    });
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err: any) => {
            console.log(err);
        });
};

export default initDB;
