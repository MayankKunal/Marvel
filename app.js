const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
var api = require('marvel-api');
const path=require('path');

var marvel = api.createClient({
  publicKey: '0679870e075e0baea40883215c8260a9'
, privateKey: 'de2839573fae8fdb1fc12074fd5472110abe03ab'
});
const { response } = require('express');
const app=express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
 app.get("/",function(req,res)
 {  
  
  // marvel.characters.findByName('iron man')
  // .then(console.log)
  // .fail(console.error)
  // .done();
  
  


    
    res.sendFile(__dirname+"/index.html")
   
      
      
 });
 app.post("/",function(req,res)
 {
    const character=req.body.character;
    marvel.characters.findByName(character,function(err, results) {
        
        if(results.meta.count===0)
        {
            res.sendFile(__dirname+"/failure.html");
            return;
        }

        if(!err)
        {
            const nam=results.data[0].name;
        const description=results.data[0].description;
        const img=results.data[0].thumbnail.path;
        const extension=results.data[0].thumbnail.extension;
      //   res.write("<h1>"+nam+"</h1>");
      // res.write("<p>"+description+"</p>");
      // res.write("<img src="+img+"/standard_xlarge."+extension+">")
      const src=img+"/standard_xlarge."+extension;
    res.render("Home",{name:nam,description:description,src:src});
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
      });
    
 })
 app.post("/failure.html",function(req,res)
 {
   res.sendFile(__dirname+"/index.html");
 });
app.listen(3000,function()
{
    console.log("Server is Running");
});