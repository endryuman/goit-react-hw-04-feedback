import { useState } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleLeaveFeedback = key => {
    if (key === 'good') setGood(prevState => prevState + 1);
    if (key === 'neutral') setNeutral(prevState => prevState + 1);
    if (key === 'bad') setBad(prevState => prevState + 1);
  };
  const countTotalFeedback = () => {
    return Object.values({
      good,
      neutral,
      bad,
    }).reduce((acc, value) => acc + value, 0);
  };
  const countPositiveFeedbackPercentage = () => {
    return (good / countTotalFeedback()) * 100;
  };
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage().toFixed(1);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys({
            good,
            neutral,
            bad,
          })}
          onLeaveFeedback={handleLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
};
