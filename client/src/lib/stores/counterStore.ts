import { action, makeObservable, observable } from 'mobx';

export default class CounterStore {
    title = 'Counter Store';
    count = 0;

    constructor() {

        // observavle: Estado o dato que MobX puede observar y reaccionar a cambios

        makeObservable(this, {
            title: observable,
            count: observable,
            increment: action,
            decrement: action
        })
    }

    increment = (amount = 1) => {
        this.count += amount;
    }

    decrement = (amount = 1) => {
        this.count -= amount;
    }
}