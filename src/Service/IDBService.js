import { openDB } from 'idb';

const DATABASE_NAME = 'Task-Data';
const DATABASE_VERSION = 1;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(db) {
    db.createObjectStore("todoList");
    db.createObjectStore("categories");
  }
});

export const IDBServiceTasks = {
  async insertValues(data)  {
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
  },

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
  },

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
  },

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
};

export const IDBServiceCategories = {
  async insertValues(data) {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    const newCategoryId = 'category' + new Date().getTime();
    const newCategory = { ...data, id: newCategoryId };
    return db
        .add('categories', newCategory, newCategoryId)
        .then(result => {
          return result;
        })
        .catch(err => {
          console.error('Failed Add Todo', err);
          throw new SyntaxError(err);
        });
  },

  async getData() {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    return db
        .getAll('categories')
        .then(result => {
          return result;
        })
        .catch(err => {
          console.error('Failed Get Todos', err);
          throw new SyntaxError(err);
        });
  },

  async updateData(data) {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    return db
        .put('categories', data, data.id)
        .then(result => {
          return result;
        })
        .catch(err => {
          console.error('Failed to Update data: ', err);
          throw new SyntaxError(err);
        });
  },

  async deleteData(todId) {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
    return db
        .delete('categories', todId)
        .then(result => {
          console.log('Data Deleted', result);
        })
        .catch(err => {
          console.error('Failed to Delete data: ', err);
          throw new SyntaxError(err);
        });
  }
};
