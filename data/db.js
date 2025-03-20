import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'myapp.db', location: 'default' },
  () => console.log('Database opened'),
  error => console.error('Database error:', error)
);

export default db;
