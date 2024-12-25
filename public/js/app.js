console.log('client side javascript is loaded')



const weatherForm = document.querySelector('form')
const searchEelement = document.querySelector('input')

const messageOne= document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
e.preventDefault()

const location = searchEelement.value
messageOne.textContent = 'Loading...'
fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
  response.json().then((data)=>{
    if(data.error){
    messageOne.textContent=data.error
    }else {
      messageOne.textContent='we are in '+data.location + " !"
      messageTwo.textContent="it is currently "+data.forecast.temperature + ' degree celcius'

    }
  })
})

})