# Beaver Rayman Run

A fun endless runner game featuring a beaver character inspired by Rayman, built with HTML5 Canvas and JavaScript.

## Game Description

Beaver Rayman Run is an endless runner game where you control a beaver that must jump over obstacles (beer and vodka bottles) while collecting points. The game features smooth animations, collision detection, and Telegram Web App integration for score sharing.

## Features

- **Smooth Animations**: Frame-based animation system with multiple sprite states
- **Collision Detection**: Accurate hit detection for both ground and flying obstacles
- **Responsive Design**: Adapts to different screen sizes and devices
- **Audio Effects**: Web Audio API-generated sound effects for jumps and collisions
- **Score System**: Local high score tracking and Telegram integration
- **Telegram Web App**: Optimized for running inside Telegram bots

## Controls

- **Desktop**: Click or press any key to jump
- **Mobile**: Tap the screen to jump

## Game Mechanics

- Jump over beer and vodka bottles to avoid collision
- Flying obstacles require precise timing
- Score increases over time
- Game speed increases as you progress
- Double jump available (limited jumps)

## Technical Details

### Architecture

The game is built using ES6 modules with the following structure:

- `game.js` - Main game loop and state management
- `js/beaver.js` - Beaver character logic and animations
- `js/obstacle.js` - Obstacle spawning and collision detection
- `js/renderer.js` - Canvas rendering functions
- `js/score.js` - Score saving and loading
- `js/audio.js` - Sound effect generation
- `js/telegram.js` - Telegram Web App integration
- `js/utils.js` - Utility functions

### Key Technologies

- **HTML5 Canvas** for rendering
- **ES6 Modules** for code organization
- **Web Audio API** for sound effects
- **Telegram Web App API** for bot integration
- **LocalStorage** for offline score saving

## Setup Instructions

1. Clone the repository
2. Open `index.html` in a modern web browser
3. For Telegram integration, deploy as a web app in your Telegram bot

### Requirements

- Modern web browser with ES6 module support
- For Telegram features: Telegram Web App environment

## Development

### Running Locally

Simply open `index.html` in your browser. No build process required.

### Code Structure

- All game logic is contained in JavaScript modules
- SVG sprites are embedded as base64 data URLs
- Canvas is dynamically resized for responsiveness

### Testing

The game has been tested on:
- Desktop browsers (Chrome, Firefox, Safari)
- Mobile browsers (iOS Safari, Android Chrome)
- Telegram Web App environment

## Scoring System

- Points increase continuously while playing
- High scores are saved locally and can be shared via Telegram
- Speed increases every 200 points for added difficulty

## Telegram Integration

When run inside Telegram, the game:
- Adapts to Telegram's color scheme
- Sends score data to the bot for server-side storage
- Expands to full viewport

## Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source. Feel free to use and modify as needed.

## Credits

- Game concept inspired by Rayman and classic endless runners
- Built with vanilla JavaScript and HTML5 Canvas
- SVG sprites created programmatically
