var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs"); // підключили стандартний модуль для роботи з файлами

app.use(express.static(__dirname)); // Встановлення каталогу для статичного контенту! (CSS)

app.use(bodyParser.urlencoded({extended: true})); // стандартна документація body-parser

app.use(bodyParser.json());

app.get("/",function(req,res){ //опрацьовуємо корінь сайту "/" + callback (req,res)
	res.sendFile(__dirname + "/index.html");
});

app.get("/list",function(req,res){
	res.sendFile(__dirname + "/data.json");
});

app.get("/form",function(req,res){
	res.sendFile(__dirname + "/form.html");
});

app.get("/formGet",function(req,res){
	//console.log(req.query);
	//res.send("test!"); поверне ТЕСТ з серверу!
	var file = require("./data.json")// . означає що з текучого обьєкту
	//console.log(file);
	file.push(req.query); // обєкт файлу
	var str = JSON.stringify(file);
	fs.writeFileSync('data.json',str); // метод повністю перезапише json
	res.send("All files seved in server!");
});

/*app.get("/deleteElem",function(req,res){
	//console.log(req.query);
	//res.send("TESTING!!!");
	var file = require("./data.json");
	//console.log(file);
	file.splice(req.query.id,1);
	var str = JSON.stringify(file);
	fs.writeFileSync('data.json',str);
	res.send(file);
});*/

app.post("/deleteElem",function(req,res){
	var file = require("./data.json");
	//var id = req.body.id;
	file.splice(req.body.id,1);
	console.log(req.body);
	//file.splice(id,1);
	var str = JSON.stringify(file);
	fs.writeFileSync('data.json',str);
	res.send(file);
});

app.post("/postSend",function(req,res){
	console.log(req.body);
	res.send(req.body.myInput);
});

app.post("/myGet",function(req,res){
	console.log(req.body);
	res.send('successl');
});

app.listen(process.env,PORT||8080); // задаємо порт
console.log("Start server!");