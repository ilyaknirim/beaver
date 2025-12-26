# Beaver Rayman Run - Todo List

## Testing
- [x] Test game on different devices (mobile, desktop) for responsiveness - Code review: Canvas resizing implemented, but may need mobile testing
- [x] Test collision detection accuracy with various obstacle types and positions - Found bug: gameOver not updated in collision detection due to pass-by-value
- [x] Test score saving/loading in both localStorage and Telegram modes - localStorage works, Telegram only logs (not saved)
- [x] Test audio playback and ensure it works on different browsers - Audio functions defined, but not tested
- [x] Test game restart functionality and state reset - Reset function exists, but collision state may not reset properly
- [x] Test edge cases like rapid clicking, resizing window during play - Animation desync potential with setInterval in beaver.js

## Fixing
- [x] Fix potential memory leaks by implementing obstacle object pooling
- [x] Fix animation desync by replacing `setInterval` with frame-based updates in the main loop
- [x] Fix collision detection edge cases, especially for flying obstacles
- [ ] Fix Telegram score saving to actually send data to server instead of just logging
- [ ] Fix canvas resizing issues when window is resized during gameplay
- [ ] Fix potential issues with image loading failures

## Optimizing
- [ ] Optimize rendering by using off-screen canvas for static elements
- [ ] Optimize collision detection by using spatial partitioning or simpler hitboxes
- [ ] Optimize asset loading by compressing SVG files or using WebP
- [ ] Optimize game loop by reducing unnecessary calculations per frame
- [ ] Optimize for mobile by reducing canvas resolution on small screens
- [ ] Optimize audio by preloading sounds and using Web Audio API

## Documentation
- [ ] Create README.md with game description, setup instructions, and controls
- [ ] Add inline JSDoc comments to all functions in JS modules
- [ ] Document game mechanics, scoring system, and Telegram integration
- [ ] Create API documentation for any public functions
- [ ] Add comments explaining complex algorithms like collision detection
- [ ] Update documentation periodically as features are added or changed
