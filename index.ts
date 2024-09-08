import { app } from "./src/app";
import { PHONE_BOOK_PORT } from "./src/settings";
import { contactsManager } from "./src/managers/contacts-manager";

const startServer = async () => {
  try {
    await contactsManager.connect();

    app.listen(PHONE_BOOK_PORT, () => {
      console.log(`Server is running on port ${PHONE_BOOK_PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

const shutdown = async () => {
  try {
    console.log("Shutting down server...");
    await contactsManager.close();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

// Listen for termination signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Start the server
startServer();
