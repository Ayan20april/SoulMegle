export function setupSocketIO(io) {
    const users = {}; // { socketId: { interests: ["music", "tech"] } }
  
    io.on('connection', (socket) => {
      // Step 1: User selects interests
      socket.on('set_interests', (interests) => {
        users[socket.id] = { interests };
        matchUsers(socket);
      });
  
      // Step 2: Match users with overlapping interests
      function matchUsers(socket) {
        const currentUser = users[socket.id];
        const matchedSocket = Object.keys(users).find((id) => {
          return id !== socket.id && 
                 users[id].interests.some(i => currentUser.interests.includes(i));
        });
  
        if (matchedSocket) {
          // Pair the two users
          socket.emit('matched');
          io.to(matchedSocket).emit('matched');
          delete users[matchedSocket];
          delete users[socket.id];
        }
      }
  
      // Step 3: Handle chat messages
      socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
      });
  
      // Cleanup on disconnect
      socket.on('disconnect', () => {
        delete users[socket.id];
      });
    });
  }