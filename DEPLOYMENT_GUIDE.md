# 🚀 Easy Deployment & Migration Guide | Md. Shakibur Rahaman Portfolio

Everything in this portfolio is **100% self-contained and portable**. You can copy this folder to any computer, USB drive, or upload it to any web hosting service without breaking any links, APIs, or database records.

---

## 💻 1. How to Shift from This Desktop to Another Desktop

1. **Copy the entire folder** `shakibur-portfolio` to a USB pendrive, Google Drive, or zip file.
2. **Paste the folder** onto your new computer (any location like Desktop or Documents).
3. **Double-Click `start.bat`**:
   * It will automatically launch the local CMS server and open the website in your default browser.
   * If the new computer does not have Node.js installed, `start.bat` will notify you and open the static website directly in your browser. (To enable live CMS saving on that PC, simply install free [Node.js](https://nodejs.org)).

---

## 🌐 2. How to Upload to Your Web Hosting

### Option A: Standard Web Hosting (cPanel / Shared Hosting / Namecheap / Hostinger / GoDaddy / Bluehost)
1. In your cPanel / File Manager, open the **`public_html`** directory (or your domain's root folder).
2. Zip all files inside the `shakibur-portfolio` folder.
3. Upload the `.zip` file into `public_html` and click **Extract**.
4. That's it! Your website is live immediately at `https://yourdomain.com` and admin at `https://yourdomain.com/admin`.
   * *Note: The `.htaccess` file included in this folder automatically handles clean URL routing (`/admin`), caching, and data protection on Apache/cPanel.*

---

### Option B: Node.js Cloud Hosting (Render / Railway / DigitalOcean / VPS / AWS)
1. Upload or push this folder to your repository/server.
2. The server command is already configured in `package.json`:
   * **Build Command**: `(none needed)`
   * **Start Command**: `npm start` or `node server.js`
   * **Port**: Automatically uses `process.env.PORT` or `3000`.

---

### Option C: 1-Click Free Hosting (Vercel / Netlify / GitHub Pages)
* **Vercel**: Just drag and drop this folder or connect your Git repo. The included `vercel.json` automatically sets up the `/admin` route.
* **Netlify**: Drag and drop the folder into Netlify Drop. The included `netlify.toml` automatically handles redirects.

---

## 🔐 3. Admin Access & Credentials

* **Admin URL**: `http://localhost:3000/admin` *(or `https://yourdomain.com/admin`)*
* **Default Username**: `admin`
* **Default Password**: `admin1234`
* You can change the admin password at any time inside the **Security & Backups** tab.

---

## 📁 4. Key Files Summary

| File / Folder | Purpose |
| :--- | :--- |
| **`index.html`** | Public Portfolio Homepage (7 Sectors, Verified Blueprints, Trust Strip). |
| **`styles.css`** | Royal Sapphire & Gold styling, animations, responsive design. |
| **`app.js`** | Frontend hydration engine, SEO tags, WhatsApp routing, modal controller. |
| **`admin.html`** | Admin Control Panel (15 modules + Global SEO Center + Live Google simulator). |
| **`admin.js`** | Admin CMS controller with live publish, backup, and restore. |
| **`content.json`** | Master content database with all industry text, metrics, and SEO tags. |
| **`server.js`** | Built-in Node.js server with zero npm dependencies. |
| **`start.bat`** | Windows 1-click double-click launcher. |
| **`data/`** | Stores live edits, admin sessions, and client inquiries. |
| **`package.json`** | Standard Node.js metadata for hosting platforms. |
