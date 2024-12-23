# SOCIAL

SOCIAL is an interactive and secure social media web application designed to foster meaningful connections among users. Built with **Node.js** and **EJS**, SOCIAL combines modern web technologies with essential features for a seamless and user-friendly experience. Users can create, engage, and manage content while maintaining full control over their personal data.

## Features

### User Authentication
- **Sign Up and Log In**: Seamlessly register and access the platform.
- **Email Verification**: Ensures account authenticity by verifying user email addresses.
- **Session Management**: Automatically redirects authenticated users to the feed and prevents unauthorized access to restricted pages.
- **Secure Password Storage**: User credentials are protected with robust password hashing techniques.

### Content Creation and Interaction
- **Posts**:
  - Create rich posts with **text** or **text and images**.
  - Edit your own posts, including adding or removing images.
  - Delete your posts with ease.
  - Full ownership: Only post creators can edit or delete their content.

- **Comments**:
  - Share your thoughts by commenting on posts.
  - Edit or delete your own comments.
  - Respectful boundaries: Users cannot modify or remove comments made by others.

### Profile Management
- Personalize your experience by uploading a profile picture.

### Security and Privacy
- User data is safeguarded with secure practices, including hashed passwords and environment-based configuration management.

## Technologies Used
- **Node.js**: Backend framework for server-side operations.
- **EJS (Embedded JavaScript)**: Dynamic templating for interactive pages.
- **Express.js**: Lightweight framework for efficient web application development.
- **Sequelize**: Object-Relational Mapping (ORM) for seamless database interactions.
- **MySQL**: Robust and scalable relational database.
- **dotenv**: Securely manage configuration through environment variables.
- **Session Management**: Maintains user sessions for an uninterrupted experience.
- **Password Hashing**: Implements advanced security measures to protect user credentials.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- NPM (Node Package Manager)
- MySQL database

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SOCIAL
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DB_HOST=your-database-host
     DB_USER=your-database-username
     DB_PASSWORD=your-database-password
     DB_NAME=your-database-name
     ```

4. Configure the database:
   - Use Sequelize to migrate and sync the database:
     ```bash
     npx sequelize db:migrate
     ```

5. Run the app:
   ```bash
   npm start
   ```

6. Open the app in your browser:
   ```
   http://localhost:8000
   ```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to contribute, report bugs, or suggest new features!
