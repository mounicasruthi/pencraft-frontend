# Pencraft Frontend

The frontend of **Pencraft** is built with **Next.js** and features a responsive, user-friendly UI for creating, viewing, and summarizing blog posts. This client-side application communicates with the backend for authentication, post management, and AI summarization.

---

## Features


- **Dynamic Post Routing**: Each post has its own dedicated route using Next.js's dynamic routing.
- **Markdown Support**: Create posts using a markdown-friendly editor with a live preview.
- **Generative AI Summarization**: Summarize articles effortlessly using the Gemini API.
- **Dark and Light Mode**: Toggle between themes seamlessly for an optimal reading experience.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Post Discovery**:
  - View all posts written by all authors.
  - Search posts using a powerful search bar.
  - Filter posts by author.
- **User Profiles**:
  - View and manage your own posts from your profile page.
  - Publish new posts with ease using a markdown editor.


![image](https://github.com/user-attachments/assets/26c0aa84-1d52-43cf-99fe-d9d9156e98c7)

![image](https://github.com/user-attachments/assets/2d4310a3-335b-4d4a-a64e-ab59f97b1a2b)

![image](https://github.com/user-attachments/assets/383b81c2-0196-4cd3-8a13-e87758330281)

![image](https://github.com/user-attachments/assets/e732611f-35a9-4c41-b3f2-1254511d1b4e)

![image](https://github.com/user-attachments/assets/b40b8dec-a739-43ca-8986-5dbb555ecfb8)

![image](https://github.com/user-attachments/assets/b59a5668-7a6d-4e02-8280-63a3c7aec478)

![image](https://github.com/user-attachments/assets/8617f8aa-1a06-4352-a39e-9472ec4422a2)

---

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Markdown Rendering**: `react-showdown` and `showdown`
- **UI Components**: Custom-built with reusable components.
- **API Communication**: Axios and REST.

---

## Setup Instructions

### Prerequisites
- Node.js (14+)
- npm or yarn
- API Endpoint for the backend (e.g., http://localhost:5000).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mounicasruthi/pencraft-frontend.git
   cd pencraft-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app at [http://localhost:3000](http://localhost:3000).

---

## Key Functionalities

- **Advanced Markdown Editor**
  - Real-time markdown preview using `react-mde` and `showdown`.
  - User-friendly formatting toolbar for easy editing.

- **AI-Powered Article Summarization**
  - Generate concise summaries of posts via integration with Gemini API.
  - Summaries are fetched dynamically and displayed alongside post content.

- **Dark Mode**
  - Full dark mode support using TailwindCSS.
  - Automatic theme detection based on system settings.

- **Post Search and Filter**
  - Search posts by keywords or filter posts by author.

- **Responsive Design**
  - Optimized for both desktop and mobile devices.

---

## Future Enhancements

- **Post Editing and Deletion**:  
  Enable users to edit and delete their posts directly from their profile or post page.

- **Comments and Likes**:  
  Allow readers to engage with posts through comments and likes.

- **Tag System**:  
  Introduce tagging for improved content categorization and discovery.

- **Localization**:  
  Add multi-language support for a global audience.

- **Activity Metrics**:  
  Display user statistics like the number of posts, comments, or likes.

- **Social Media Integration**:  
  Add sharing options for platforms like Twitter, Facebook, and LinkedIn.

---
