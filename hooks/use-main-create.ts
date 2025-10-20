import * as React from 'react';

export function useMainCreate(initialRating: number = 1, initialDetails: string = '') {
  const [dayRatingValue, setDayRatingValue] = React.useState(initialRating);
  const [dayDetailsValue, setDayDetailsValue] = React.useState(initialDetails);

  return {
    dayRatingValue,
    setDayRatingValue,
    dayDetailsValue,
    setDayDetailsValue,
  };
}
