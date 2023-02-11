const mongoose = require("mongoose");


const dbConnection = async () => {
    mongoose.set("strictQuery", false);

    try {
        mongoose.connect(process.env.DB_PATH, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        });

        console.log("DB Online");

    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de inicializar db");
    }
};


module.exports={dbConnection};