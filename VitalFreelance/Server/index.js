const mongoose = require("mongoose");
const app = require("./app");
const Grid = require('gridfs-stream');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');

const port = process.env.PORT || 3977;
const urlMongoDb = "mongodb+srv://davott1717:bhQ5Zg9Q9405UU3R@vitalfreelance.fzdjam8.mongodb.net/VitalfreelanceDB?retryWrites=true&w=majority&appName=VitalFreelance";

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

        // Setting up GridFS stream
        let gfs;
        mongoose.connection.once('open', () => {
            gfs = Grid(mongoose.connection.db, mongoose.mongo);
            gfs.collection('uploads');
        });

        // Setting up GridFS storage
        const storage = new GridFsStorage({
            db: mongoose.connection,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    crypto.randomBytes(16, (err, buf) => {
                        if (err) {
                            return reject(err);
                        }
                        const filename = buf.toString('hex') + path.extname(file.originalname);
                        const fileInfo = {
                            filename: filename,
                            bucketName: 'uploads'
                        };
                        resolve(fileInfo);
                    });
                });
            }
        });

        const upload = multer({ storage });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

connectToDatabase();
