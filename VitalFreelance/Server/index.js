const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const urlMongoDb =
   "mongodb+srv://davott1717:bhQ5Zg9Q9405UU3R@vitalfreelance.fzdjam8.mongodb.net/VitalfreelanceDB?retryWrites=true&w=majority&appName=VitalFreelance";
  //constraseña atlas bhQ5Zg9Q9405UU3R
console.log(urlMongoDb);
async function connectToDatabase() {
  try {
      await mongoose.connect(urlMongoDb, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log("La conexión a la base de datos es correcta");
      
      // Start your server after successful connection
      app.listen(port, () => {
          console.log(`Servidor del API REST funcionando en http://localhost:${port}`);
      });

  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      // Handle the error appropriately (e.g., gracefully shut down the app)
      process.exit(1); // Exit with an error code
  }
}

connectToDatabase();
