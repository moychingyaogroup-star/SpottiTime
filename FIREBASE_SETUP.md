# Firebase setup needed for friend requests

If Accept / Reject shows **Missing or insufficient permissions**, update Firestore Rules.

1. Open Firebase Console.
2. Go to **Firestore Database**.
3. Open **Rules**.
4. Copy everything from `firestore.rules` in this project.
5. Paste it into Firebase Rules.
6. Click **Publish**.
7. Refresh the website and login again.

This version keeps:
- Users, friend requests and friends
- Daily recap stories
- Chat messages
- Schedule sharing

Friend request paths used by the app:
- Incoming request: `users/{receiverUid}/friend_requests/{senderUid}`
- Sent request: `users/{senderUid}/sent_friend_requests/{receiverUid}`
- Accepted friends: `users/{userUid}/friends/{friendUid}`
