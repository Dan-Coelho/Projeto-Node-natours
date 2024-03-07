/*eslint-disable */
import { showAlert } from './alerts';
import axios from 'axios';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51OpIRXBSG5jfKqv0XU7wLccjq0cktV0sXTwsx4pk8YxxSspnPMmw08S8J5i4hLOIIVmIIQ4G3uEcowosPwwhb6V300y6LXIR8f',
  );
  try {
    //1- Get the session from the server
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    //2- Create checkout form - change credit card}
    console.log(session);

    res.redirect(303, session.url);
  } catch (err) {
    //console.log(err);
    showAlert('error', err);
  }
};
