# HabitHero 🎯

A cross-platform habit tracking application built with React Native and Expo. Track your habits, build streaks, and maintain consistency with a beautiful, intuitive interface.

## 🌟 Features

HabitHero includes all the features you'd expect from a modern habit tracker:

- **Grid-based Progress Visualization**: GitHub-style contribution graphs to visualize your habit streaks
- **Flexible Habit Goals**: Set daily, weekly, or monthly targets for each habit
- **Customization**: Personalize habits with custom names, icons, and colors
- **Smart Reminders**: Never miss a habit with push notifications
- **Calendar View**: Track and manage your habit completions
- **Streak Tracking**: Build and maintain streaks to stay motivated
- **Data Privacy**: Local-first data storage with export/import functionality
- **Theme Support**: Light and dark mode for comfortable viewing
- **Cross-Platform**: Works on iOS, Android, and Web

## 🚀 Live Demo

Visit the web version: [https://fahmed93.github.io/habithero](https://fahmed93.github.io/habithero)

## 📦 Installation

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Expo CLI (optional, but recommended)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/fahmed93/habithero.git
cd habithero
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## 🛠️ Development

### Running the App

#### Web
```bash
npm run web
```
Opens the app in your default browser at `http://localhost:8081`.

#### iOS
```bash
npm run ios
```
Requires macOS with Xcode installed.

#### Android
```bash
npm run android
```
Requires Android Studio and an Android emulator or connected device.

### Building for Production

#### Web Build
```bash
npm run export:web
```
Creates an optimized production build in the `dist` folder.

## 🏗️ Project Structure

```
habithero/
├── .github/           # GitHub Actions workflows
│   └── workflows/    
│       └── deploy.yml # Automated deployment workflow
├── .specify/         # Spec-kit documentation
│   ├── memory/       # Project memory and constitution
│   ├── scripts/      # Automation scripts
│   └── specs/        # Feature specifications
├── assets/           # Images, fonts, and static assets
├── App.tsx           # Main application component
├── app.json          # Expo configuration
├── index.ts          # Entry point
├── package.json      # Dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## 📚 Documentation

This project follows **Specification-Driven Development** using [GitHub Spec-Kit](https://github.com/github/spec-kit).

- Project specifications are in `.specify/specs/`
- Project memory and constitution are in `.specify/memory/`
- Each feature starts as a specification before implementation

## 🚢 Deployment

The app automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

If you need to manually deploy:

1. Build the web version:
```bash
npm run export:web
```

2. The GitHub Actions workflow will automatically deploy the `dist` folder to the `gh-pages` branch.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by [HabitKit](https://www.habitkit.app/)
- Built with [Expo](https://expo.dev/)
- Deployed with [GitHub Pages](https://pages.github.com/)

## 📮 Contact

For questions or feedback, please open an issue on GitHub.
