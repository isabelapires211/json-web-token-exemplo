const crypto = require('./crypto');

const encrypted_key = crypto.encrypt("HelloWorld");
console.log(encrypted_key);
const decrypted_key = crypto.decrypt(encrypted_key);
console.log(decrypted_key);
// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors'); //liberaçao do cliente ligação

//metodos que o cliente pode executar, e pode acessar 
const corsOpcoes = { 
  origin: "http://localhost:3000",
  methods: "GET,PUT,POST,DELET",

  allowedHeaders: "Content-type,Autherizantion",
  credential:true

}




var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

app.use(cors(corsOpcoes) )

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar" ] })
);

app.get('/', async function(req, res){
  res.render("home")
})


app.get('/usuario/cadastrar', async function(req, res){
  res.render('cadastrar');
})

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/usuario/listar', async function(req, res){
  try{
    var usuarios = await usuario.findAll();
    res.json({usuarios})
  } catch(err){
    console.error(err);
    res.status(500).json({mensagem: 'ocorreu erro ao autenticar'})
  }
})

app.post('/usuario/cadastrar', async function(req, res){
  if(req.body.senha == req.body.confirmeS){

    let produto = req.body
    produto.senha= crypto.encrypt(req.body.senha)

    await usuario.create(produto);
    res.redirect('listar')

  }
  else  {
      res.status(500).json({ message: 'Ocorreu um erro ao criar o usuário.' });
      
  }
})


app.post('/logar', async (req, res) => {

  const nome = await usuario.findOne({ where: { nome: req.body.nome, senha: crypto.encrypt(  req.body.senha) } });
  
    if (nome){
      
    const id= 1 
    const token= jwt.sign({id}, process.env.SECRET, {
      expiresIn: 300
    }) 
  
    res.cookie('token', token, {httpOlin: true}).json({
      nome: nome.nome,
      token: token
    });

  }
   /* return res.json ({
      usuario: usuario, 
      token: token
    })
  }

  //res.status(500).json ({mensagem: "Não foi possivei logar"})*/
  
})


app.post('/deslogar', function(req, res) {
  res.cookie('token', null, {httpOnly: true})
  res.json ({ deslogado:true})
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});