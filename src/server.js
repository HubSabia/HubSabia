const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const axios = require('axios'); // Importe a biblioteca axios

const bcrypt = require('bcrypt');
const app = express();
const port = 3000;
app.use(express.static('public')); // Serve static files from the 'public' directory

// Permitir requisições de múltiplas origens
// const allowedOrigins = [
//     'https://chatbot-sabia-ifpr-f232b4.netlify.app/'
// ];

// const allowedOrigins = [
//   'http://127.0.0.1:3000',
//   'http://localhost:3000',
//   'http://127.0.0.1:5500',
//   'http://localhost:5500',
//   'http://localhost:8080',
//   'http://127.0.0.1:8080',
//   'https://sabia-faq-ifpr-assis.vercel.app/',
//   'https://chatbot-sabia-ifpr-f232b4.netlify.app/'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       // Envie a resposta de erro *diretamente*
//       return res.status(403).json({ message: 'Not allowed by CORS' }); // 403 Forbidden
//     }
//   }
// }));

app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  }
}));

const uri =
  "mongodb+srv://sabia_bot:yX5zr}}T^E~8jLX@cluster0.prr5ivq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// "mongodb+srv://sabia_bot:<db_password>@cluster0.prr5ivq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(uri, {
//   serverApi: ServerApiVersion.v1,
// });

// Defina o nome do banco de dados
const dbName = 'vagner';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to parse JSON request bodies
app.use(express.json());

async function connectMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
    process.exit(1); // Exit the process on connection failure
  }
}

connectMongo();

// Configuração de um usuário administrador (substitua por algo mais seguro)
const adminUser = {
  username: 'admin',
  passwordHash: bcrypt.hashSync('S4B14ifpr', 10) // Hash da senha
};

// Rota de Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || username.trim() === '') {
    return res.status(400).json({ message: 'Usuário é obrigatório' }); // 400 Bad Request
  }

  if (username === adminUser.username && bcrypt.compareSync(password, adminUser.passwordHash)) {
    // Em produção, use JWT para gerar um token
    res.json({ success: true, message: 'Login realizado com sucesso' });
  } else {
    res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }
});

// Rota para buscar os diálogos
app.get('/dialogs', async (req, res) => {
  try {
    const db = client.db(dbName); // Replace with your actual database name
    const historicoCollection = db.collection('historico'); // Nome da sua collection
    const dialogs = await historicoCollection.find({}).toArray();
    res.json({ success: true, dialogs: dialogs });
  } catch (error) {
    console.error('Erro ao buscar os diálogos:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar os diálogos' });
  }
});

// Endpoint to register conversation history
app.post('/historico', async (req, res) => {
  const { usuario, mensagem, timestamp = new Date() } = req.body; // Include timestamp by default

  if (Object.values(req.body).length == 0 || usuario.trim().length == 0 || mensagem.trim().length == 0) {
    return res.status(500).json({ message: 'Usuário e mensagem são obrigatórios' });
  }

  try {
    const db = client.db(dbName); // Replace with your actual database name
    const collection = db.collection("historico"); // Replace with your actual collection name

    const result = await collection.insertOne({ usuario, mensagem, timestamp });
    res.status(201).json({ message: 'Conversa registrada', id: result.insertedId });
  } catch (err) {
    console.error("Error inserting conversation document:", err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Endpoint to register login data
app.post('/login', async (req, res) => {
  const { username } = req.body;

  if (Object.values(req.body).length == 0) {
    return res.status(500).json({ message: 'Usuário é obrigatório' });
  }

  // Implement login validation logic here (e.g., check against a user database)
  // ...

  try {
    // Consultar o IP no serviço na nuvem
    const ipResponse = await axios.get('https://api.ipify.org?format=json'); // Exemplo de API para obter o IP
    const ipAddress = ipResponse.data.ip;
    var city = "Indefinida";
    var state = "Indefinido";
    var country = "Indefinido";

    //if (ipAddress != undefined && ipAddress.lenght>8) {
    // Consultar a cidade e estado pelo IP
    const geoResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`); // Substitua 'https://api.example.com/location?ip=' pela URL real da API
    const locationData = geoResponse.data;
    city = locationData.city; // Adicione a cidade
    state = locationData.regionName; // Adicione o estado
    country = locationData.country;
    //}

    const db = client.db(dbName);
    const collection = db.collection("login");

    await collection.insertOne({
      username,
      timestamp: new Date(),
      ipAddress: ipAddress, // Adicione o IP ao documento
      city,
      state,
      country
    });

    res.status(200).json({ message: 'Login registrado' });
  } catch (err) {
    console.error("Error inserting login document:", err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Graceful shutdown on termination
process.on('SIGINT', async () => {
  await client.close();
  console.log("Conexão com o MongoDB Atlas fechada");
  process.exit(0);
});

// const tabela = mongoose.model(
//   "historico",
//   {
//     mensagem: String
//   }
// );
