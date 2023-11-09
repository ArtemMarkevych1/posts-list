import {observer} from 'mobx-react';
import {useEffect} from 'react';
import {store} from './store';

const Posts = observer(() => {

    useEffect(() => {
        store.fetchRequest()
        return () => store.abortRequest()
    }, [])

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-slate-400">

                <thead>
                <tr>
                    <th className="border border-slate-300 p-2">Title</th>
                    <th className="border border-slate-300 p-2">Completed</th>
                </tr>
                </thead>
                <tbody>
                {store.loading && <p>Loading...</p>}
                {store.todos.map(todo => (
                    <tr key={todo.id}>
                        <td className="border border-slate-300 p-2">{todo.title}</td>
                        <td className="border border-slate-300 p-2">{todo.completed ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
});

export default Posts;