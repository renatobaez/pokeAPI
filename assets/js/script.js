const urlBase = 'https://pokeapi.co/api/v2/pokemon?limit=10'
let offSET = 0
const DASHBOARD = document.querySelector('.dashboard')

const getData = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

const getPokemons = async () => {
  try{
    const { results } = await getData(urlBase + '&offset=' + offSET)
    const data = results?.map(({ url }) => getData(url))
    const pokemons = await Promise.all(data)
    const template = pokemons.map(({ name , id , sprites }) => `
      <div class="card">
        <img src="${sprites.other['official-artwork'].front_default}" class="card-img-top" alt="img Front ${name}">
        <div class="card-body">
          <span>Numero: ${id}</span>
          <h3>${name}</h3>
        </div>
      </div>
    `)
    DASHBOARD.innerHTML = template.join('')
  } catch (error){
    console.error(error)
  }
}

getPokemons()

function previous(){
  if(offSET > 1){
    offSET = offSET - 10
    getPokemons()
  }
}
function next(){
  offSET = offSET + 10
  getPokemons()
}