import {makeAutoObservable, runInAction} from "mobx";

export class Store {
    posts = []
    loading = false
    success = false
    abortController

    constructor() {
        makeAutoObservable(this)
    }

    abortRequest() {
        if (this.abortController) this.abortController.abort()
    }

    fetchPosts() {

        runInAction(() => {
            this.abortController = new AbortController();
        })

        if (this.abortController) {
            const signal = this.abortController.signal
            this.loading = true

            fetch('https://jsonplaceholder.typicode.com/posts', {signal})
                .then(response => response.json())
                .then(result => {
                    runInAction(() => {
                        this.posts = result
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

    createPost = async (title, body) => {

        runInAction(() => {
            this.abortController = new AbortController();
        })

        if (this.abortController) {
            this.loading = true
            await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
                .then(() => {
                    runInAction(() => {
                        this.success = true
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