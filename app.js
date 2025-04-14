// SUBSTITUA pelos seus dados:
const baseId = 'app5AQ4goCRsCVNo9';
const tableName = 'Empresas';
const apiKey = 'pat2Snm2JeXVzgGlj.c7cd4d9ae1025806bf89de2148770f382250179a948e30318a2f24268cf02b1e';

const url = `https://api.airtable.com/v0/app5AQ4goCRsCVNo9/Empresas`;
const headers = {
  Authorization: `Bearer ${apiKey}`,
  'Content-Type': 'application/json'
};
// Função para adicionar empresa
document.getElementById('empresa-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    fields: {
      Nome: document.getElementById('nome').value,
      Ticker: document.getElementById('ticker').value,
      Valuation: parseFloat(document.getElementById('valuation').value),
      Receita: parseFloat(document.getElementById('receita').value),
      EBITDA: parseFloat(document.getElementById('ebitda').value)
    }
  };

  await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });

  carregarEmpresas(); // atualiza a lista após inserir
});

// Função para carregar empresas do Airtable
async function carregarEmpresas() {
  const res = await fetch(url, { headers });
  const json = await res.json();

  const lista = document.getElementById('lista-empresas');
  lista.innerHTML = ''; // limpa a lista antes de preencher novamente

  json.records.forEach((record) => {
    const li = document.createElement('li');
    li.textContent = `${record.fields.Nome} | Valuation: $${record.fields.Valuation}M | Receita: ${record.fields.Receita}`;
    lista.appendChild(li);
  });
}

// Carrega as empresas ao abrir a página
carregarEmpresas();
