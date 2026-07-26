import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = 3000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error(err);
    }
}

startServer();