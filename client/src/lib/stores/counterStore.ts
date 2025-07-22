import { makeAutoObservable } from 'mobx';

export default class CounterStore {
    title = 'Counter Store';
    count = 0;

    events: string[] = [
        `El contador se ha inicializado con el valor ${this.count}`,
    ]

    constructor() {

        // observavle: Estado o dato que MobX puede observar y reaccionar a cambios

        // makeObservable(this, {
        //     title: observable,
        //     count: observable,
        //     increment: action,
        //     decrement: action
        // })

        // makeAutoObservable: Hace que todas las propiedades sean observables y los métodos sean acciones automáticamente
        // No es necesario definir cada propiedad y método manualmente
         makeAutoObservable(this)
    }

    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`El contador se ha incrementado en ${amount}. Nuevo valor: ${this.count}`);
    }

    decrement = (amount = 1) => {
        this.count -= amount;
         this.events.push(`El contador se ha restado en ${amount}. Nuevo valor: ${this.count}`);
    }

    get eventCount() {
        return this.events.length;
    }
}