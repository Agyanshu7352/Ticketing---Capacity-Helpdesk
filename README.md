# 🎫 Ticketing Capacity Helpdesk UI

A modern, pixel-perfect helpdesk and ticketing management system built with ReactJS. This project features a clean, professional interface for managing support tickets with real-time interactions and a fully responsive design.

> **Live Demo**: [View Application](https://ticketing-capacity-helpdesk-two.vercel.app/)  
> **Design Reference**: [Dribbble](https://dribbble.com/shots/21816219-Ticketing-Capacity-Helpdesk)

---

## ✨ Features

### 🎨 Modern UI Design
- **Pixel-Perfect Implementation**: Clean, professional interface matching the original design
- **3-Column Layout**:
  - **Left Sidebar**: Navigation menu and filter options (collapsible)
  - **Middle Panel**: Ticket conversation thread with public/private tabs and rich message display
  - **Right Panel**: Ticket details, status controls, and related information sections

### ⚡ Interactive Components
- Custom-built dropdowns for Priority, Project, and Ticket Type
- Accordion-style collapsible sections for Tasks, History, and Linked Tickets
- Smooth hover effects and transitions
- Real-time status updates and comment system
- Responsive design for all screen sizes

### 🔧 Functionality
- View and manage support tickets
- Change ticket status (To Do → In Progress → Done)
- Add public replies and private comments
- Update assignee, priority, and project details
- Track linked tickets and task history

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React** | Frontend framework (Vite) |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Icon library |


---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ticketing-helpdesk-ui.git
   cd ticketing-helpdesk-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   
   Navigate to `http://localhost:5173`

---

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

---

## 🌐 Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy!

Alternatively, you can deploy to Netlify or any other static hosting platform.

---

## 📂 Project Structure

```
ticketing-helpdesk-ui/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Main application pages
│   ├── data/            # Mock data and constants
│   ├── assets/          # Images, icons, styles
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Dependencies and scripts
```

---

## 🎯 Key Highlights

- **State Management**: Local state handling for ticket updates and interactions
- **Mock Data Mode**: Fully functional with mock data (no backend required)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean Code**: Well-organized component structure for easy maintenance
- **Performance Optimized**: Fast load times and smooth interactions

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- Design inspiration from [Dribbble](https://dribbble.com/shots/21816219-Ticketing-Capacity-Helpdesk)
- Built with React and Tailwind CSS
- Icons by Lucide React

---

<div align="center">

**Built with ❤️ using React**

⭐ Star this repo if you find it helpful!

</div>