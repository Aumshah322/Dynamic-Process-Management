import React, { useEffect } from 'react';
import { useDatabase } from 'react-sqlite-hook';

const MyComponent = () => {
  // Initialize SQLite hook
  const db = useSQLite();
console.log(db)
  // Get a reference to the SQLite database
  const database = useDatabase();

  // Define your database creation query
  const createDatabaseQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER
    );
  `;

  // Execute the database creation query
  React.useEffect(() => {
    if (database) {
      database.exec(createDatabaseQuery);
    }
  }, [database]);// Include db in the dependency array to ensure it's initialized only once
console.log(database)
  return (
    <div>
      {/* Your component content */}
    </div>
  );
};

export default MyComponent;