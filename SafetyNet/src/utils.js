// import Config from 'react-native-config';
// import axios from 'axios';
import {Dimensions, Alert} from 'react-native';

export const reducer = (state, action) => {
  const newState = {...state};
  newState[action.type] = action.payload;
  return newState;
};

export const getDay = (dayIndex) => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex];
};

export const hasHomeButton = () => {
  return Dimensions.get('window').height < 700;
};

// export const isDevAccount = (code, num) => {
//   if (code === Config.CODE && num.replace(/-/g, '') === Config.PHONE_NUMBER) {
//     return true;
//   }

//   // console.log(code);
//   // console.log(num);
//   // console.log(Config.DEV_CODE);
//   if (code === Config.DEV_CODE && num.replace(/-/g, '') === Config.DEV_NUMBER) {
//     return true;
//   }

//   return false;
// };

// export const isDevNumber = (num) => {
//   return [Config.PHONE_NUMBER, Config.DEV_NUMBER].includes(
//       num.replace(/-/g, ''),
//   );
// };

// export const getMonth = (monthIdx) => {
//   return [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//   ][monthIdx];
// };

// export const removeNonNumber = (string = '') => string.replace(/[^\d]/g, '');
// export const removeLeadingSpaces = (string = '') => string.replace(/^\s+/g, '');
// export const limitLength = (string = '', maxLength) =>
//   string.substr(0, maxLength);

// export const addGaps = (string = '', gaps) => {
//   const offsets = [0].concat(gaps).concat([string.length]);

//   return offsets
//       .map((end, index) => {
//         if (index === 0) return '';
//         const start = offsets[index - 1];
//         return string.substr(start, end - start);
//       })
//       .filter((part) => part !== '')
//       .join(' ');
// };

// export const toStatus = (validation) => {
//   return validation.isValid ?
//     'valid' :
//     validation.isPotentiallyValid ?
//     'incomplete' :
//     'invalid';
// };

// export const updateDefaultPaymentMethod = async (
//     state,
//     paymentMethod,
//     onSuccess,
//     onFail,
// ) => {
//   const formattedMethod = paymentMethod ?
//     {
//       id: paymentMethod.id,
//       name_on_card: paymentMethod.name,
//       brand: paymentMethod.brand,
//       last_four: paymentMethod.last4,
//       exp_month: paymentMethod.exp_month,
//       exp_year: paymentMethod.exp_year,
//     } :
//     undefined;

//   await axios
//       .post(`${Config.HOST_URL}/user/editProfile/`, {
//         userId: state.user._id,
//         updatedFields: {
//           default_payment_method: formattedMethod,
//         },
//       })
//       .then(() => {
//         state.set_field([
//           {field: 'default_payment_method', value: formattedMethod},
//         ]);
//         onSuccess && onSuccess();
//       })
//       .catch((_err) => {
//       // console.log(_err);
//         onFail && onFail();
//       });
// };

// export const createPaymentMethod = (creditCardData) => {
//   const body = {
//     'type': 'card',
//     'card[number]': creditCardData.values.number.replace(/ /g, ''),
//     'card[exp_month]': creditCardData.values.expiry.split('/')[0].trim(),
//     'card[exp_year]': creditCardData.values.expiry.split('/')[1].trim(),
//     'card[cvc]': creditCardData.values.cvc,
//     'billing_details[address][postal_code]': creditCardData.values.postalCode,
//     'billing_details[name]': creditCardData.values.name,
//   };

//   const config = {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': `Bearer ${Config.STRIPE_KEY}`,
//     },
//   };

//   return axios
//       .post(
//           'https://api.stripe.com/v1/payment_methods',
//           Object.keys(body)
//               .map((key) => key + '=' + body[key])
//               .join('&'),
//           config,
//       )
//       .then((response) => response.data.id)
//       .catch((_e) => {});
// };

// export const currentLocationChanged = (appState, pos) => {
//   return (
//     (!appState.loc?.description ||
//       appState.loc?.description === 'Current Location') &&
//     (appState.loc.longitude !== pos.coords.longitude ||
//       appState.loc.latitude !== pos.coords.latitude)
//   );
// };

// export const calculatePadding = (tickets, slide_pass_available, baseShown) => {
//   const n_overflow =
//     tickets.length + (slide_pass_available ? 1 : 0) - baseShown;

//   if (n_overflow < 1) return 0;
//   if (n_overflow === 1) return 80;

//   if (n_overflow > 1) return 80 + 50 * (n_overflow - 1);
// };

// export const scanCard = async (dispatch) => {
//   const {action, payload, canceledReason} = await Cardscan.scan();
//   if (action === 'scanned') {
//     const {cardholderName, number, expiryMonth, expiryYear} = payload;
//     if (cardholderName) {
//       dispatch({field: 'name', payload: cardholderName});
//     }
//     if (number) {
//       dispatch({field: 'number', payload: number});
//     }
//     if (expiryMonth && expiryYear) {
//       dispatch({field: 'expiry', payload: `${expiryMonth}/${expiryYear}`});
//     }
//   }
//   if (action === 'canceled') {
//     if (canceledReason === 'enter_card_manually') {
//       Alert.alert('Enter Card Manually');
//     } else if (canceledReason === 'user_canceled') {
//       Alert.alert('Scanning Canceled');
//     } else if (canceledReason === 'camera_error') {
//       Alert.alert('A camera error occured while scanning');
//     } else if (canceledReason === 'fatal_error') {
//       Alert.alert('A fatal error occured while scanning');
//     } else if (canceledReason === 'unknown') {
//       Alert.alert('An unkown error occured while scanning');
//     }
//   }
// };

// const FALLBACK_CARD = {gaps: [4, 8, 12], lengths: [16], code: {size: 3}};
// export const cardReducer = (state, action) => {
//   if (action.field === 'reset') return {valid: false};
//   if (action.field === 'default') return {...state, default: !state.default};
//   if (action.field === 'loading') return {...state, loading: action.payload};
//   if (action.field === 'error') return {...state, error: action.payload};
//   if (action.field === 'canScan') return {...state, canScan: action.payload};

//   const newState = {...state};
//   if (action.field === 'expiry') {
//     if (state.values.expiry.length === 2 && action.payload.length === 3) {
//       action.payload =
//         action.payload[0] + action.payload[1] + ' / ' + action.payload[2];
//     } else if (
//       action.payload.length === 5 &&
//       state.values.expiry.length === 6
//     ) {
//       action.payload = action.payload.substr(0, 2);
//     }

//     newState.status.expiry = toStatus(valid.expirationDate(action.payload));
//   } else if (action.field === 'name') {
//     action.payload = removeLeadingSpaces(action.payload);

//     if (action.payload && newState.status.name !== 'valid') {
//       newState.status.name = 'valid';
//     } else if (!action.payload && newState.status.name !== 'incomplete') {
//       newState.status.name = 'incomplete';
//     }
//   } else if (action.field === 'number') {
//     const card = valid.number(action.payload).card || FALLBACK_CARD;

//     const numberSanitized = removeNonNumber(action.payload);
//     const maxLength = card.lengths[card.lengths.length - 1];
//     const lengthSanitized = limitLength(numberSanitized, maxLength);
//     action.payload = addGaps(lengthSanitized, card.gaps);
//     newState.values.type = card.type;

//     newState.status.number = toStatus(valid.number(action.payload));
//   } else if (action.field === 'cvc') {
//     const card = valid.number(state.values.number).card || FALLBACK_CARD;
//     const maxCVCLength = card.code.size;
//     action.payload = limitLength(removeNonNumber(action.payload), maxCVCLength);

//     newState.status.cvc = toStatus(valid.cvv(action.payload, maxCVCLength));
//   } else if (action.field === 'postalCode') {
//     action.payload = removeNonNumber(action.payload);

//     newState.status.postalCode = action.payload.match(/^\d{5}$/) ?
//       'valid' :
//       action.payload.length > 5 ?
//       'invalid' :
//       'incomplete';
//   }

//   newState.values[action.field] = action.payload;
//   newState.valid = every(
//       values(newState.status),
//       (status) => status === 'valid',
//   );
//   return newState;
// };

export const isProfileIncomplete = (user) => {
  const {preferences = {}, profile = {}} = user;
  const profileValues = Object.keys(preferences)
      .map((k) => preferences[k])
      .concat(Object.keys(profile).map((k) => profile[k]));

  return profileValues.length === 0 || profileValues.includes(null);
};
