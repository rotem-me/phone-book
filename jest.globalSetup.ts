import { contactsManager } from "./src/managers/contacts-manager";

beforeAll(async () => {
  await contactsManager.connect();
});

beforeEach(async () => {
  await contactsManager.delete({});
});

afterEach(async () => {
  await contactsManager.delete({});
});

afterAll(async () => {
  await contactsManager.close();
});
