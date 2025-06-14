<a href="https://anotherwrapper.com/">
  <img alt="AnotherWrapper - Build your AI startup in hours." src="/public/og.png">
  <h1 align="center">AnotherWrapper - 10+ AI Demo Apps</h1>
</a>

<p align="center">
  An all-in-one Next.js starter kit to build your AI app quickly. Build unlimited products, pay only once.
</p>

<p align="center">
  This guide provides comprehensive setup instructions for your AI application.
</p>

<p align="center">
  From development environment setup to production deployment, each step is detailed below.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo-apps"><strong>Demo Apps</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Prerequisites

Let's build your first AI app in 10 minutes! This quick setup will give you:

- A complete user authentication system (magic link email login)
- Production-ready database with all necessary tables
- Working GPT-powered text generation app
- Beautiful UI with 40+ themes
- User management and session handling

You'll need:

- [Node.js 18+](https://nodejs.org/en/download/)
- A package manager ([pnpm](https://pnpm.io/installation) recommended, or npm, or yarn)
- [Git](https://git-scm.com/downloads)
- A code editor ([Cursor](https://www.cursor.com/) recommended - will generate the code for you)
- Required accounts for basic setup:
  - [Supabase](https://supabase.com) - for authentication & database
  - [OpenAI](https://platform.openai.com) - for AI capabilities
  - [Vercel](https://vercel.com) or similar - for deployment

For advanced features like file uploads, additional AI providers, or email capabilities, please refer to our [documentation](https://docs.anotherwrapper.com) for specific setup instructions.

### What We'll Be Setting Up

Before we start coding, we need to set up a few things:

1. A database to store your app's data (users, chat history, etc.)
2. API keys to connect to AI services
3. A development environment on your computer

### Basic Setup

1. **Fork and Clone the Repository**

   First, fork the repository to your own GitHub account:

   - Go to https://github.com/fdarkaou/anotherwrapper-premium
   - Click the "Fork" button in the top right
   - Make sure to set visibility to "Private" in the fork settings
   - Click "Create fork"

   Then clone your forked repository:

   ```bash
   # Clone your private fork (replace YOUR-USERNAME with your GitHub username)
   git clone https://github.com/YOUR-USERNAME/anotherwrapper-premium
   cd anotherwrapper-premium

   # Install pnpm if you haven't already
   npm install -g pnpm

   # Install dependencies
   pnpm install
   ```

   This creates your own private copy of the starter kit.

2. **Set Up Your Repository**

   ```bash
   # Configure your local repository
   git remote add upstream https://github.com/fdarkaou/anotherwrapper-premium
   git remote set-url origin https://github.com/YOUR-USERNAME/anotherwrapper-premium
   ```

   > 💡 Pro Tip: You can verify your remotes are set correctly with `git remote -v`

3. **Link to Your GitHub Repository**

   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin your-github-repository-url
   git branch -M main
   git push -u origin main
   ```

### Setting Up Your Database (Supabase)

Supabase is like a powerful, ready-to-use database for your app. We'll set it up in a few steps:

1. **Install Supabase Tools**

   First, we need to install some tools that help us work with Supabase. Choose the right command for your computer:

   - If you use Mac:
     ```bash
     brew install supabase/tap/supabase
     ```
   - If you use Windows:
     ```powershell
     scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
     scoop install supabase
     ```
   - If you use Linux:
     ```bash
     curl -fsSL https://raw.githubusercontent.com/supabase/cli/main/install.sh | sh
     ```

2. **Login to Supabase CLI**

   Before creating a project, you need to login to your Supabase account:

   ```bash
   npx supabase login
   ```

   This will open your browser and ask you to login to your Supabase account. After logging in, you'll see a token - copy it and paste it back into your terminal.

3. **Create Your Database**

   Now let's create a new database project:

   ```bash
   npx supabase projects create -i "anotherwrapper-premium-db"
   ```

   The tool will ask you a few questions:

   1. Confirm the project name (just press Enter)
   2. Choose your organization (if you have multiple)
   3. Pick a region (choose one close to you)
   4. Set a database password (or leave blank to generate one)

   After answering these, you'll see something like this:

   ```bash
   Creating project:    anotherwrapper-premium-db
   Selected org-id:     uefyfzmrpgyuazwddyib
   Selected region:     eu-west-3
   Enter your database password (or leave blank to generate one):
   Created a new project anotherwrapper-premium-db at https://supabase.com/dashboard/project/vpgxxpifhzqjvrhsinhe
   ```

   > Important: Look at the URL in that last line. The part after "project/" is your project ID
   > (in this example: `vpgxxpifhzqjvrhsinhe`). Save this ID - you'll need it soon!

   If you check your Supabase dashboard now, you should see your new project being created:
   ![Supabase Project](/public/setup/1.png)

4. **Connect Your Project**

   Now we need to connect your local code to your new database:

   ```bash
   # Set up some local configuration
   npx supabase init

   # Connect to your database (replace 'your-project-id' with your ID from step 2)
   npx supabase link --project-ref your-project-id
   ```

   For example: `npx supabase link --project-ref vpgxxpifhzqjvrhsinhe`

5. **Set Up Your Environment**

   Your app needs to know how to connect to your database. Let's create a settings file:

   ```bash
   # Create a new settings file by copying the example
   cp .env.example .env
   ```

   Now open the `.env` file and fill in these details:

   ```env
   # Base URL (use localhost for development)
   PRODUCTION_URL=http://localhost:3000

   # Supabase settings (you'll find these in your Supabase dashboard)
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_SUPABASE_SERVICE_KEY=your-supabase-service-key

   # OpenAI API key (get this from platform.openai.com)
   OPENAI_API_KEY=sk-your-openai-key
   ```

   To find your Supabase settings:

   1. Go to your Supabase dashboard
   2. Click "Project Settings" then "API"
   3. You'll find:
      - Project URL (copy this to NEXT_PUBLIC_SUPABASE_URL)
      - "anon public" key (copy to NEXT_PUBLIC_SUPABASE_ANON_KEY)
      - "service_role" key (copy to NEXT_SUPABASE_SERVICE_KEY)

   For your OpenAI API key:

   1. Go to [platform.openai.com](https://platform.openai.com)
   2. Navigate to API keys section
   3. Create a new key and copy it to OPENAI_API_KEY

   **Important**: Make sure you have credits in your OpenAI account! The API won't work without available credits, even with a valid API key. You can check your credit balance and add credits at [platform.openai.com/account/billing](https://platform.openai.com/account/billing).

6. **Set Up Your Database Tables**

   Last step! We need to create all the tables your app will use:

   ```bash
   npx supabase db push
   ```

   You'll see a list of tables that will be created - just type 'y' when asked:

   ```bash
   WARN: no seed files matched pattern: supabase/seed.sql
   Connecting to remote database...
   Do you want to push these migrations to the remote database?
    • 20240000000001_profiles.sql
    • 20240000000002_generations.sql
    • 20240000000003_chat.sql
    • 20240000000004_files.sql
    • 20240000000005_pdf.sql
    • 20240000000006_voice_to_notes.sql

    [Y/n] y
   Applying migration 20240000000001_profiles.sql...
   Applying migration 20240000000002_generations.sql...
   Applying migration 20240000000003_chat.sql...
   Applying migration 20240000000004_files.sql...
   Applying migration 20240000000005_pdf.sql...
   Applying migration 20240000000006_voice_to_notes.sql...
   Finished supabase db push.
   ```

   This will push all the necessary database tables to your Supabase project. After running these commands, you can check your Supabase dashboard under "Table Editor" to see the newly created tables:

   ![Supabase Tables](/public/setup/2.png)

### Local Development

1. **Start Development Server**

   ```bash
   pnpm dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

### Troubleshooting

Common issues and solutions:

- **Supabase Connection Issues**

  - Verify your environment variables are correctly set
  - Check if the database is active in Supabase dashboard

- **Build Errors**
  - Clear `.next` folder: `rm -rf .next`
  - Clean install dependencies: `pnpm install --force`

### Configuration

After basic setup, customize your website metadata in `config.ts`. This file controls your website's:

- Title, description, and branding
- Theme settings
- Navigation links
- Authentication routes
- Legal information

<Warning>
Ensure you properly configure the routing section in config.ts as it's critical for authentication redirects.
</Warning>

### Next Steps

Once your basic setup is complete:

1. Test the basic OpenAI-powered demo apps
2. Review our [documentation](https://anotherwrapper.com/docs) for:
   - Setting up additional AI providers
   - Implementing file storage
   - Configuring email systems
   - Setting up analytics
   - Implementing payments
   - Customizing UI components

## Deploy with Vercel

### Prerequisites

- A [Vercel account](https://vercel.com/signup)
- A [Supabase account](https://supabase.com/dashboard/sign-in)
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Deployment Steps

1. **Fork the Repository**

   ```bash
   https://github.com/fdarkaou/anotherwrapper-premium
   ```

2. **Configure Vercel Project**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your forked repository
   - Select "Next.js" as the framework

3. **Set Environment Variables**
   In your Vercel project settings, add the following environment variables:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=           # From Supabase project settings
NEXT_PUBLIC_SUPABASE_ANON_KEY=      # From Supabase project settings
OPENAI_API_KEY=                     # Your OpenAI API key
```

4. **Configure Build Settings**
   In your Vercel project settings:

   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Starting Your App

Now that everything is set up, let's start your app:

1. **Run the Development Server**

   ```bash
   pnpm dev
   ```

   This will start your app at [http://localhost:3000](http://localhost:3000). Open this address in your browser to see your app running!

2. **Other Useful Commands**
   Here are some other commands you might need:
   ```bash
   pnpm build          # Creates a production-ready version of your app
   pnpm start          # Runs the production version locally
   pnpm lint          # Checks your code for common mistakes
   pnpm type-check    # Makes sure your TypeScript code is correct
   ```

### Having Problems?

Here are solutions to common issues you might run into:

- **Can't Connect to Supabase?**

  1. Double-check your `.env` file - make sure all the Supabase values are correct
  2. Go to your Supabase dashboard and verify your project is "Active" (green dot)
  3. Try copying the keys from Supabase again - sometimes spaces can sneak in!

- **App Won't Build or Start?**
  Try these steps in order:
  1. Delete the `.next` folder: `rm -rf .next`
  2. Clean install your packages: `pnpm install --force`
  3. Start again: `pnpm dev`

### Customizing Your App

Want to change how your app looks and works? Edit the `config.ts` file to change things like:

- Your website's name and description
- Color themes and styling
- Navigation menu items
- Where users go after logging in/out
- Legal pages and links

### What's Next?

Once your basic app is running:

1. Try out the OpenAI GPT-4o text generator demo apps to see what's possible
2. Check our [documentation](https://anotherwrapper.com/docs) to learn about:
   - Adding more AI features (like Claude or LLaMA)
   - Using more advanced AI applications
   - Handling file uploads
   - Setting up emails
   - Adding analytics to track usage
   - Taking payments from users
   - Creating custom UI components

## Publishing Your App Online

Now that you have your app running locally, let's share it with the world! We'll use Vercel - it's the best choice for Next.js apps because:

- It's made by the same team that created Next.js
- It's free for personal projects
- It makes deployment super easy

### Before You Deploy

You should already have:

- ✅ A working local version of your app
- ✅ Your Supabase database set up and running
- ✅ Your OpenAI API key
- ✅ Your `.env` file configured correctly

If you're missing any of these, go back to the setup steps above!

### Step-by-Step Deployment

1. **Push Your Existing Code to GitHub** (if you haven't already)

   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Select your existing repository from the list
   - Select "Next.js" as the framework

3. **Copy Your Environment Variables**
   Remember all those settings in your `.env` file? We need to tell Vercel about them:

   - In your Vercel project settings, find "Environment Variables"
   - Copy ALL variables from your `.env` file:

     ```bash
     # Copy everything, even variables you're not using yet
     # This ensures all routes will work and you can add features later
      # Base URL (use localhost for development)
      PRODUCTION_URL=http://localhost:3000

      # Supabase settings (you'll find these in your Supabase dashboard)
      NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
      NEXT_SUPABASE_SERVICE_KEY=your-supabase-service-key

      # OpenAI API key (get this from platform.openai.com)
      OPENAI_API_KEY=sk-your-openai-key
      ...
     ```

   > 💡 Pro Tip: For variables you're not using yet, you can use dummy values (like "not-configured"). This lets you deploy successfully while keeping the option to add features later.

4. **Deploy Your App**
   - Click "Deploy"
   - Vercel will start building your app
   - You'll get a URL where your app is live (like `your-app.vercel.app`)

That's it! Your AI app is now live on the internet! 🎉

<Note>
💡 Pro Tip: Whenever you push changes to your GitHub repository, Vercel will automatically update your live app. No need to deploy manually again!
</Note>

### Other Hosting Options

While we recommend Vercel, you can also use:

- Netlify (similar to Vercel, also very easy)
- Railway (good for full-stack apps)
- DigitalOcean App Platform (more control, but more complex)
- AWS Amplify (powerful but requires AWS knowledge)

These alternatives might need different setup steps - check their docs if you want to use them!
