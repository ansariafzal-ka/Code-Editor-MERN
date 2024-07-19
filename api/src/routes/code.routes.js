const express = require("express");
const router = express.Router();

const Code = require("../models/code.models");

const dummyCode = `class Contact:
    def __init__(self, name, phone, email):
        self.name = name
        self.phone = phone
        self.email = email

    def __str__(self):
        return f"Name: {self.name}, Phone: {self.phone}, Email: {self.email}"


class ContactManager:
    def __init__(self):
        self.contacts = []

    def add_contact(self, name, phone, email):
        new_contact = Contact(name, phone, email)
        self.contacts.append(new_contact)
        print("Contact added successfully.\n")

    def list_contacts(self):
        if not self.contacts:
            print("No contacts available.\n")
        else:
            print("List of Contacts:")
            for contact in self.contacts:
                print(contact)
            print()

    def remove_contact(self, name):
        contact_to_remove = next((contact for contact in self.contacts if contact.name == name), None)
        if contact_to_remove:
            self.contacts.remove(contact_to_remove)
            print("Contact removed successfully.\n")
        else:
            print("Contact not found.\n")

    def main_menu(self):
        print("Contact Management System")
        print("1. Add a Contact")
        print("2. List all Contacts")
        print("3. Remove a Contact")
        print("4. Exit")

        # Predefined actions for testing
        actions = [
            {"option": "1", "data": {"name": "Alice", "phone": "123-456-7890", "email": "alice@example.com"}},
            {"option": "1", "data": {"name": "Bob", "phone": "987-654-3210", "email": "bob@example.com"}},
            {"option": "2"},
            {"option": "3", "data": {"name": "Alice"}},
            {"option": "2"},
            {"option": "4"}
        ]

        for action in actions:
            option = action["option"]
            if option == "1":
                self.add_contact(action["data"]["name"], action["data"]["phone"], action["data"]["email"])
            elif option == "2":
                self.list_contacts()
            elif option == "3":
                self.remove_contact(action["data"]["name"])
            elif option == "4":
                print("Exiting...")
                break
            else:
                print("Invalid option. Please try again.\n")


if __name__ == "__main__":
    manager = ContactManager()
    manager.main_menu()
`;

router.post("/new-code", async (req, res) => {
  try {
    const { author, fileName, code } = req.body;
    const newCode = await Code.create({
      author: author,
      fileName: fileName,
      code: code,
    });
    res.status(201).json({ message: "code saved", code: newCode });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.put("/save/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { author, fileName, code } = req.body;

    const savedCode = await Code.findByIdAndUpdate(id, {
      author: author,
      fileName: fileName,
      code: code,
    });

    res.status(200).json({ message: "code saved", code: savedCode });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.delete("/delete/:id", async () => {});
router.get("/", async (req, res) => {
  try {
    const codes = await Code.find();
    res.status(200).json({ codes: codes });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.get("/:id", async () => {});

module.exports = router;
