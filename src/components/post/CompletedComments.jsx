import React from 'react';
import SponsorList from './SponsorList';

function CompletedComments({ userComment, setUserComment }) {
  return <SponsorList userComment={userComment} setUserComment={setUserComment} />;
}

export default CompletedComments;
