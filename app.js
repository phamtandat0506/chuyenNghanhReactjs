const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'weblaptop'
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


connection.connect(function(err){
  (err) ? console.log(err) : console.log(connection);
});



app.post('/api/dangky/insert', (req, res) => {
 var sql = "INSERT INTO `khach_hang`( `TEN_KH`, `USER_KH`, `PASS`, `EMAIL`, `SDT`) VALUES ('"+req.body.fullName+"','"+req.body.userName+"','"+req.body.pass+"','"+req.body.email+"', '"+req.body.num+"')";
//var sql = "INSERT INTO `khach_hang`( `TEN_KH`, `USER_KH`, `PASS`, `EMAIL`, `SDT`) VALUES ('aa','aa','aa','aa', 'aa')";
  //var sql = "INSERT INTO `khach_hang`( `TEN_KH`, `USER_KH`, `PASS`, `EMAIL`, `SDT`) VALUES ('"+req.body.fullName+"','"+req.body.userName+"','"+req.body.pass+"','"+req.body.email+"','"+req.body.num+"')";
  connection.query(sql, function(error, result){
    if(error ) throw error;
    res.send({users : result})
  });  
})

app.get('/api/user', (req, res) => {
  var sql = "SELECT * FROM `khach_hang`";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({users: results});
  });
});

app.get('/api/khuyenmai', (req, res) => {
  var sql = "SELECT * FROM khuyenmai ORDER BY id DESC";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({khuyenMai: results});
  });
});

app.get('/api/laptop', (req, res) => {
  var sql = "SELECT * FROM laptop ORDER BY id_laptop DESC";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({products: results});
  });
})


app.get('/api/loai', (req, res) => {
  var sql = "SELECT * FROM loai_laptop ORDER BY id_loai DESC";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({loais: results});
  });
})




app.post('/api/insert', function(req, res){
   const sql = "INSERT INTO loai_laptop(ID_LOAI, TEN_LOAI) VALUES ( '"+req.body.ID_LOAI+"', '"+req.body.TEN_LOAI+"')";
   connection.query(sql, function(error, result){
    if(error ) throw error;
    res.send({loais : result})
  });       
 });

 app.post('/api/update', function(req, res){
   const sql = "UPDATE loai_laptop SET TEN_LOAI='"+req.body.TEN_LOAI+"' WHERE ID_LOAI='"+req.body.ID_LOAI+"'";
   connection.query(sql, function(error, result){
    if(error ) throw error;
    res.send({loais : result})
 });
});

app.post('/api/delete', (req, res) => {
  var sql = "DELETE FROM `loai_laptop` WHERE ID_LOAI='"+req.body.ID_LOAI+"'";
  connection.query(sql, function(err, results){
    if(err) throw err;
    res.send({loais: results});
  })
})


app.post('/laptop/api/delete', function(req, res){
  const sql = "DELETE FROM laptop WHERE ID_LAPTOP='"+req.body.ID_LAPTOP+"'";
     connection.query(sql, function(err, results) {
       if(err) throw err;
       res.send({products: results});
     });          
 })

app.post('/laptop/api/insert', function(req, res){
 const sql = "INSERT INTO laptop(ID_LAPTOP, TEN_LAPTOP, MOTANGAN_LAPTOP, MOTA_LAPTOP, GIA_LAPTOP, IMG, ID_LOAI) VALUES ('"+req.body.ID_LAPTOP+"','"+req.body.TEN_LAPTOP+"','"+req.body.MOTANGAN_LAPTOP+"','"+req.body.MOTA_LAPTOP+"','"+req.body.GIA_LAPTOP+"','"+req.body.IMG+"','"+req.body.ID_LOAI+"')";
    connection.query(sql, function(err, results) {
      if(err) throw err;
      res.send({products: results});
    });          
})
app.post('/laptop/api/update', function(req, res){
  //const sql = "INSERT INTO laptop(ID_LAPTOP, TEN_LAPTOP, MOTANGAN_LAPTOP, MOTA_LAPTOP, GIA_LAPTOP, IMG, ID_LOAI) VALUES ('"+req.body.ID_LAPTOP+"','"+req.body.TEN_LAPTOP+"','"+req.body.MOTANGAN_LAPTOP+"','"+req.body.MOTA_LAPTOP+"','"+req.body.GIA_LAPTOP+"','"+req.body.IMG+"','"+req.body.ID_LOAI+"')";
  const sql = "UPDATE `laptop` SET `TEN_LAPTOP`='"+req.body.TEN_LAPTOP+"',`MOTANGAN_LAPTOP`='"+req.body.MOTANGAN_LAPTOP+"',`MOTA_LAPTOP`='"+req.body.MOTA_LAPTOP+"',`GIA_LAPTOP`='"+req.body.GIA_LAPTOP+"',`IMG`='"+req.body.IMG+"',`ID_LOAI`='"+req.body.ID_LOAI+"' WHERE ID_LAPTOP= '"+req.body.ID_LAPTOP+"'";
  connection.query(sql, function(err, results) {
    if(err) throw err;
    res.send({products: results});
  });          
 })


app.post('/cart/api/insert', function(req, res){
  const sql = "INSERT INTO gio_hang( TEN_LAPTOP, GIA, SO_LUONG, ID_LAPTOP) VALUES ('"+req.body.nameLaptop+"','"+req.body.price+"','"+req.body.quality+"', '"+req.body.idLaptop+"')";
  connection.query(sql, function(err, results) {
    console.log("thanh cong");
    if(err) throw err;
    res.send({cart: results});
  }); 
})

app.post('/cart/api/delete', function (req, res) {
  const sql = "DELETE FROM `gio_hang` WHERE ID_LAPTOP='"+req.body.ID_LAPTOP+"'";
  connection.query(sql, function(err, results) {
    if(err) throw err;
    res.send({cart: results});
  })
})


app.get('/api/cart', (req, res) => {
  var sql = "SELECT * FROM gio_hang";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({cart: results});
  });
})

app.get('/chi-tiet/api/cart', (req, res) => {
  var sql = "SELECT * FROM gio_hang";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({cart: results});
  });
})

app.post('/cart/api/update', (req, res) => {
  var sql = "UPDATE gio_hang SET SO_LUONG ='"+req.body.SO_LUONG+"' WHERE ID_LAPTOP = '"+req.body.ID_LAPTOP+"' ";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({cart: results});
  });
})

app.post('/laptop/api/update', function(req, res){
  //const sql = "INSERT INTO laptop(ID_LAPTOP, TEN_LAPTOP, MOTANGAN_LAPTOP, MOTA_LAPTOP, GIA_LAPTOP, IMG, ID_LOAI) VALUES ('"+req.body.ID_LAPTOP+"','"+req.body.TEN_LAPTOP+"','"+req.body.MOTANGAN_LAPTOP+"','"+req.body.MOTA_LAPTOP+"','"+req.body.GIA_LAPTOP+"','"+req.body.IMG+"','"+req.body.ID_LOAI+"')";
  const sql = "SELECT * FROM laptop WHERE ID_LAPTOP= '"+req.body.ID_LAPTOP+"'";
  connection.query(sql, function(err, results) {
    if(err) throw err;
    res.send({products: results});
  });          
 })

app.listen(4000, () => console.log('App listening on port 4000'));