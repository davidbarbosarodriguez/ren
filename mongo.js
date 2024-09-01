const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://davidbarbosarodriguez:${password}@prueba.izacn.mongodb.net/?retryWrites=true&w=majority&appName=prueba`
mongoose.set('strictQuery',false)



mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(Person => {
      console.log(Person)
    })
    mongoose.connection.close()
  })
}
if(process.argv.length === 5){
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  newPerson.save().then(result => {
    console.log('added',newPerson.content,'number',newPerson.number,'to phonebook')  
    mongoose.connection.close()
  })
}


