# APYARIX — Static HTML Website

## What is included
- Apyarix brand storefront
- Product catalogue with category filtering
- Product detail pages
- Customer enquiry form
- WhatsApp ordering link
- Browser-side cart using localStorage
- WhatsApp enquiry and checkout links
- Responsive design for desktop/mobile
- The original PHP/MySQL files are retained as a server-backed version.

## Static HTML version

Open `index.html` directly in a browser, or serve the folder with any static web server. The HTML pages use `assets/js/site.js` for the catalogue, cart and shared navigation. Contact and checkout forms open WhatsApp because static HTML cannot write to the original MySQL database.

The static version includes the seeded products from `database.sql`. Customer accounts, admin tools, stored orders and the enquiry inbox still require the PHP/MySQL version.

## XAMPP installation
1. Install/start Apache and MySQL in XAMPP.
2. Extract the `the-bee` folder into `C:\xampp\htdocs\`.
3. Open phpMyAdmin: `http://localhost/phpmyadmin`
4. Import `database.sql`.
5. If your MySQL username/password differs from XAMPP defaults, edit `config/config.php`.
6. Open: `http://localhost/the-bee/`

## Admin
Open:
`http://localhost/the-bee/admin/login.php`

Default:
Username: `admin`
Password: `admin123`

IMPORTANT: Change the admin password before putting the site online. The included password is for initial local setup.

## Hosting
Upload the folder contents to `public_html`, create a MySQL database/user, import `database.sql`, and update `config/config.php` with the hosting database credentials.

## Branding
The website is built around a single Apyarix brand identity with the logo and brand colors applied across the storefront. Replace the sample products, prices, descriptions and WhatsApp number with your real information.
