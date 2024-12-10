<p align="center">
  <a href="" rel="noopener">
 <img src="public/icons/BigLogo.svg" alt="Project logo" width="175"></a>
</p>
<h3 align="center">AlliA</h3>

---

<p align="center"> Create compelling content on any topic in seconds. Powered by AI, designed for content creators.
    <br> 
</p>

## 📝 Table of Contents

- [Problem Statement](#problem_statement)
- [Idea / Solution](#idea)
- [How Does It Work?](#future_scope)
- [Setting up a local environment](#getting_started)
- [Project Structure](#project_structure)
- [Technology Stack](#tech_stack)
- [Authors](#authors)

## 🧐 Problem Statement <a name = "problem_statement"></a>

Content creators face increasing pressure to produce high-quality, engaging content at a rapid pace across various platforms.

In 2023, 73% of marketers reported struggling to consistently create content that resonates with their target audience (Source: HubSpot, 2023)

The average time spent on content creation increased by 22% in 2024 compared to the previous year (Source: Content Marketing Institute, 2024)

## 💡 Idea / Solution <a name = "idea"></a>

<b>AlliA:</b> An AI-powered content generation platform that empowers creators to:

Generate tailored content ideas based on trending topics and user preferences
Adapt content to various formats, including text, images, and videos
Collaborate with AI to refine and optimize content for maximum impact
Seamlessly integrate with popular content platforms for easy distribution


## 🚀 How Does It Work? <a name = "future_scope"></a>

- User selects content type, topic, tone, and target platform.
- AlliA scans trending topics and user behavior data using APIs and web scraping 
- Proprietary AI algorithms analyze data to generate content ideas and outlines 
- Generative AI models create initial drafts in the desired format 
- Users collaborate with AlliA to refine and optimize content 
- Finalized content is exported and integrated with content platforms

## 🏁 Getting Started <a name = "getting_started"></a>

1. Open the command prompt and clone the repository:

```
git clone https://github.com/Loomin-Team/allia-frontend
```

2. Navigate to the project directory.

3. Run the following command to install the necessary dependencies listed in the package.json file:

```
pnpm install
```

4. Open your browser and navigate to http://localhost:3000/ to see the application running.

## 📐 Project Structure <a name="project_structure"></a>

```
.
└── src
    └── app
    |   ├── chat
    |   |   ├── components
    |   |   ├── hooks
    |   |   └── services
    |   |
    |   ├── components
    |   |   ├── content
    |   |   |   # Contains components related to the AI content generation.
    |   |   ├── navigation
    |   |   |   # Contains the navigation bar and footer components.
    |   |   └── ui
    |   |       # Contains the UI components.
    |   |
    |   ├── login
    |   |   ├── components
    |   |   ├── hooks
    |   |   └── services
    |   |
    |   ├── register
    |   |   ├── components
    |   |   ├── hooks
    |   |   └── services
    |   |
    |   └── shared
    |   |   |  # Contains services, stores and models that are commonly shared among the app.
    |   |   ├── layouts
    |   |   |   # Contains the layout components.
    |   |   ├── models
    |   |   |   # Contains the models used in the application.
    |   |   └── stores
    |   |       # Stores the user token to use in the application.
    |   |
    └── page.tsx
        # Includes the landing page of the application.
```

## ⛏️ Technology Stack <a name = "tech_stack"></a>

- [Next.js](https://nextjs.org/) - React Framework for building Web applications.
- [Tailwind CSS](https://tailwindcss.com/) - Open-source CSS framework.

## ✍️ Authors <a name = "authors"></a>

- [@alanegd](https://github.com/alanegd)
- [@avi-2-avi](https://github.com/avi-2-avi)
- [@TMedalith](https://github.com/TMedalith)
