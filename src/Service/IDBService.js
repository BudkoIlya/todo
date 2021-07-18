import { openDB } from 'idb';

const DATABASE_NAME = 'Location-Data';
const DATABASE_VERSION = 1;

export class IDBService {
  async insertValues(data) {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    const newTodoId = 'todo' + new Date().getTime();
    const newTodo = { ...data, id: newTodoId };
    return db
      .add('todoList', newTodo, newTodoId)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.error('Failed Add Todo', err);
        throw new SyntaxError(err);
      });
  }

  async getData() {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    return db
      .getAll('todoList')
      .then(result => {
        return result;
      })
      .catch(err => {
        console.error('Failed Get Todos', err);
        throw new SyntaxError(err);
      });
  }

  async updateData(data) {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    return db
      .put('todoList', data, data.id)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.error('Failed to Update data: ', err);
        throw new SyntaxError(err);
      });
  }

  async deleteData(todId) {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    return db
      .delete('todoList', todId)
      .then(result => {
        console.log('Data Deleted', result);
      })
      .catch(err => {
        console.error('Failed to Delete data: ', err);
        throw new SyntaxError(err);
      });
  }
}
