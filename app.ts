import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import * as crypto from "crypto"

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }

    removeUser(user: User): void {
        const userToBeRemoved = this.findUser(user.email)
        if(userToBeRemoved === undefined) {
            throw new Error('User not found.')
        }
        this.users = this.users.filter(object => object.id === userToBeRemoved.id)
    }

    findBike(id: string): Bike | undefined {
        return this.bikes.find(object => object.id === id)
    }

    registerBike(bike: Bike): void{
        if (bike.id !== undefined) {
            throw new Error ('Bike already registered.')
        }

        bike.id = crypto.randomUUID()
        this.bikes.push(bike)
    }

    removeBike(bike: Bike): void{
        if (bike.id === undefined) {
            throw new Error('Bike not registered.')
        }
        this.bikes = this.bikes.filter(object => object.id !== bike.id)
    }

    rentBike(bike: Bike, user: User, startDate: Date, endDate: Date): void{
        if (bike.id === undefined) {
            throw new Error('Bike not registered.')
        }
        if (bike.available === false){
            throw new Error('Bike not available.')
        }
        this.rents.push(Rent.create(this.rents, bike, user, startDate, endDate))
        bike.available = false
    }

    returnBike(bike: Bike): void {
        if (bike.id === undefined) {
            throw new Error('Bike not registered.')
        }
        bike.available = true
    }

    showUsers(): void {
        console.log(`\n### User list (${this.users.length}) ###`)
        this.users.forEach(user => console.log(`- ${user.name}, email: ${user.email}`))
    }

    showBikes(): void {
        console.log(`\n### Bike list (${this.bikes.length}) ###`)
        this.bikes.forEach(bike => console.log(` - bike name: ${bike.name}  \u{2b50}: ${bike.rate} | available: ${(bike.available ? '\u{2705}' : '\u{274c}')}`))
    }

    showRents(): void {
        console.log(`\n### Rent list (${this.bikes.length}) ###`)
        this.rents.forEach(rent => console.log(` - user: ${rent.user} | bike: ${rent.bike} | from: ${rent.dateFrom} to: ${rent.dateTo}`))
    }

    userAuthentication(email: string, password: String): boolean {
        const user = this.findUser(email)
        if (user === undefined) {
            throw new Error("User not found.")
        }
        return user.password === password
    }
}