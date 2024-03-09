import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
console.log(contactsPath);

const updateListContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
}

export async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  const result = contacts.splice(index, 1);

  await updateListContacts(contacts);
  return result;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await updateListContacts(contacts);

  return newContacts;
}
