import React, { useState, useEffect } from 'react';
interface CountdownTimerProps {
  initialMinutes: number;
  initialSeconds: number;
}
const CountdownTimer = ({
  initialMinutes,
  initialSeconds
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  // Effect for the countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }
        if (prevTime.seconds === 0) {
          return {
            minutes: prevTime.minutes - 1,
            seconds: 59
          };
        } else {
          return {
            ...prevTime,
            seconds: prevTime.seconds - 1
          };
        }
      });
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format time with leading zeros
  const formattedTime = `${timeLeft.minutes}:${timeLeft.seconds.toString().padStart(2, '0')}`;
  return <div className="bg-[#FFA35B] text-[#254D39] rounded-full font-semibold flex items-center mt-2 -mb-16 px-[15px] py-[11px] my-0">
      <span className="inline-block mr-2">⏱</span> Oferta por tempo limitado: {formattedTime}
    </div>;
};
export default CountdownTimer;