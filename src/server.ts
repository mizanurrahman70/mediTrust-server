
import mongoose  from "mongoose";
import config from "./config"
import  app from "./app"
async function save(){
 try{
    await mongoose.connect(config.database_url as string);
    console.log('connecting');
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
 }
 catch(err){
     console.log(err);
 }
}
save()