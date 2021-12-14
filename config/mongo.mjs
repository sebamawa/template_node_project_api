// conexion a base de datos
import mongoose from 'mongoose';

// Conexion remota a MongoDB usando Atlas
// const dbConnect = () => { 
//     const DB_URI = process.env.DB_URI;
//     console.log(DB_URI);
//     const connectionParams = {
//         useNewUrlParser: true,
//         //useCreateIndex: true,
//         useUnifiedTopology: true 
//     }
//     mongoose.connect(DB_URI, connectionParams)
//         .then( () => {
//             console.log('Connected to database ')
//         })
//         .catch( (err) => {
//             console.error(`Error connecting to the database. \n${err}`);
//             process.exit(1);
//         })
// }

    //=================================================================================
// Conexion local a MongoDB
// const dbConnect = () => {
//     console.log('Conectando a la base de datos...');
//     const DB_URI = process.env.DB_URI;

//     mongoose.connect(DB_URI,//'mongodb://127.0.0.1:27017/sessions',
//          { useNewUrlParser: true, 
//            useUnifiedTopology: true 
//     }, (err, res) => {
//         if (!err) {
//             console.log('DB Connected');
//         } else {
//             console.log(`DB Connection Error; ${err}`);
//             process.exit(1); 
//         }
//     });
// }

const dbConnect = async () => {
    const DB_URI = process.env.DB_URI;
    const connectionParams = {
        useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true 
    }    

    try {
        console.log('Conectando a la base de datos...');
        await mongoose.connect(DB_URI, connectionParams);
        console.log('DB Connected');    
    } catch( e ) {
        console.error(`Error connecting to the database. \n${e}`);
        process.exit(1);
    }
}
//=================================================================================

export default dbConnect;