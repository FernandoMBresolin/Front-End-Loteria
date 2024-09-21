/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = () => {
    let url = 'http://127.0.0.1:5000/jogos';
    fetch(url, {method: 'get',})
      .then((response) => response.json())
      .then((data) => {
        clearList(); // Limpa a lista antes de adicionar novos itens
         // Adiciona cada item à tabela
        data.jogos.forEach(item => insertList(item.modalidade, item.numeros, item.id))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}
  
/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()
  
/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = (postModel, postGame) => {
    const formData = new FormData();
    formData.append('modalidade', postModel);
    formData.append('numeros', postGame);
  
    let url = 'http://127.0.0.1:5000/jogo';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
}
  
/*
  --------------------------------------------------------------------------------------
  Função para limpar a lista exibida na página
  --------------------------------------------------------------------------------------
*/
const clearList = () => {
  var table = document.getElementById('myTable');
  // Mantém a primeira linha (cabeçalho) e remove todas as outras
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
}
  
  
/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const idItem = div.getElementsByTagName('td')[2].innerHTML
        div.remove()
        deleteItem(idItem)         
      }
    }
}
  
/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/jogo?id=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
}
  
/*
  --------------------------------------------------------------------------------------
  Função para ordenar a lista de números em ordem crescente
  --------------------------------------------------------------------------------------
  */
const sort = (array) => array.sort((a, b) => a - b);

/*
  --------------------------------------------------------------------------------------
  Função para gerar uma lista de números únicos 
  --------------------------------------------------------------------------------------
*/
const generateUniqueNumbers = (count, min, max) => {
  const numbers = new Set();
  while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo jogo com 6 numeros unicos e ordenados
  --------------------------------------------------------------------------------------
*/
const newGame1 = () => {
  const inputModel = 'Mega-Sena';
  const inputGame = generateUniqueNumbers(6, 1, 60);
  
  insertList(inputModel, inputGame);
  postItem(inputModel, inputGame);
  setTimeout(getList, 750);
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo jogo com 15 numeros unicos e ordenados
  --------------------------------------------------------------------------------------
*/
const newGame2 = () => {
  const inputModel = 'Lotofácil';
  const inputGame = generateUniqueNumbers(15, 1, 25);
  
  insertList(inputModel, inputGame);
  postItem(inputModel, inputGame);
  setTimeout(getList, 750);
}  
  
/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (gameModel, numberList, index) => {
  var item = [gameModel, numberList, index]
  var table = document.getElementById('myTable');
  var row = table.insertRow();
  
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  removeElement()
}

/*
  --------------------------------------------------------------------------------------
  Função para filtrar a tabela
  --------------------------------------------------------------------------------------
*/
const filterGames = () => {
  const filter = document.getElementById('gameFilter').value;
  const table = document.getElementById('myTable');

  for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];
      const gameType = row.cells[0].textContent; // Obter o tipo de jogo da primeira célula
      
      if (filter === "all" || gameType === filter) {
          row.style.display = ""; // Mostra a linha
      } else {
          row.style.display = "none"; // Esconde a linha
      }
  }
}