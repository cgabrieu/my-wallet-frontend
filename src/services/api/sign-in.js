import api from './api';

export function postSignIn(email, password) {
  return api.post('/api/auth/signin', {
    email,
    password
  });
}

export function rent(customerId, gameId, daysRented) {
  return api.post('/rentals', {
    customerId,
    gameId,
    daysRented
  });
}