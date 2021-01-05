const express = require("express"); 
const path=require("path");
const app = express();

const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log("Listening to the port 2000", port);
});

app.use(express.static("client/dist"));
app.get("/server/products", (req, res) => {
  res.send({ data: "Sending something to the server here" });
});
if(process.env.NODE_ENV==="production"){

  const path=require('path');

  app.get('/*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./client","dist","index.html"))
  })

}
