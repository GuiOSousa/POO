import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike('mountain bike', 'mountain', 
    123, 500, 100.5, 'desc', 5, [])
const user = new User('Maria', 'maria@mail.com', '1234')
const today = new Date()
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const sevenDaysFromToday = new Date()
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7)
const rent1 = Rent.create([], bike, user, today, twoDaysFromToday)
const user2 = new User('Maria Clara', 'maria@mail.com', '3123')
const usersToAdd = [{"name": "Maria Teresa","email": "mariat@mail.com","password": "abcd1234"},{"name": "Carlos Gomes","email": "carlao1234@mail.com","password": "senhaSegura"},{"name": "Jõao Costa","email": "jcosta@mail.com","password": "12346789"},{"name": "Miles Morales","email": "miranha@mail.com","password": "AbCdEfGh"},{"name": "Joana Miranda","email": "jojo645@mail.com","password": "seinha"},{"name": "Olívia Oliveira","email": "olioli@mail.com.br","password": "0198763455"}]
/*const bikesToAdd = [{"name": "Monark 430","type": "Mountain Bike","bodySize": 12,"maxLoad": 1,"rate": 4.7,"description": "Bike description","ratings": 100,"imageUrls": ["www.images.com"]
},{"name": "Monark 500","type": "Mountain Bike","bodySize": 15,"maxLoad": 2,"rate": 4.6,"description": "Bike description","ratings": 63,"imageUrls": ["www.images.com"]
},{"name": "Caloi Cicle X","type": "Street Bike","bodySize": 12,"maxLoad": 1,"rate": 4.96,"description": "Bike description","ratings": 634,"imageUrls": ["www.images.com", "www.images.com"]
},{"name": "Caloi 2000","type": "Mountain Bike","bodySize": 16,"maxLoad": 1,"rate": 3.7,"description": "Bike description","ratings": 45,"imageUrls": ["www.images.com"]
},{"name": "Focus Speed","type": "Street Bike","bodySize": 8,"maxLoad": 2,"rate": 4.54,"description": "Bike description","ratings": 198,"imageUrls": ["www.images.com"]}]*/

const bike2 = new Bike("Monark 430", "Mountain Bike", 12, 1, 4.7, "Bike description", 100, ["www.images.com"])
const app = new App()

app.registerUser(user)
usersToAdd.forEach(user => app.registerUser(user))
app.registerBike(bike)
app.registerBike(bike2)
app.rentBike(bike, user, today, twoDaysFromToday)
//bikesToAdd.forEach(bike => app.registerBike(new Bike(bike)))
console.log(app.findUser('maria@mail.com'))
console.log(app.rents)
app.showUsers()
app.showBikes()
app.showRents()

if (app.userAuthentication("mariat@mail.com", "abcd1234")){
    console.log("Sucessful Login")
} else {
    console.log("Incorrect password")
}
if (app.userAuthentication("carlao1234@mail.com", "XXXXX")){
    console.log("Sucessful Login")
} else {
    console.log("Incorrect password")
}