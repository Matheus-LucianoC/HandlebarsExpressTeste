const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const path = require('path');
app.set('views', path.join(__dirname, 'views')); 

app.engine('handlebars', exphbs.engine({ defaultLayout: false}));
app.set('view engine', 'handlebars');

let pessoas = [
    { id: 1, pessoa: "Pessoa 1" },
    { id: 2, pessoa: "Pessoa 2" },
    { id: 3, pessoa: "Pessoa 3" },
];

app.get('/', (req, res) => res.render('home'));

app.get('/pessoas', (req, res) =>{
    res.render('listarPessoas', { pessoas });
});

app.get('/pessoas/nova', (req,res) => res.render('cadastrarPessoa'));

app.post('/pessoas', (req,res) => {
    const { pessoa } = req.body;
    const novaPessoa = {id: pessoas.length + 1, pessoa };
    pessoas.push(novaPessoa);
    res.render('listarPessoas', { pessoas });
});

app.get('/pessoas/ver/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');

    res.render('detalharPessoa', { pessoa });
});

app.get('/pessoas/:id/editar', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');

    res.render('editarPessoa', { pessoa });
});

app.post('/pessoas/:id/editar/', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');

    pessoa.pessoa = req.body.pessoa;
    res.render('listarPessoas', { pessoa });
});

app.post('/pessoas/excluir/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).send('Pesssoa não encontrada');

    pessoas.splice(index, 1);
    res.redirect('/pessoas');
});


app.listen(port, () => {
    console.log(`Servidor em execução: http://localhost:${port}`);
});


