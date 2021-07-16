import { openDB } from 'idb';

const DATABASE_NAME = 'Location-Data';
const DATABASE_VERSION = 1;

// const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
//   upgrade(db) {
//     db.createObjectStore('todoList');
//   }
// });

export class IDBService {
  async insertValues(data) {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    const newTodoId = 'todo' + new Date().getTime();
    const newTodo = { ...data, id: newTodoId };
    return db
      .add('todoList', newTodo, newTodoId)
      .then(result => {
        // console.log('insertValues result', result);
        return result;
      })
      .catch(err => {
        console.error('Failed Add Todo', err);
      });
  }

  async getData() {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    return db
      .getAll('todoList')
      .then(result => {
        console.log('get result', result);
        return result;
      })
      .catch(err => {
        console.error('Failed Get Todos', err);
        return err;
      });
  }

  async updateData(data) {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    return db
      .put('todoList', data, data.id)
      .then(result => {
        // console.log('Updated Data', result);
        return result;
      })
      .catch(err => {
        console.error('Failed to Update data: ', err);
        return err;
      });
  }

  async deleteData(data) {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    db
      .delete('todoList', data.id)
      .then(result => {
        console.log('Data Deleted', result);
      })
      .catch(err => {
        console.error('Failed to Delete data: ', err);
      });

    db.close();
  }
}
