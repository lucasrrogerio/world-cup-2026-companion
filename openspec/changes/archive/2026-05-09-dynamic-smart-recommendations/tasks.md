## 1. Database Integration

- [ ] 1.1 Implement a function in `App.jsx` or `useCollection.js` to fetch duplicate counts from other users in the same city.
- [ ] 1.2 Ensure the query joins `profiles` and `collections` correctly.

## 2. Refined Recommendation Logic

- [ ] 2.1 Update `Dashboard.jsx` to receive real "city availability" data.
- [ ] 2.2 Cross-reference available duplicates in the city with the current user's missing stickers.
- [ ] 2.3 Implement "Real Tip" message vs "Empty City" message.

## 3. Verification

- [ ] 3.1 Test with a mock user in the same city having duplicates (verify tip appears).
- [ ] 3.2 Test with no users in the city having duplicates (verify "empty city" message appears).
