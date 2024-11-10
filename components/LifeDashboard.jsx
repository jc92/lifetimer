import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';

const ProgressBar = ({ value, chunks, className = '' }) => (
  <div className={`flex w-full h-8 bg-gray-200 rounded-lg overflow-hidden ${className}`}>
    {[...Array(chunks)].map((_, i) => (
      <div 
        key={i} 
        className="flex-1 border-r last:border-r-0 border-white"
        style={{
          background: i <= chunks * (value / 100) ? '#3B82F6' : 'transparent',
          transition: 'background 0.3s ease'
        }}
      />
    ))}
  </div>
);

const TimeScale = ({ title, progress, chunks, className = '' }) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <span className="text-sm text-gray-500">{progress.toFixed(1)}%</span>
    </div>
    <ProgressBar value={progress} chunks={chunks} className={className} />
  </div>
);

const TimeDisplay = ({ timeLeft }) => (
  <div className="font-mono text-center">
    <div className="text-6xl font-bold text-blue-600 tabular-nums tracking-tight">
      {timeLeft.toFixed(9)}
    </div>
    <div className="text-sm text-gray-600 mt-2">
      Years Remaining
    </div>
  </div>
);

const BirthdayForm = ({ birthday, setBirthday, onStart }) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <Card className="w-full max-w-md">
      <CardContent className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Enter Your Birthday</h2>
        <Input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <Button
          onClick={onStart}
          disabled={!birthday}
          className="w-full"
        >
          Start Life Progress
        </Button>
      </CardContent>
    </Card>
  </div>
);

const LifeDashboard = () => {
  const LIFE_EXPECTANCY = 80;
  const [birthday, setBirthday] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const calculateTimeLeft = () => {
    if (!birthday) return null;
    
    const birthDate = new Date(birthday);
    const now = new Date();
    const endDate = new Date(birthDate.getFullYear() + LIFE_EXPECTANCY, birthDate.getMonth(), birthDate.getDate());
    
    if (now >= endDate) return null;

    const totalMilliseconds = endDate - birthDate;
    const remainingMilliseconds = endDate - now;
    const progressPercent = (remainingMilliseconds / totalMilliseconds) * 100;
    const yearsLeft = remainingMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    // Calculate progress for different time scales
    const weekProgress = (now.getDay() / 7) * 100;
    const monthProgress = (now.getDate() / new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()) * 100;
    const quarterProgress = ((now.getMonth() % 3) * 30 + now.getDate()) / (3 * 30) * 100;

    return {
      overall: {
        progress: 100 - progressPercent,
        yearsLeft
      },
      week: {
        progress: weekProgress
      },
      month: {
        progress: monthProgress
      },
      quarter: {
        progress: quarterProgress
      }
    };
  };

  useEffect(() => {
    storage.get('birthday').then(result => {
      if (result.birthday) {
        setBirthday(result.birthday);
        setIsRunning(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 10);
      return () => clearInterval(timer);
    }
  }, [isRunning, birthday]);

  if (!isRunning) {
    return (
      <BirthdayForm
        birthday={birthday}
        setBirthday={setBirthday}
        onStart={() => {
          storage.set({ birthday });
          setIsRunning(true);
        }}
      />
    );
  }

  if (!timeLeft) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-4xl">
        <CardContent className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-center text-gray-800">Life Progress</h2>
            <div className="text-center py-6">
              <TimeDisplay timeLeft={timeLeft.overall.yearsLeft} />
            </div>
            <ProgressBar value={timeLeft.overall.progress} chunks={80} className="h-10" />
          </div>

          <div className="space-y-6">
            <TimeScale
              title="Week"
              progress={timeLeft.week.progress}
              chunks={7}
              className="h-6"
            />
            <TimeScale
              title="Month"
              progress={timeLeft.month.progress}
              chunks={31}
              className="h-6"
            />
            <TimeScale
              title="Quarter"
              progress={timeLeft.quarter.progress}
              chunks={12}
              className="h-6"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifeDashboard;