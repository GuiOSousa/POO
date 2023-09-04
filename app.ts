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
}