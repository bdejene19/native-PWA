import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connect db
  let notesDB = await openDB("jate", 1);

  // create transaction to create new note
  const newNoteTx = notesDB.transaction("jate", "readwrite");

  // open store of desired object for manipulation
  const store = newNoteTx.objectStore("jate");

  const createdNote = store.add({ jate: content });

  const res = await createdNote;
  console.log("successfully created new note");

  return res;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Create a connection to the database database and version we want to use.
  const notesDB = await openDB("todos", 1);

  // Create a new transaction and specify the database and data privileges.
  const notesTx = notesDB.transaction("todos", "readonly");

  // Open up the desired object store.
  const store = notesTx.objectStore("todos");

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log("all content from db: ", result);
  return result;
};

initdb();
