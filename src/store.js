import {makeAutoObservable, runInAction} from "mobx";

export class Store {
    todos = []
    loading = false
    abortController

    constructor() {
        makeAutoObservable(this)
    }

    abortRequest() {
        if (this.abortController) this.abortController.abort()
    }

    fetchRequest() {

        runInAction(() => {
            this.abortController = new AbortController();
        })

        if (this.abortController) {
            const signal = this.abortController.signal
            this.loading = true

            fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {signal})
                .then(response => response.json())
                .then(result => {
                    runInAction(() => {
                        this.todos = result
                        this.loading = false
                    })
                })
                .catch(error => {
                    if (!this.abortController.signal.aborted) {
                        console.log(error)
                    }
                })
        }
    }
}

export const store = new Store();