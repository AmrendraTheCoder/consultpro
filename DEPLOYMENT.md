# ConsultPro Deployment Guide

## 🚀 Deployment Options

### Option 1: GitHub + Vercel (Recommended)

#### Step 1: Push to GitHub

1. **Create a new repository on GitHub:**

   - Go to [GitHub.com](https://github.com)
   - Click the "+" icon → "New repository"
   - Name: `consultpro` (or your preferred name)
   - Description: `Enhanced Business Consulting Website with Modern Animations`
   - Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license

2. **Connect your local repository:**
   ```bash
   # Replace 'yourusername' with your GitHub username
   git remote add origin https://github.com/yourusername/consultpro.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Deploy to Vercel

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure project:**
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
6. **Click "Deploy"**

Your site will be live at: `https://your-project-name.vercel.app`

### Option 2: GitHub Pages (Static Export)

If you prefer GitHub Pages, you'll need to configure static export:

1. **Update `next.config.js`:**

   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: "export",
     trailingSlash: true,
     images: {
       unoptimized: true,
     },
   };

   module.exports = nextConfig;
   ```

2. **Add GitHub Actions workflow:**
   Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: "18"
             cache: "npm"

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

### Option 3: Netlify

1. **Push to GitHub** (follow Step 1 from Option 1)
2. **Go to [Netlify.com](https://netlify.com)**
3. **Connect your GitHub repository**
4. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
5. **Deploy**

## 🔧 Environment Variables

If you add any environment variables later, make sure to configure them in your deployment platform:

### Vercel:

- Go to Project Settings → Environment Variables
- Add your variables

### Netlify:

- Go to Site Settings → Environment Variables
- Add your variables

## 📝 Custom Domain (Optional)

### For Vercel:

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### For Netlify:

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS records

## 🚀 Automatic Deployments

Once connected to GitHub:

- **Vercel**: Automatically deploys on every push to main branch
- **Netlify**: Automatically deploys on every push to main branch
- **GitHub Pages**: Deploys via GitHub Actions workflow

## 📊 Performance Optimization

The project is already optimized with:

- ✅ Next.js 14 App Router
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ CSS optimization
- ✅ Bundle analysis
- ✅ Vercel configuration

## 🔍 Monitoring

After deployment, you can monitor:

- **Vercel**: Built-in analytics and performance monitoring
- **Netlify**: Analytics and form handling
- **GitHub Pages**: Basic GitHub insights

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Errors:**

   - Check Node.js version (use 18+)
   - Clear cache: `npm ci`
   - Check for TypeScript errors

2. **3D Components Not Working:**

   - Ensure WebGL is supported
   - Check browser compatibility

3. **Animations Not Smooth:**
   - Enable hardware acceleration
   - Check device performance

### Support:

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Vercel Documentation](https://vercel.com/docs)
- Check browser console for errors

---

**🎉 Your ConsultPro website is now ready for deployment!**

Choose your preferred deployment method and follow the steps above. Vercel is recommended for the best Next.js experience and performance.
