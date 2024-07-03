import React, { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import './App.css';
import AgeCalculator from './component/Calck';

function App() {
  useEffect(() => {
    bridge.send('VKWebAppShowBannerAd', {
      banner_location: 'bottom'
    })
    .then((data) => {
      if (data.result) {
        console.log('Banner ad displayed successfully');
      }
    })
    .catch((error) => {
      console.error('Error displaying banner ad:', error);
    });
  }, []);

  return (
    <div>
      <AgeCalculator />
    </div>
  );
}

export default App;
