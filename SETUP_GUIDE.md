# KELLOG SETUP & DEPLOYMENT GUIDE

## 1. FULL LOCAL SETUP GUIDE

### Database Setup
1. **Install PostgreSQL**: Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/).
2. **Create Database**: Open pgAdmin or psql terminal and run:
   ```sql
   CREATE DATABASE kellog_db;
   ```
3. **Environment Setup**: In the `backend` folder, create a `.env` file based on the example below.
4. **Run Migrations**: Navigate to the `backend` folder and run:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   *(Alternatively, use `npx prisma migrate dev --name init` for structured migrations)*

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   *(or `npm run dev` if nodemon is configured)*

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

---

## 2. ENV FILE EXAMPLES

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/kellog_db?schema=public
PORT=5000
JWT_SECRET=super_secret_jwt_key_kellog_2026
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## 3. HOW TO RUN PROJECT
To run the full stack locally:
1. **Start database**: Ensure PostgreSQL is running in the background.
2. **Start backend server**: Open a terminal, `cd backend`, and run `npm start`. (Server should run on port 5000).
3. **Start frontend server**: Open a second terminal, `cd frontend`, and run `npm run dev`. (Server should run on port 3000).
4. **Access the App**: Open your browser to `http://localhost:3000`.

---

## 4. GITHUB UPLOAD STEPS
Run these commands in the root `kellog` directory to push your project to GitHub:

```bash
git init
git add .
git commit -m "Initial KELLOG ecommerce project"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

---

## 5. DEPLOYMENT GUIDE

### Database
- Host your PostgreSQL database on a cloud provider like **Supabase**, **Render**, or **Neon**.
- Get the external connection URL and save it for the backend `.env`.

### Backend (Render or Railway)
1. Push your code to GitHub.
2. Create a new Web Service on Render or Railway.
3. Set the Root Directory to `backend`.
4. Build Command: `npm install && npx prisma generate`
5. Start Command: `npm start`
6. Add Environment Variables (`DATABASE_URL`, `JWT_SECRET`, `PORT`, `FRONTEND_URL`).

### Frontend (Vercel)
1. Import your GitHub repository to Vercel.
2. Set the Root Directory to `frontend`.
3. Vercel will automatically detect Next.js settings.
4. Add Environment Variables (`NEXT_PUBLIC_API_URL` pointing to your deployed backend URL).
5. Click **Deploy**.
