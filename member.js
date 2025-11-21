// members.js
import { v4 as uuidv4 } from "uuid";

// In-memory members array
export let members = [
  {
    id: uuidv4(),
    name: "Faisal",
    borrowedBooks: [
      { bookId: "1", borrowedAt: "2025-11-21T10:00:00Z" },
    ],
  },
  {
    id: uuidv4(),
    name: "Ali Ahmed",
    borrowedBooks: [
      { bookId: "2", borrowedAt: "2025-10-21T03:00:00Z" },
    ],
  },
];

// ---------------- Members CRUD Functions ----------------

// Add a new member
export function addMember(member) {
  if (!member.name) throw new Error("Member name is required");

  const newMember = {
    id: uuidv4(),
    name: member.name,
    borrowedBooks: member.borrowedBooks || [],
  };
  members.push(newMember);
  return newMember;
}

// Get all members
export function getAllMembers() {
  return members;
}

// Get a member by ID
export function getMemberById(id) {
  return members.find((m) => m.id === id);
}

// Update a member
export function updateMember(id, updatedMember) {
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) throw new Error("Member not found");

  members[index] = { ...members[index], ...updatedMember };
  return members[index];
}

// Delete a member
export function deleteMember(id) {
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) throw new Error("Member not found");

  return members.splice(index, 1)[0];
}
