import express from 'express';
import { mutantRoutes } from './routes/mutant';
import { statsRoutes } from './routes/stats';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", mutantRoutes);
app.use("/api", statsRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
