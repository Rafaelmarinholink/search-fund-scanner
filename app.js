// SUBSTITUA pelos seus dados:
const baseId = 'cole_aqui_seu_BASE_ID';
const tableName = 'Empresas';
const apiKey = 'cole_aqui_sua_API_KEY';

const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
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
