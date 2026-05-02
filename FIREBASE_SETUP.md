# Firebase setup needed for friend requests

The website code is fixed, but your screenshot shows:

> Missing or insufficient permissions

That means Firestore Security Rules are blocking the new friend request collections.

## What to do

1. Open Firebase Console.
2. Go to your project: `timeblocks1`.
3. Go to **Firestore Database**.
4. Open the **Rules** tab.
5. Copy everything from `firestore.rules` in this zip.
6. Paste it into Firebase Rules.
7. Click **Publish**.
8. Refresh your website and try adding a friend again.

## Collections used by the friend request system

- `users/{receiverUid}/friend_requests/{senderUid}`
- `users/{senderUid}/sent_friend_requests/{receiverUid}`
- `users/{uid}/friends/{friendUid}`

The request will only become a real friend after the receiver presses **Accept**.
