<<<<<<< HEAD
# Anvi Resort & Spa

A fully structured React + Vite single-page application for Anvi Resort & Spa,
with React Router DOM, component-based architecture, and clean separation of concerns.

---

## Project Structure

```
anvi-resort/
├── index.html                   # Vite entry HTML
├── vite.config.js               # Vite configuration
├── package.json
├── .gitignore
└── src/
    ├── main.jsx                 # React DOM entry point
    ├── App.jsx                  # Root: BrowserRouter + Routes + shared state
    │
    ├── styles/
    │   └── global.css           # Global CSS (animations, utilities, base styles)
    │
    ├── data/
    │   ├── constants.js         # All static data (ROOMS, AMENITIES, OFFERS, etc.)
    │   └── authStore.js         # In-memory auth singleton (register / login / logout)
    │
    ├── components/
    │   ├── UI.jsx               # Shared UI: Stars, Countdown, MuteButton
    │   ├── Navbar.jsx           # Fixed top navigation with scroll detection
    │   ├── Footer.jsx           # Site footer with nav columns
    │   ├── AuthModal.jsx        # 3-step registration + login + forgot-password modal
    │   ├── UserBanner.jsx       # Floating user info banner after login
    │   ├── FineDiningModal.jsx  # Fine dining experience modal with gallery
    │   └── QnA.jsx              # FAQ accordion component
    │
    └── pages/
        ├── HomePage.jsx         # Hero, features, about, stats, membership, marquee, achievements
        ├── RoomsPage.jsx        # Video banner, category filter, 32 room cards, detail modal
        ├── AmenitiesPage.jsx    # Amenity grid (Fine Dining card opens FineDiningModal)
        ├── GalleryPage.jsx      # Video + masonry gallery + lightbox
        ├── OffersPage.jsx       # Offer cards with countdown timers
        ├── PoliciesPage.jsx     # Policy cards with colour-coded types
        ├── TestimonialsPage.jsx # Auto-rotating carousel + full grid
        └── ContactPage.jsx      # Reservation form, contact info, map, FAQ
```

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# → Opens at http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## Key Architecture Decisions

### React Router
The app uses `BrowserRouter` with a single `"/"` route. All sections live on one
page identified by anchor IDs (`#Home`, `#Rooms`, etc.), so the router handles:
- Deep-link navigation (`/#Rooms` scrolls to the Rooms section)
- A catch-all `"*"` route redirects to `"/"`
- The `Navbar` uses `useNavigate` + `useLocation` to highlight the active section

### State Management
All shared state lives in `App.jsx` and is passed down as props:
- **Auth**: `currentUser`, `authModal`, `showUserBanner`, `authToast`
- **Modals**: `diningModal`
- **Video mute**: `heroMuted`, `roomsMuted`, `galleryMuted`
- **Form**: `formData` (quick reserve bar)

### Data Layer
- `src/data/constants.js` — all static arrays (ROOMS, AMENITIES, OFFERS, etc.)
- `src/data/authStore.js` — simple in-memory singleton; swap for an API client

### Media Files
Place these in the **project root** (served as static assets by Vite):
- `VID-20260524-WA0001_1_.mp4` — Hero background video
- `room.mp4`                    — Rooms section video
- `VID-20260524-WA0003.mp4`    — Gallery section video
- `bgbomg.jpeg`                 — Logo / owner avatar
- `IMG-20260522-WA0001.jpg`    — Founder photo

---

## Dependencies

| Package            | Version  | Purpose                        |
|--------------------|----------|--------------------------------|
| react              | ^18.3.1  | UI library                     |
| react-dom          | ^18.3.1  | DOM rendering                  |
| react-router-dom   | ^6.26.0  | Client-side routing            |
| vite               | ^5.4.0   | Build tool & dev server        |
| @vitejs/plugin-react | ^4.3.1 | React fast refresh in Vite     |
=======
# kartikdemo
hotel
>>>>>>> 69a251266123387e462cb4407aa394abdfe954a1
