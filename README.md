🧠 Smriti-Saathi — Memory Support & Cognitive Gaming

Smriti-Saathi is a web-based memory support platform designed to support cognitive engagement through interactive games, personal memories, reminders, and progress tracking.

The project aims to provide a simple, accessible, and user-friendly experience for people who want to practise memory-related activities and for caregivers who want to monitor progress.

✨ Features

* 🧩 Cognitive Games: Interactive memory-matching and sequence-recall activities.
* 📊 Progress Tracking: Record and review game scores and activity history.
* 🔔 Reminders: Organise daily reminders and routines.
* 💭 Personal Memories: Keep meaningful memories accessible.
* 👥 Caregiver Dashboard: Support caregiver access to assigned patient activity.
* 🔐 Authentication: Sign up and sign in using Supabase Authentication.
* 🌐 Language Support: Language selection for a more accessible experience.
* 📱 Responsive Interface: Designed with usability across different screen sizes in mind.

Note: Features such as complete multilingual translation, spoken-language support, and browser notifications may require additional implementation and testing.

🛠️ Tech Stack

* Frontend: React, TypeScript
* Build Tool: Vite
* Styling: CSS and Tailwind CSS
* Backend / Database: Supabase
* Authentication: Supabase Auth
* Version Control: Git and GitHub

📁 Project Structure

smriti-saathi---memory-support-&-cognitive-gaming/
├── src/
│   ├── services/
│   │   └── supabase.ts
│   ├── App.tsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md

🚀 Getting Started

Prerequisites

* Node.js and npm
* A Supabase account
* Git

1. Clone the Repository

git clone https://github.com/gayatri162/Smriti-Saathi.git

2. Open the Project Directory

cd Smriti-Saathi/smriti-saathi---memory-support-\&-cognitive-gaming

If the directory name differs in the repository, navigate into the folder containing package.json.

3. Install Dependencies

npm install

4. Configure Environment Variables

Create a .env file in the directory containing package.json.

Add your Supabase project URL and publishable/anon key using the variable names expected by src/services/supabase.ts.

For example, if the code uses Vite environment variables:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key

Important: Never commit .env or expose your Supabase service-role/secret key in frontend code.

5. Start the Development Server

npm run dev

Open the local URL printed in the terminal.

🗄️ Supabase Setup

1. Create a Supabase project.
2. Configure Authentication.
3. Create the database tables required by the application.
4. Configure Row Level Security (RLS) policies.
5. Add the appropriate environment variables locally.

The exact table structure and policies should match the SQL and queries used by the current application.

👩‍💻 Team Collaboration

This project is maintained using Git and GitHub.

🔒 Security

* Keep .env out of version control.
* Never expose service-role keys in client-side code.
* Use appropriate Supabase RLS policies to protect patient and caregiver data.
* Avoid entering real patient or sensitive personal information during demonstrations.

🎯 Project Goal

To make memory-related activities more engaging and accessible through cognitive games, personal memories, reminders, and progress tracking.

📌 Project Status

Developed as a team project for a hackathon. Features and integrations are being implemented and tested.

📄 License

